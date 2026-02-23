#!/usr/bin/env python3
"""
Build a multisyllabic image queue from a curated picturable-only allowlist.

Outputs:
  - image_queue_pipeline/artifacts/multisyll_picturable_prompts.csv
  - image_queue_pipeline/artifacts/multisyll_allowlist_not_in_bank.txt
"""

from __future__ import annotations

import csv
import re
from pathlib import Path


ROOT = Path("/Users/seanconnolly/Documents/GitHub/teachwithmrc.github.io")
BANK_JS = ROOT / "multisyllabic_wordbanks.js"
ALLOWLIST = ROOT / "image_queue_pipeline" / "multisyll_picturable_allowlist.txt"
ARTIFACTS = ROOT / "image_queue_pipeline" / "artifacts"
OUT_CSV = ARTIFACTS / "multisyll_picturable_prompts.csv"
OUT_MISSING = ARTIFACTS / "multisyll_allowlist_not_in_bank.txt"


def normalize_word(value: str) -> str:
    return re.sub(r"[^a-z]", "", str(value).lower())


def load_bank_words(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8", errors="ignore")
    raw = [normalize_word(w) for w in re.findall(r'"word"\s*:\s*"([A-Za-z]+)"', text)]
    seen = set()
    out = []
    for word in raw:
        if not word or word in seen:
            continue
        seen.add(word)
        out.append(word)
    return out


def load_allowlist(path: Path) -> list[str]:
    words = []
    seen = set()
    for line in path.read_text(encoding="utf-8").splitlines():
        word = normalize_word(line.strip())
        if not word or word in seen:
            continue
        seen.add(word)
        words.append(word)
    return words


def build_prompt(word: str) -> str:
    return (
        f"Transparent square PNG image of {word}, black-and-white kid-friendly worksheet clipart line art, "
        "bold clean outlines, simple shapes, no shading, no gradients, no text labels, transparent background, high quality. "
        "If people or characters are shown, use diverse features and hairstyles and avoid defaulting to white-coded characters. "
        "No weapons, no violence, no scary or threatening elements."
    )


def main() -> int:
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    bank_words = load_bank_words(BANK_JS)
    bank_set = set(bank_words)
    allow_words = load_allowlist(ALLOWLIST)

    approved = [w for w in allow_words if w in bank_set]
    missing = [w for w in allow_words if w not in bank_set]

    with OUT_CSV.open("w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["word", "prompt"])
        for word in approved:
            writer.writerow([word, build_prompt(word)])

    OUT_MISSING.write_text("\n".join(missing) + ("\n" if missing else ""), encoding="utf-8")

    print(f"bank_words={len(bank_words)}")
    print(f"allowlist_words={len(allow_words)}")
    print(f"approved_for_pictures={len(approved)}")
    print(f"allowlist_missing_in_bank={len(missing)}")
    print(f"wrote={OUT_CSV}")
    print(f"wrote={OUT_MISSING}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
