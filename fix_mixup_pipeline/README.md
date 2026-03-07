# Fix the Mix-Up Prompt Pipeline

This pipeline generates locked JSON prompt bundles for the worksheet style shown in the gold-standard examples.

The important constraint is accuracy:

- If you want the page to match the gold standard exactly, do not ask an image model to invent the whole worksheet from scratch.
- Use the gold-standard worksheet page as a reference-edit base image.
- Change only the row illustrations, the text inside the three sentence boxes, and optionally the skill line.

The script here outputs three things in one JSON bundle:

- a page-level reference-edit prompt
- row-level illustration prompts for missing scene art
- a renderer-friendly content spec

## Input JSON

Minimal required shape:

```json
{
  "worksheet_title": "Fix the Mix-Up",
  "skill_line": "Skill: Short I, HFW: to, do",
  "skill_line_behavior": "match_reference",
  "directions": "Read the words and write the sentence about the picture. Remember to start with a capital letter and end with punctuation.",
  "rows": [
    {
      "text_boxes": ["big fig.", "Tim the kid", "hid the"],
      "answer_sentence": "Tim the kid hid the big fig.",
      "image_brief": "A smiling boy crouching beside a leafy bush while holding or hiding a large fig.",
      "asset_id": "row_1_scene",
      "asset_hint": "fig"
    }
  ]
}
```

Notes:

- `text_boxes` must already be in the exact left-to-right order you want on the worksheet.
- `answer_sentence` is the corrected sentence students should write.
- `image_brief` should describe only the left-panel picture.
- `skill_line_behavior` can be `match_reference`, `preserve`, `remove`.

## Build a JSON prompt bundle

```bash
python3 fix_mixup_pipeline/build_fix_mixup_prompt_json.py \
  --input fix_mixup_pipeline/examples/sample_short_i_input.json \
  --output /tmp/fix_mixup_prompt_bundle.json
```

## Recommended workflow

1. Pick the closest gold-standard worksheet page and use it as the input reference image.
2. Build the JSON prompt bundle from your new content.
3. Use `reference_edit_prompt.prompt` to edit the worksheet page while locking the layout.
4. If a left-panel scene asset does not already exist, generate it separately from the matching `illustration_prompts` entry.
5. If you need guaranteed precision, use `renderer_spec` in a fixed HTML/SVG/PDF renderer instead of a full-page image model.
