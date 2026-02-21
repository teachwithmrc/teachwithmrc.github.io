# Image Queue Pipeline

Generate black-and-white worksheet clipart PNGs from the prompt CSV and save directly into:

- `/Users/seanconnolly/Documents/GitHub/teachwithmrc.github.io/images`

## 1) Set your API key in this shell

```bash
export OPENAI_API_KEY='your_key_here'
```

Quick check:

```bash
echo "OPENAI_API_KEY_SET=${OPENAI_API_KEY:+yes}"
```

Alternative: put this in `/Users/seanconnolly/Documents/GitHub/teachwithmrc.github.io/.env`

```bash
OPENAI_API_KEY=your_key_here
```

## 2) Generate the first few images

```bash
python3 image_queue_pipeline/generate_clipart_images.py \
  --csv images/clipart_prompts_descriptive.csv \
  --output-dir images \
  --limit 5
```

## Useful options

- `--start-index 20` to continue later in the CSV
- `--overwrite` to regenerate existing files
- `--dry-run` to preview without API calls
- `--log image_queue_pipeline/generation_log.csv` to keep attempt history
- `--api-key sk-...` to pass a key directly

## Notes

- Filenames are auto-normalized to lowercase `word.png`.
- Existing files are skipped by default.
- Failures are logged and the batch continues.
