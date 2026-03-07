#!/usr/bin/env python3
"""
Build a locked JSON prompt bundle for "Fix the Mix-Up" worksheets.

This script is designed for a reference-edit workflow:
1. Supply one gold-standard worksheet page as the visual reference image.
2. Supply a JSON content spec with the new rows, text-box order, and picture briefs.
3. The script outputs a JSON bundle containing:
   - a page-level reference-edit prompt
   - row-level illustration prompts
   - a deterministic renderer spec

Example:
  python3 fix_mixup_pipeline/build_fix_mixup_prompt_json.py \
    --input fix_mixup_pipeline/examples/sample_short_i_input.json \
    --output /tmp/fix_mixup_prompt_bundle.json
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import sys
from typing import Any, Dict, List


DEFAULT_TITLE = "Fix the Mix-Up"
DEFAULT_DIRECTIONS = (
    "Read the words and write the sentence about the picture. "
    "Remember to start with a capital letter and end with punctuation."
)
ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "images"

GLOBAL_PRESERVE = [
    "Keep the supplied gold-standard worksheet image as the exact base composition.",
    "Preserve the page orientation, outer border, margins, title placement, name line, directions block, divider lines, handwriting lines, footer placement, box spacing, and overall proportions.",
    "Preserve the exact black-and-white printable worksheet look.",
    "Preserve the same clean kid-friendly worksheet line-art style for all illustrations.",
    "Keep replacement text crisp, centered, and easy to read.",
]

GLOBAL_AVOID = [
    "Do not add color.",
    "Do not add gray fill, gradients, drop shadows, textures, or shading.",
    "Do not move, resize, rotate, or redraw the page structure.",
    "Do not add extra decorations, stickers, icons, speech bubbles, or background scenery outside the illustration areas.",
    "Do not distort text, curve text, or switch to a handwritten/script font.",
]

ILLUSTRATION_STYLE_SUFFIX = (
    "Black-and-white worksheet clipart line art only. Bold clean outlines. "
    "No shading, no grayscale, no gradients, no text labels, no border frame, "
    "simple kid-friendly forms, sparse background detail, print-ready."
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="Input JSON content spec")
    parser.add_argument("--output", required=True, help="Output JSON prompt bundle")
    return parser.parse_args()


def load_json(path: Path) -> Dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        raise ValueError(f"Invalid JSON in {path}: {error}") from error


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", value.strip().lower())
    slug = re.sub(r"_+", "_", slug).strip("_")
    return slug or "row"


def has_related_asset(asset_name: str) -> bool:
    if not asset_name:
        return False
    for candidate in IMAGE_DIR.glob(f"{asset_name}.*"):
        if candidate.is_file():
            return True
    return False


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def validate_input(data: Dict[str, Any]) -> None:
    rows = data.get("rows")
    require(isinstance(rows, list) and rows, "Input JSON must include a non-empty rows array.")

    for index, row in enumerate(rows, start=1):
        require(isinstance(row, dict), f"Row {index} must be an object.")
        require(
            isinstance(row.get("text_boxes"), list) and len(row["text_boxes"]) == 3,
            f"Row {index} must include exactly 3 text_boxes.",
        )
        require(
            all(isinstance(item, str) and item.strip() for item in row["text_boxes"]),
            f"Row {index} text_boxes must be non-empty strings.",
        )
        require(
            isinstance(row.get("answer_sentence"), str) and row["answer_sentence"].strip(),
            f"Row {index} must include answer_sentence.",
        )
        require(
            isinstance(row.get("image_brief"), str) and row["image_brief"].strip(),
            f"Row {index} must include image_brief.",
        )


def build_skill_line_instruction(skill_line: str, behavior: str) -> str:
    if behavior == "preserve":
        return "Preserve the existing skill line area exactly as it appears in the reference."
    if behavior == "remove":
        return "If the reference contains a skill line, remove only the skill-line text while keeping the layout clean."
    if skill_line:
        return (
            f'Replace the skill line text with this exact text if the reference includes a skill line: "{skill_line}".'
        )
    return "If the reference contains a skill line, preserve its structure and wording."


def build_row_instruction(row: Dict[str, Any], row_number: int) -> str:
    box_list = "; ".join(f'box {i + 1}: "{text}"' for i, text in enumerate(row["text_boxes"]))
    return (
        f"Row {row_number}: replace only the left illustration and the three text boxes. "
        f'Use this corrected sentence: "{row["answer_sentence"]}". '
        f"Set the text boxes to {box_list}. "
        f'Illustration brief: {row["image_brief"]}'
    )


def build_reference_edit_prompt(data: Dict[str, Any]) -> str:
    title = data.get("worksheet_title", DEFAULT_TITLE).strip() or DEFAULT_TITLE
    directions = data.get("directions", DEFAULT_DIRECTIONS).strip() or DEFAULT_DIRECTIONS
    skill_line = data.get("skill_line", "").strip()
    skill_line_behavior = data.get("skill_line_behavior", "match_reference").strip() or "match_reference"

    parts: List[str] = [
        "Use the supplied gold-standard worksheet page as the base image.",
        f'Keep the worksheet title as "{title}".',
        build_skill_line_instruction(skill_line, skill_line_behavior),
        (
            f'Replace the directions block text with this exact wording while preserving its existing position, '
            f'font style, and line-wrap behavior as closely as possible: "{directions}".'
        ),
        "Change only the editable content areas: the left-side illustrations and the text inside the three sentence boxes for each row.",
    ]
    parts.extend(build_row_instruction(row, index) for index, row in enumerate(data["rows"], start=1))
    parts.extend(GLOBAL_PRESERVE)
    parts.extend(GLOBAL_AVOID)
    return " ".join(parts)


def build_mask_guidance(data: Dict[str, Any]) -> List[str]:
    guidance = [
        "Mask only the interior of each left illustration panel.",
        "Mask only the inside area of each text box, not the rounded borders.",
        "If changing skill-line text, mask only the letters, not the surrounding spacing.",
        "Do not mask the page border, title, name line, directions block, row dividers, handwriting lines, or footer.",
    ]
    if data.get("skill_line_behavior", "match_reference") == "remove":
        guidance.append("If removing the skill line, clean the text area without shifting nearby elements.")
    return guidance


def build_illustration_prompts(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    prompts: List[Dict[str, Any]] = []
    for index, row in enumerate(data["rows"], start=1):
        asset_hint = row.get("asset_hint", "").strip()
        prompts.append(
            {
                "row_number": index,
                "asset_id": row.get("asset_id", f"row_{index}_scene"),
                "related_asset_available": has_related_asset(asset_hint),
                "related_asset_hint": asset_hint,
                "prompt": f"{row['image_brief'].strip()} {ILLUSTRATION_STYLE_SUFFIX}",
                "constraints": [
                    "Match the black-and-white worksheet line art style of the gold-standard examples.",
                    "Keep the composition simple enough to sit in the left picture panel.",
                    "Do not include any text.",
                ],
            }
        )
    return prompts


def build_renderer_spec(data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "template_name": "fix_the_mix_up",
        "page_orientation": "landscape",
        "worksheet_title": data.get("worksheet_title", DEFAULT_TITLE).strip() or DEFAULT_TITLE,
        "skill_line": data.get("skill_line", "").strip(),
        "skill_line_behavior": data.get("skill_line_behavior", "match_reference"),
        "directions": data.get("directions", DEFAULT_DIRECTIONS).strip() or DEFAULT_DIRECTIONS,
        "rows": [
            {
                "row_number": index,
                "answer_sentence": row["answer_sentence"].strip(),
                "text_boxes": [text.strip() for text in row["text_boxes"]],
                "image_asset_id": row.get("asset_id", f"row_{index}_scene"),
                "image_brief": row["image_brief"].strip(),
            }
            for index, row in enumerate(data["rows"], start=1)
        ],
        "layout_locks": [
            "Use the supplied gold-standard worksheet page as the visual source of truth.",
            "Do not change row count, box count, border style, handwriting-line count, or footer placement.",
        ],
    }


def build_output(data: Dict[str, Any], source_path: Path) -> Dict[str, Any]:
    return {
        "template_id": "fix_the_mix_up_gold_reference_v1",
        "source_input_file": str(source_path),
        "recommended_workflow": "reference_edit_for_page + standalone_generation_for_missing_clipart",
        "reference_image_role": "gold_standard_base_page",
        "notes": [
            "For exact page matching, use the gold-standard worksheet as the edit base instead of asking the model to generate the full page from scratch.",
            "Use the illustration prompts only when you need a new left-panel scene asset.",
        ],
        "preserve_rules": GLOBAL_PRESERVE,
        "avoid_rules": GLOBAL_AVOID,
        "mask_guidance": build_mask_guidance(data),
        "worksheet_content": {
            "worksheet_title": data.get("worksheet_title", DEFAULT_TITLE).strip() or DEFAULT_TITLE,
            "skill_line": data.get("skill_line", "").strip(),
            "skill_line_behavior": data.get("skill_line_behavior", "match_reference"),
            "directions": data.get("directions", DEFAULT_DIRECTIONS).strip() or DEFAULT_DIRECTIONS,
            "rows": data["rows"],
        },
        "reference_edit_prompt": {
            "use_case": "precise-object-edit",
            "asset_type": "black-and-white phonics worksheet page",
            "input_fidelity": "high",
            "prompt": build_reference_edit_prompt(data),
        },
        "illustration_prompts": build_illustration_prompts(data),
        "renderer_spec": build_renderer_spec(data),
    }


def main() -> int:
    args = parse_args()
    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.exists():
        print(f"Input file not found: {input_path}", file=sys.stderr)
        return 2

    try:
        data = load_json(input_path)
        validate_input(data)
        output = build_output(data, input_path)
    except ValueError as error:
        print(str(error), file=sys.stderr)
        return 2

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
