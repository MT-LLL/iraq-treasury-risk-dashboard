# Complete migration guide

## Included

- Static dashboard (`index.html`) and local CSV data.
- Integrated local dashboard/API server (`server.py`).
- Deterministic 10-metric scoring engine (`tools/payment_capacity.py`).
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
python3 tools/test_payment_capacity.py
python3 tools/ocr_financials.py /path/to/report.pdf --output-dir outputs/ocr-run
python3 server.py
```

On macOS, `start_dashboard.command` can be opened directly instead of typing the final command.

Open <http://127.0.0.1:8088>. The integrated workflow is:

1. Upload a PDF in **扫描财报 OCR**.
2. Let SHA-256 select the reviewed operator profile, or choose one explicitly.
3. Review field value, page, evidence, status, and financial checks.
4. Tick **人工核验** only after checking yellow/red fields; add internal values such as Our AR.
5. Recalculate the 10 metrics and confirm the five Red Flags.
6. Download the privacy-minimised run JSON if an audit copy is needed.

GitHub Pages remains a read-only view because it cannot execute local Tesseract or Python. For a complete workflow, run `server.py` on the analyst's workstation or an approved private host. The server binds to `127.0.0.1` by default; non-loopback binding requires the explicit `--allow-network` flag and should be protected by an authenticated reverse proxy.

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
- Uploads are limited to PDF files, 30 MB, and 80 pages; one OCR job runs at a time.
- Uploaded PDFs use a temporary generic filename and are deleted after OCR.
- `outputs/live/` contains privacy-minimised run evidence and is excluded from Git and migration archives.
- The bundled report evidence contains financial lines only; incidental signatory and contact details are excluded.
- If `--retain-raw` is used, treat the generated text as sensitive and do not add it to a migration archive without a separate review.
