# Complete migration guide

## Included

- Static dashboard (`index.html`) and local CSV data.
- OCR-enabled Excel scoring model.
- Local OCR CLI (`tools/ocr_financials.py`).
- Arabic Tesseract model (`tools/tessdata/ara.traineddata`).
- Reviewed extraction profiles and SHA-256 locks for the two official H1 2026 operator scans.
- Sanitised extraction evidence and verification reports. Source PDFs and full-page OCR text are intentionally excluded.

## Target prerequisites

1. Python 3.10 or later.
2. Tesseract with the English language model.
3. Poppler with `pdftoppm` available on `PATH`.
4. Optional: `pypdf` for text-layer detection and page count reporting. OCR still runs without it.

macOS example:

```bash
brew install tesseract poppler
python3 -m pip install pypdf
```

Ubuntu/Debian example:

```bash
sudo apt-get install tesseract-ocr poppler-utils python3-pypdf
```

## Run and verify

```bash
python3 tools/test_ocr_financials.py
python3 tools/ocr_financials.py /path/to/report.pdf --output-dir outputs/ocr-run
```

Review these files after each run:

- `verified_metrics.csv`: model fields, values, pages, evidence, and status.
- `metric_candidates.csv`: OCR-generated candidates for analyst review.
- `verification_checks.csv`: balance-sheet, subtotal, and cash-rollforward checks.
- `verification_report.json`: document hash, privacy mode, and run summary.

Only statuses beginning with `verified` are allowed to flow into the Excel model. `review` and `missing` values remain blank unless an analyst explicitly enters a manual override.

## Privacy and secrets

- Default mode does not retain full-page OCR text.
- Source scans are not bundled.
- No cloud OCR endpoint, credential file, token, or API key is used.
- The bundled report evidence contains financial lines only; incidental signatory and contact details are excluded.
- If `--retain-raw` is used, treat the generated text as sensitive and do not add it to a migration archive without a separate review.
