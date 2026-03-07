# Image Queue Pipeline

Generate black-and-white worksheet clipart PNGs from the prompt CSV and save directly into:

- `/Users/seanconnolly/Documents/GitHub/teachwithmrc.github.io/images`

There are now two runners:

- `generate_clipart_images.py` for the existing OpenAI flow
- `generate_gemini_images.py` for Gemini with spend guardrails

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

## Gemini runner

The YouTube transcript you shared uses the older `gemini-2.0-flash-preview-image-generation` example. That model was shut down on November 14, 2025, so the queue runner here defaults to `gemini-2.5-flash-image`.

Set a Gemini key in this shell or in `.env`:

```bash
export GEMINI_API_KEY='your_key_here'
```

You can also use `GOOGLE_API_KEY`.

Preview a low-cost run first:

```bash
python3 image_queue_pipeline/generate_gemini_images.py \
  --csv image_queue_pipeline/artifacts/multisyll_picturable_prompts.csv \
  --output-dir images \
  --limit 10 \
  --max-estimated-cost-usd 0.39 \
  --dry-run
```

Run the same batch live:

```bash
python3 image_queue_pipeline/generate_gemini_images.py \
  --csv image_queue_pipeline/artifacts/multisyll_picturable_prompts.csv \
  --output-dir images \
  --limit 10 \
  --max-estimated-cost-usd 0.39
```

Useful Gemini-specific options:

- `--prompt-prefix` and `--prompt-suffix` to enforce a consistent product style
- `--pricing-mode standard|batch` to estimate spend using Google’s standard or batch pricing during `--dry-run`
- `--estimated-cost-per-image 0.02` if you want to override the built-in estimate
- `--aspect-ratio 4:5` for portrait product images instead of square ones

Important note:

- `--pricing-mode batch` is dry-run planning only. Live runs use standard one-at-a-time requests.
