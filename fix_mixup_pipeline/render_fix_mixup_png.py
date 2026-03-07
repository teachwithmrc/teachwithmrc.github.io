#!/usr/bin/env python3
"""
Render a "Fix the Mix-Up" worksheet page to PNG using existing local clipart assets.

This is a deterministic renderer for layout-accurate worksheet pages. It does not
call an image API.
"""

from __future__ import annotations

import argparse
from collections import deque
import json
from pathlib import Path
from typing import Any, Dict, List, Tuple

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "images"
DEFAULT_WIDTH = 1872
DEFAULT_HEIGHT = 1404
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

FONT_TITLE = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_TEXT = "/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="JSON worksheet spec")
    parser.add_argument("--output", required=True, help="PNG output path")
    return parser.parse_args()


def load_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def fit_font(
    draw: ImageDraw.ImageDraw,
    text: str,
    font_path: str,
    max_size: int,
    min_size: int,
    max_width: int,
    max_height: int | None = None,
) -> ImageFont.FreeTypeFont:
    for size in range(max_size, min_size - 1, -1):
        candidate = font(font_path, size)
        bbox = draw.textbbox((0, 0), text, font=candidate)
        width = bbox[2] - bbox[0]
        height = bbox[3] - bbox[1]
        if width <= max_width and (max_height is None or height <= max_height):
            return candidate
    return font(font_path, min_size)


def draw_text_centered(
    draw: ImageDraw.ImageDraw,
    box: Tuple[int, int, int, int],
    text: str,
    font_path: str,
    max_size: int,
    min_size: int,
) -> None:
    x1, y1, x2, y2 = box
    fnt = fit_font(draw, text, font_path, max_size, min_size, x2 - x1 - 6, y2 - y1 - 6)
    bbox = draw.textbbox((0, 0), text, font=fnt)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = x1 + ((x2 - x1) - w) / 2
    y = y1 + ((y2 - y1) - h) / 2 - 1
    draw.text((x, y), text, fill=BLACK, font=fnt)


def trim_transparent(img: Image.Image) -> Image.Image:
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def color_distance(a: Tuple[int, int, int, int], b: Tuple[int, int, int, int]) -> int:
    return sum(abs(int(a[idx]) - int(b[idx])) for idx in range(3))


def remove_flat_background(img: Image.Image, tolerance: int = 24) -> Image.Image:
    if img.mode != "RGBA":
        img = img.convert("RGBA")

    width, height = img.size
    pixels = img.load()
    corners = [
        pixels[0, 0],
        pixels[width - 1, 0],
        pixels[0, height - 1],
        pixels[width - 1, height - 1],
    ]
    ref = corners[0]
    if not all(color_distance(ref, corner) <= tolerance for corner in corners[1:]):
        return img

    visited = set()
    queue: deque[Tuple[int, int]] = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        current = pixels[x, y]
        if current[3] == 0 or color_distance(current, ref) > tolerance:
            continue
        pixels[x, y] = (255, 255, 255, 0)
        if x > 0:
            queue.append((x - 1, y))
        if x < width - 1:
            queue.append((x + 1, y))
        if y > 0:
            queue.append((x, y - 1))
        if y < height - 1:
            queue.append((x, y + 1))

    return img


def load_asset(stem: str) -> Image.Image:
    for suffix in (".png", ".webp", ".jpg", ".jpeg"):
        path = IMAGE_DIR / f"{stem}{suffix}"
        if path.exists():
            return trim_transparent(remove_flat_background(Image.open(path).convert("RGBA")))
    raise FileNotFoundError(f"Missing asset for stem '{stem}' in {IMAGE_DIR}")


def build_asset_placement(
    asset: Image.Image,
    panel_box: Tuple[int, int, int, int],
    x_ratio: float,
    y_ratio: float,
    scale: float,
) -> Dict[str, Any]:
    x1, y1, x2, y2 = panel_box
    panel_w = x2 - x1
    panel_h = y2 - y1
    target_h = max(40, int(panel_h * scale))
    ratio = target_h / asset.height
    target_w = max(40, int(asset.width * ratio))
    resized = asset.resize((target_w, target_h), Image.LANCZOS)
    center_x = x1 + int(panel_w * x_ratio)
    baseline_y = y1 + int(panel_h * y_ratio)
    paste_x = center_x - target_w // 2
    paste_y = baseline_y - target_h
    return {
        "image": resized,
        "x": paste_x,
        "y": paste_y,
        "w": target_w,
        "h": target_h,
    }


