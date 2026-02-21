#!/usr/bin/env python3
"""
Generate worksheet clipart PNGs from a CSV of (word,prompt).

Example:
  python3 image_queue_pipeline/generate_clipart_images.py \
    --csv images/clipart_prompts_descriptive.csv \
    --output-dir images \
    --limit 5
"""

from __future__ import annotations

import argparse
import base64
import csv
import datetime as dt
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Dict, List


API_URL = "https://api.openai.com/v1/images/generations"


def slugify_word(word: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", word.strip().lower())
    slug = re.sub(r"_+", "_", slug).strip("_")
    return slug or "image"


def load_rows(csv_path: Path) -> List[Dict[str, str]]:
    with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        rows = []
        for row in reader:
            if not row:
                continue
            word = (row.get("word") or "").strip()
            prompt = (row.get("prompt") or "").strip()
            if word and prompt:
                rows.append({"word": word, "prompt": prompt})
        return rows


def load_key_from_env_file(env_path: Path) -> str:
    if not env_path.exists():
        return ""
    try:
        for line in env_path.read_text(encoding="utf-8").splitlines():
            stripped = line.strip()
            if not stripped or stripped.startswith("#"):
                continue
            if stripped.startswith("OPENAI_API_KEY="):
                value = stripped.split("=", 1)[1].strip()
                if (value.startswith('"') and value.endswith('"')) or (
                    value.startswith("'") and value.endswith("'")
                ):
                    value = value[1:-1]
                return value.strip()
    except Exception:
        return ""
    return ""


def generate_image_bytes(
    api_key: str,
    prompt: str,
    model: str,
    size: str,
) -> bytes:
    payload = {
        "model": model,
        "prompt": prompt,
        "size": size,
        "background": "transparent",
        "quality": "high",
        "output_format": "png",
    }
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as response:
            raw = response.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {e.code}: {detail}") from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"Network error: {e}") from e

    data = json.loads(raw)
    images = data.get("data") or []
    if not images:
        raise RuntimeError(f"No image data returned: {raw[:500]}")
    b64 = images[0].get("b64_json")
    if not b64:
        raise RuntimeError(f"Missing b64_json in response: {raw[:500]}")
    return base64.b64decode(b64)


def append_log(
    log_path: Path,
    word: str,
    filename: str,
    status: str,
    detail: str,
) -> None:
    log_path.parent.mkdir(parents=True, exist_ok=True)
    exists = log_path.exists()
    with log_path.open("a", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        if not exists:
            writer.writerow(["timestamp_utc", "word", "filename", "status", "detail"])
        writer.writerow(
            [
                dt.datetime.utcnow().isoformat(timespec="seconds") + "Z",
                word,
                filename,
                status,
                detail,
            ]
        )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--csv",
        default="images/clipart_prompts_descriptive.csv",
        help="CSV with columns: word,prompt",
    )
    parser.add_argument("--output-dir", default="images")
    parser.add_argument("--model", default="gpt-image-1")
    parser.add_argument("--size", default="1024x1024")
    parser.add_argument("--limit", type=int, default=5)
    parser.add_argument("--start-index", type=int, default=0)
    parser.add_argument("--sleep-seconds", type=float, default=0.8)
    parser.add_argument("--overwrite", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--api-key",
        default="",
        help="Optional API key. If omitted, uses OPENAI_API_KEY env var or .env file.",
    )
    parser.add_argument(
        "--log",
        default="image_queue_pipeline/generation_log.csv",
        help="CSV log of attempts",
    )
    args = parser.parse_args()

    api_key = args.api_key.strip() or os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        api_key = load_key_from_env_file(Path(".env"))
    if not api_key and not args.dry_run:
        print("OPENAI_API_KEY is not set in this shell.", file=sys.stderr)
        return 2

    csv_path = Path(args.csv)
    out_dir = Path(args.output_dir)
    log_path = Path(args.log)
    if not csv_path.exists():
        print(f"CSV not found: {csv_path}", file=sys.stderr)
        return 2

    rows = load_rows(csv_path)
    if args.start_index >= len(rows):
        print(f"start-index {args.start_index} is out of range (rows={len(rows)}).")
        return 1

    selected = rows[args.start_index : args.start_index + args.limit]
    out_dir.mkdir(parents=True, exist_ok=True)

    print(
        f"Processing {len(selected)} rows from {csv_path} -> {out_dir} "
        f"(start={args.start_index}, limit={args.limit})"
    )

    created = 0
    skipped = 0
    failed = 0

    for i, row in enumerate(selected, start=args.start_index):
        word = row["word"]
        prompt = row["prompt"]
        filename = f"{slugify_word(word)}.png"
        out_path = out_dir / filename

        if out_path.exists() and not args.overwrite:
            print(f"[{i}] SKIP {word} -> {filename} (already exists)")
            append_log(log_path, word, filename, "skipped_exists", "")
            skipped += 1
            continue

        if args.dry_run:
            print(f"[{i}] DRY  {word} -> {filename}")
            append_log(log_path, word, filename, "dry_run", "")
            continue

        try:
            image_bytes = generate_image_bytes(
                api_key=api_key,
                prompt=prompt,
                model=args.model,
                size=args.size,
            )
            out_path.write_bytes(image_bytes)
            print(f"[{i}] OK   {word} -> {filename}")
            append_log(log_path, word, filename, "created", "")
            created += 1
            if args.sleep_seconds > 0:
                time.sleep(args.sleep_seconds)
        except Exception as e:  # keep batch running
            err = str(e)
            print(f"[{i}] FAIL {word} -> {filename} :: {err}", file=sys.stderr)
            append_log(log_path, word, filename, "failed", err)
            failed += 1

    print(f"Done. created={created} skipped={skipped} failed={failed}")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
