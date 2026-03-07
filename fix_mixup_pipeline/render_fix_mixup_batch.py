#!/usr/bin/env python3
"""
Render multiple Fix the Mix-Up worksheet sets from a workbook JSON file.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Dict, List

from render_fix_mixup_png import render_page


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="Workbook JSON with sets")
    parser.add_argument("--output-dir", required=True, help="Directory for rendered PNG pages")
    return parser.parse_args()


def load_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def slugify(value: str) -> str:
    out = "".join(ch.lower() if ch.isalnum() else "_" for ch in value.strip())
    while "__" in out:
        out = out.replace("__", "_")
    return out.strip("_") or "set"


def chunk_rows(rows: List[Dict[str, Any]], size: int) -> List[List[Dict[str, Any]]]:
    return [rows[idx : idx + size] for idx in range(0, len(rows), size)]


def main() -> int:
    args = parse_args()
    workbook = load_json(Path(args.input))
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    directions = workbook.get(
        "directions",
        "Read the words and write the sentence about the picture. Remember to start with a capital letter and end with punctuation.",
    )
    worksheet_title = workbook.get("worksheet_title", "Fix the Mix-Up")
    rows_per_page = int(workbook.get("rows_per_page", 2))
    manifest: List[Dict[str, Any]] = []

    for set_index, set_spec in enumerate(workbook.get("sets", []), start=1):
        set_id = set_spec.get("id") or f"set_{set_index:02d}"
        set_slug = slugify(set_id)
        set_dir = output_dir / set_slug
        set_dir.mkdir(parents=True, exist_ok=True)

        pages = chunk_rows(set_spec["rows"], rows_per_page)
        for page_index, page_rows in enumerate(pages, start=1):
            page_spec = {
                "worksheet_title": worksheet_title,
                "skill_line": set_spec.get("skill_line", ""),
                "directions": directions,
                "rows": page_rows,
            }
            out_path = set_dir / f"{set_slug}_page_{page_index:02d}.png"
            render_page(page_spec, out_path)
            manifest.append(
                {
                    "set_id": set_id,
                    "skill_line": set_spec.get("skill_line", ""),
                    "page": page_index,
                    "path": str(out_path),
                }
            )

    manifest_path = output_dir / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {manifest_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