def paste_scene_assets(
    canvas: Image.Image,
    row: Dict[str, Any],
    panel_box: Tuple[int, int, int, int],
) -> None:
    placements: List[Dict[str, Any]] = []
    for scene_asset in sorted(row.get("scene_assets", []), key=lambda item: item.get("z", 0)):
        asset = load_asset(scene_asset["stem"])
        placements.append(
            build_asset_placement(
                asset,
                panel_box,
                float(scene_asset.get("x", 0.5)),
                float(scene_asset.get("y", 0.88)),
                float(scene_asset.get("scale", 0.6)),
            )
        )

    if not placements:
        return

    left = min(item["x"] for item in placements)
    right = max(item["x"] + item["w"] for item in placements)
    top = min(item["y"] for item in placements)
    bottom = max(item["y"] + item["h"] for item in placements)

    x1, y1, x2, y2 = panel_box
    pad_x = max(18, int((x2 - x1) * 0.06))
    pad_y = max(12, int((y2 - y1) * 0.06))

    cluster_center_x = (left + right) / 2
    panel_center_x = (x1 + x2) / 2
    dx = int(round(panel_center_x - cluster_center_x))
    dy = 0

    shifted_left = left + dx
    shifted_right = right + dx
    if shifted_left < x1 + pad_x:
        dx += (x1 + pad_x) - shifted_left
    if shifted_right > x2 - pad_x:
        dx -= shifted_right - (x2 - pad_x)

    shifted_top = top + dy
    shifted_bottom = bottom + dy
    if shifted_top < y1 + pad_y:
        dy += (y1 + pad_y) - shifted_top
    if shifted_bottom > y2 - pad_y:
        dy -= shifted_bottom - (y2 - pad_y)

    for item in placements:
        canvas.alpha_composite(item["image"], (item["x"] + dx, item["y"] + dy))


def auto_scene_assets(row: Dict[str, Any]) -> List[Dict[str, Any]]:
    stems = row.get("scene_asset_stems") or []
    if not stems and row.get("image_asset_id"):
        stems = [row["image_asset_id"]]

    if len(stems) == 1:
        return [{"stem": stems[0], "x": 0.5, "y": 0.88, "scale": 0.72}]
    if len(stems) == 2:
        return [
            {"stem": stems[0], "x": 0.36, "y": 0.84, "scale": 0.72},
            {"stem": stems[1], "x": 0.72, "y": 0.86, "scale": 0.50},
        ]
    if len(stems) >= 3:
        return [
            {"stem": stems[0], "x": 0.26, "y": 0.86, "scale": 0.66},
            {"stem": stems[1], "x": 0.60, "y": 0.88, "scale": 0.52},
            {"stem": stems[2], "x": 0.79, "y": 0.50, "scale": 0.24},
        ]
    return []


