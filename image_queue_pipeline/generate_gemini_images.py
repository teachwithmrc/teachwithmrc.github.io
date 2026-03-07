#!/usr/bin/env python3
"""
Generate images from a CSV queue using the Gemini API.

CSV columns:
  - prompt (required)
  - one of: slug, word, name, title, filename (optional identifier)

Example:
  python3 image_queue_pipeline/generate_gemini_images.py \
    --csv image_queue_pipeline/artifacts/multisyll_picturable_prompts.csv \
    --output-dir images \
    --limit 10 \
    --max-estimated-cost-usd 0.39
"""

from __future__ import annotations

import argparse
import base64
import csv
import datetime as dt
from decimal import Decimal, ROUND_DOWN
import json
import os
from pathlib import Path
import re
import sys
import time
import urllib.error
import urllib.request
from typing import Dict, Iterable, List, Optional, Tuple


API_URL_TEMPLATE = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
DEFAULT_ENV_FILE = ".env"
DEFAULT_MODEL = "gemini-2.5-flash-image"
DEFAULT_PRICING_MODE = "standard"
DEFAULT_TIMEOUT_SECONDS = 180
COMMON_IMAGE_EXTENSIONS = (".png", ".jpg", ".jpeg", ".webp")
MIME_TO_EXTENSION = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/webp": ".webp",
}
DEFAULT_COST_PER_IMAGE = {
    ("gemini-2.5-flash-image", "standard"): Decimal("0.039"),
    ("gemini-2.5-flash-image", "batch"): Decimal("0.0195"),
}


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", value.strip().lower())
    slug = re.sub(r"_+", "_", slug).strip("_")
    return slug or "image"


def normalize_row(row: Dict[str, str]) -> Dict[str, str]:
    normalized: Dict[str, str] = {}
    for key, value in row.items():
        if key is None:
            continue
        normalized[key.strip().lower()] = (value or "").strip()
    return normalized


def load_rows(csv_path: Path) -> List[Dict[str, str]]:
    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        rows: List[Dict[str, str]] = []
        for raw_row in reader:
            row = normalize_row(raw_row)
            if row.get("prompt"):
                rows.append(row)
        return rows


def pick_identifier(row: Dict[str, str], fallback_index: int) -> str:
    for field in ("filename", "slug", "word", "name", "title", "id"):
        value = row.get(field, "").strip()
        if value:
            return value
    return f"image_{fallback_index:04d}"


def strip_known_extension(filename: str) -> str:
    path = Path(filename)
    suffix = path.suffix.lower()
    if suffix in COMMON_IMAGE_EXTENSIONS:
        return path.stem
    return filename


def load_env_value(env_path: Path, names: Iterable[str]) -> str:
    if not env_path.exists():
        return ""
    try:
        for line in env_path.read_text(encoding="utf-8").splitlines():
            stripped = line.strip()
            if not stripped or stripped.startswith("#") or "=" not in stripped:
                continue
            key, value = stripped.split("=", 1)
            key = key.strip()
            if key not in names:
                continue
            value = value.strip()
            if (value.startswith('"') and value.endswith('"')) or (
                value.startswith("'") and value.endswith("'")
            ):
                value = value[1:-1]
            return value.strip()
    except Exception:
        return ""
    return ""


def resolve_api_key(explicit_key: str, env_file: Path) -> str:
    if explicit_key.strip():
        return explicit_key.strip()

    for env_name in ("GEMINI_API_KEY", "GOOGLE_API_KEY"):
        value = os.getenv(env_name, "").strip()
        if value:
            return value

    return load_env_value(env_file, ("GEMINI_API_KEY", "GOOGLE_API_KEY"))


def find_existing_output(output_dir: Path, stem: str) -> Optional[Path]:
    for suffix in COMMON_IMAGE_EXTENSIONS:
        candidate = output_dir / f"{stem}{suffix}"
        if candidate.exists():
            return candidate
    return None


def build_prompt(prompt: str, prefix: str, suffix: str) -> str:
    pieces = [prefix.strip(), prompt.strip(), suffix.strip()]
    return " ".join(piece for piece in pieces if piece)


def resolve_estimated_cost(
    model: str,
    pricing_mode: str,
    explicit_cost: Optional[str],
) -> Optional[Decimal]:
    if explicit_cost is not None:
        return Decimal(explicit_cost)
    return DEFAULT_COST_PER_IMAGE.get((model, pricing_mode))


def round_money(value: Decimal) -> Decimal:
    return value.quantize(Decimal("0.0001"))