def resolve_rows(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    if "renderer_spec" in data:
        spec = data["renderer_spec"]
        rows = spec.get("rows", [])
        for row in rows:
            row.setdefault("scene_assets", auto_scene_assets(row))
        return rows

    rows = data.get("rows", [])
    for row in rows:
        if "scene_assets" not in row:
            row["scene_assets"] = auto_scene_assets(row)
    return rows


def draw_writing_lines(
    draw: ImageDraw.ImageDraw,
    box: Tuple[int, int, int, int],
    count: int = 5,
) -> None:
    x1, y1, x2, y2 = box
    margin_x = 10
    spacing = (y2 - y1) / count
    for idx in range(count):
        y = int(y1 + spacing * (idx + 0.55))
        if idx % 2 == 1:
            dash = 18
            gap = 12
            x = x1 + margin_x
            while x < x2 - margin_x:
                draw.line((x, y, min(x + dash, x2 - margin_x), y), fill=BLACK, width=2)
                x += dash + gap
        else:
            draw.line((x1 + margin_x, y, x2 - margin_x, y), fill=BLACK, width=2)


def draw_row(
    canvas: Image.Image,
    draw: ImageDraw.ImageDraw,
    row: Dict[str, Any],
    row_number: int,
    row_box: Tuple[int, int, int, int],
) -> None:
    x1, y1, x2, y2 = row_box
    draw.rectangle(row_box, outline=BLACK, width=4)

    panel_w = int((x2 - x1) * 0.31)
    panel_box = (x1 + 34, y1 + 20, x1 + panel_w - 22, y2 - 24)
    right_box = (x1 + panel_w + 8, y1 + 12, x2 - 10, y2 - 12)

    num_font = font(FONT_TEXT, 42)
    draw.text((x1 + 20, y1 + 18), f"{row_number}.", fill=BLACK, font=num_font)

    paste_scene_assets(canvas, row, panel_box)

    rx1, ry1, rx2, ry2 = right_box
    gap = 20
    top_h = 116
    text_boxes = row["text_boxes"]

    measure_font = font(FONT_TEXT, 52)
    weights = []
    for text in text_boxes:
        bbox = draw.textbbox((0, 0), text, font=measure_font)
        weights.append(max(1, bbox[2] - bbox[0] + 34))

    total_gap = gap * 2
    available_w = (rx2 - rx1) - total_gap
    scale = available_w / sum(weights)
    widths = [int(weight * scale) for weight in weights]
    widths[-1] = available_w - widths[0] - widths[1]

    bx = rx1
    for idx, text in enumerate(text_boxes):
        box = (bx, ry1, bx + widths[idx], ry1 + top_h)
        draw.rounded_rectangle(box, radius=22, outline=BLACK, width=4, fill=WHITE)
        draw_text_centered(draw, box, text, FONT_TEXT, 62, 28)
        bx += widths[idx] + gap

    lines_box = (rx1, ry1 + top_h + 18, rx2, ry2)
    draw_writing_lines(draw, lines_box, count=5)


def render_page(data: Dict[str, Any], output_path: Path) -> None:
    width = int(data.get("width", DEFAULT_WIDTH))
    height = int(data.get("height", DEFAULT_HEIGHT))
    rows = resolve_rows(data)

    image = Image.new("RGBA", (width, height), WHITE + (255,))
    draw = ImageDraw.Draw(image)

    margin = 24
    draw.rectangle((margin, margin, width - margin, height - margin), outline=BLACK, width=4)

    title = data.get("worksheet_title") or data.get("renderer_spec", {}).get("worksheet_title", "Fix the Mix-Up")
    skill_line = data.get("skill_line") or data.get("renderer_spec", {}).get("skill_line", "")
    directions = data.get("directions") or data.get("renderer_spec", {}).get(
        "directions",
        "Read the words and write the sentence about the picture. Remember to start with a capital letter and end with punctuation.",
    )
    footer = data.get("footer", "Copyright © InterventionStation.com • @TeachwithMrC")

    name_font = font(FONT_REGULAR, 34)
    draw.text((width - 620, 40), "Name:", fill=BLACK, font=name_font)
    draw.line((width - 485, 58, width - 90, 58), fill=BLACK, width=3)

    title_font = fit_font(draw, title, FONT_TITLE, 66, 42, 700)
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_w = title_bbox[2] - title_bbox[0]
    draw.text(((width - title_w) / 2, 62), title, fill=BLACK, font=title_font)

    current_y = 150
    if skill_line:
        skill_font = fit_font(draw, skill_line, FONT_BOLD, 30, 18, 650)
        skill_bbox = draw.textbbox((0, 0), skill_line, font=skill_font)
        skill_w = skill_bbox[2] - skill_bbox[0]
        draw.text(((width - skill_w) / 2, current_y), skill_line, fill=BLACK, font=skill_font)
        current_y += 62

    directions_x = 52
    directions_y = current_y + 6
    dir_label_font = font(FONT_BOLD, 28)
    dir_text_font = font(FONT_REGULAR, 28)
    draw.text((directions_x, directions_y), "Directions:", fill=BLACK, font=dir_label_font)
    label_bbox = draw.textbbox((0, 0), "Directions:", font=dir_label_font)
    text_x = directions_x + (label_bbox[2] - label_bbox[0]) + 10

    max_text_w = width - text_x - 70
    words = directions.split()
    lines: List[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        bbox = draw.textbbox((0, 0), candidate, font=dir_text_font)
        if bbox[2] - bbox[0] <= max_text_w:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)

    for idx, line in enumerate(lines):
        line_x = text_x if idx == 0 else directions_x
        draw.text((line_x, directions_y + idx * 36), line, fill=BLACK, font=dir_text_font)

    footer_reserved = 92
    rows_top = directions_y + max(44, len(lines) * 36) + 28
    usable_h = height - rows_top - footer_reserved
    row_h = usable_h // max(1, len(rows))

    for idx, row in enumerate(rows, start=1):
        row_y1 = rows_top + (idx - 1) * row_h
        row_y2 = rows_top + idx * row_h
        if idx == len(rows):
            row_y2 = height - footer_reserved + 12
        draw_row(image, draw, row, idx, (margin + 6, row_y1, width - margin - 6, row_y2))

    footer_font = font(FONT_REGULAR, 18)
    footer_bbox = draw.textbbox((0, 0), footer, font=footer_font)
    footer_w = footer_bbox[2] - footer_bbox[0]
    footer_h = footer_bbox[3] - footer_bbox[1]
    footer_y = height - margin - footer_h - 12
    draw.text(((width - footer_w) / 2, footer_y), footer, fill=BLACK, font=footer_font)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(output_path, "PNG")


def main() -> int:
    args = parse_args()
    data = load_json(Path(args.input))
    render_page(data, Path(args.output))
    print(f"Wrote {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