def generate_image(
    api_key: str,
    prompt: str,
    model: str,
    aspect_ratio: str,
    timeout_seconds: int,
) -> Tuple[bytes, str]:
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt,
                    }
                ]
            }
        ],
        "generationConfig": {
            "imageConfig": {
                "aspectRatio": aspect_ratio,
            }
        },
    }

    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        API_URL_TEMPLATE.format(model=model),
        data=body,
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": api_key,
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=timeout_seconds) as response:
            raw_response = response.read().decode("utf-8")
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {error.code}: {detail}") from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"Network error: {error}") from error

    data = json.loads(raw_response)
    candidates = data.get("candidates") or []
    if not candidates:
        raise RuntimeError(f"No candidates returned: {raw_response[:500]}")

    for candidate in candidates:
        content = candidate.get("content") or {}
        parts = content.get("parts") or []
        for part in parts:
            inline_data = part.get("inlineData") or part.get("inline_data")
            if not inline_data:
                continue
            encoded = inline_data.get("data")
            mime_type = inline_data.get("mimeType") or inline_data.get("mime_type") or "image/png"
            if not encoded:
                continue
            return base64.b64decode(encoded), mime_type

    raise RuntimeError(f"No image bytes found in response: {raw_response[:500]}")


def append_log(
    log_path: Path,
    row_index: int,
    identifier: str,
    filename: str,
    status: str,
    model: str,
    pricing_mode: str,
    estimated_cost_usd: str,
    detail: str,
) -> None:
    log_path.parent.mkdir(parents=True, exist_ok=True)
    exists = log_path.exists()
    with log_path.open("a", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle)
        if not exists:
            writer.writerow(
                [
                    "timestamp_utc",
                    "row_index",
                    "identifier",
                    "filename",
                    "status",
                    "model",
                    "pricing_mode",
                    "estimated_cost_usd",
                    "detail",
                ]
            )
        writer.writerow(
            [
                dt.datetime.utcnow().isoformat(timespec="seconds") + "Z",
                row_index,
                identifier,
                filename,
                status,
                model,
                pricing_mode,
                estimated_cost_usd,
                detail,
            ]
        )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--csv",
        default="image_queue_pipeline/artifacts/multisyll_picturable_prompts.csv",
        help="CSV with a prompt column and an optional identifier column",
    )
    parser.add_argument("--output-dir", default="images")
    parser.add_argument("--model", default=DEFAULT_MODEL)
    parser.add_argument("--aspect-ratio", default="1:1")
    parser.add_argument("--limit", type=int, default=10)
    parser.add_argument("--start-index", type=int, default=0)
    parser.add_argument("--sleep-seconds", type=float, default=1.0)
    parser.add_argument("--timeout-seconds", type=int, default=DEFAULT_TIMEOUT_SECONDS)
    parser.add_argument("--overwrite", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--api-key", default="")
    parser.add_argument("--env-file", default=DEFAULT_ENV_FILE)
    parser.add_argument(
        "--pricing-mode",
        choices=("standard", "batch"),
        default=DEFAULT_PRICING_MODE,
        help="Used for estimated spend only. The script itself sends standard live requests.",
    )
    parser.add_argument(
        "--estimated-cost-per-image",
        default=None,
        help="Override the per-image estimate in USD, for example 0.0200",
    )
    parser.add_argument(
        "--max-estimated-cost-usd",
        default=None,
        help="Stop before exceeding this estimated live-request spend",
    )
    parser.add_argument(
        "--prompt-prefix",
        default="",
        help="Prepended to every prompt",
    )
    parser.add_argument(
        "--prompt-suffix",
        default="",
        help="Appended to every prompt",
    )
    parser.add_argument(
        "--log",
        default="image_queue_pipeline/gemini_generation_log.csv",
        help="CSV log of attempts",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    csv_path = Path(args.csv)
    output_dir = Path(args.output_dir)
    log_path = Path(args.log)
    env_file = Path(args.env_file)

    if not csv_path.exists():
        print(f"CSV not found: {csv_path}", file=sys.stderr)
        return 2

    if args.limit <= 0:
        print("limit must be greater than 0", file=sys.stderr)
        return 2

    rows = load_rows(csv_path)
    if not rows:
        print(f"No usable prompt rows found in {csv_path}", file=sys.stderr)
        return 2

    if args.start_index >= len(rows):
        print(f"start-index {args.start_index} is out of range (rows={len(rows)})", file=sys.stderr)
        return 2

    if args.pricing_mode == "batch" and not args.dry_run:
        print(
            "--pricing-mode batch is only valid with --dry-run because this script sends "
            "standard live requests one at a time.",
            file=sys.stderr,
        )
        return 2

    api_key = resolve_api_key(args.api_key, env_file)
    if not api_key and not args.dry_run:
        print(
            "GEMINI_API_KEY or GOOGLE_API_KEY is not set in this shell or env file.",
            file=sys.stderr,
        )
        return 2

    estimated_cost = resolve_estimated_cost(
        model=args.model,
        pricing_mode=args.pricing_mode,
        explicit_cost=args.estimated_cost_per_image,
    )
    max_estimated_cost = Decimal(args.max_estimated_cost_usd) if args.max_estimated_cost_usd else None

    selected = rows[args.start_index : args.start_index + args.limit]
    output_dir.mkdir(parents=True, exist_ok=True)

    print(
        f"Processing {len(selected)} rows from {csv_path} -> {output_dir} "
        f"(start={args.start_index}, limit={args.limit}, model={args.model}, aspect={args.aspect_ratio})"
    )

    if estimated_cost is not None:
        print(
            "Estimated spend per live request: "
            f"${round_money(estimated_cost)} ({args.pricing_mode} pricing estimate)"
        )
    elif max_estimated_cost is not None:
        print(
            "--max-estimated-cost-usd was provided, but no default estimate exists for this model. "
            "Pass --estimated-cost-per-image to enable budget gating.",
            file=sys.stderr,
        )
        return 2

    max_live_requests: Optional[int] = None
    if max_estimated_cost is not None and estimated_cost is not None:
        max_live_requests = int((max_estimated_cost / estimated_cost).to_integral_value(rounding=ROUND_DOWN))
        print(
            f"Budget cap: ${round_money(max_estimated_cost)} allows up to "
            f"{max_live_requests} live request(s) at the current estimate."
        )
        if max_live_requests <= 0 and not args.dry_run:
            print("Budget cap is too low for even one live request.", file=sys.stderr)
            return 2

    created = 0
    skipped = 0
    failed = 0
    dry_runs = 0
    live_requests_attempted = 0

    for row_index, row in enumerate(selected, start=args.start_index):
        identifier = pick_identifier(row, row_index)
        stem = slugify(strip_known_extension(identifier))
        existing_output = find_existing_output(output_dir, stem)

        if existing_output and not args.overwrite:
            print(f"[{row_index}] SKIP {identifier} -> {existing_output.name} (already exists)")
            append_log(
                log_path,
                row_index,
                identifier,
                existing_output.name,
                "skipped_exists",
                args.model,
                args.pricing_mode,
                str(round_money(estimated_cost)) if estimated_cost is not None else "",
                "",
            )
            skipped += 1
            continue

        prompt = build_prompt(row["prompt"], args.prompt_prefix, args.prompt_suffix)
        planned_filename = f"{stem}.png"

        if args.dry_run:
            print(f"[{row_index}] DRY  {identifier} -> {planned_filename}")
            append_log(
                log_path,
                row_index,
                identifier,
                planned_filename,
                "dry_run",
                args.model,
                args.pricing_mode,
                str(round_money(estimated_cost)) if estimated_cost is not None else "",
                "",
            )
            dry_runs += 1
            continue

        if max_live_requests is not None and live_requests_attempted >= max_live_requests:
            print(
                f"[{row_index}] STOP budget cap reached after {live_requests_attempted} live request(s)"
            )
            break

        live_requests_attempted += 1

        try:
            image_bytes, mime_type = generate_image(
                api_key=api_key,
                prompt=prompt,
                model=args.model,
                aspect_ratio=args.aspect_ratio,
                timeout_seconds=args.timeout_seconds,
            )
            extension = MIME_TO_EXTENSION.get(mime_type.lower(), ".png")
            output_path = output_dir / f"{stem}{extension}"

            if existing_output and existing_output != output_path and existing_output.exists():
                existing_output.unlink()

            output_path.write_bytes(image_bytes)
            print(f"[{row_index}] OK   {identifier} -> {output_path.name}")
            append_log(
                log_path,
                row_index,
                identifier,
                output_path.name,
                "created",
                args.model,
                args.pricing_mode,
                str(round_money(estimated_cost)) if estimated_cost is not None else "",
                "",
            )
            created += 1
            if args.sleep_seconds > 0:
                time.sleep(args.sleep_seconds)
        except Exception as error:
            detail = str(error)
            print(f"[{row_index}] FAIL {identifier} -> {planned_filename} :: {detail}", file=sys.stderr)
            append_log(
                log_path,
                row_index,
                identifier,
                planned_filename,
                "failed",
                args.model,
                args.pricing_mode,
                str(round_money(estimated_cost)) if estimated_cost is not None else "",
                detail,
            )
            failed += 1

    estimated_total = (
        round_money(estimated_cost * live_requests_attempted)
        if estimated_cost is not None
        else None
    )
    print(
        "Done. "
        f"created={created} skipped={skipped} failed={failed} dry_runs={dry_runs} "
        f"live_requests_attempted={live_requests_attempted}"
        + (
            f" estimated_spend=${estimated_total}"
            if estimated_total is not None
            else ""
        )
    )
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
