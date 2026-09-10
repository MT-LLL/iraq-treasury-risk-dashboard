#!/usr/bin/env python3
"""Local same-origin server for the dashboard OCR and scoring workbench."""

from __future__ import annotations

import argparse
import csv
import json
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import time
import uuid
from email.parser import BytesParser
from email.policy import default
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent
TOOLS = ROOT / "tools"
sys.path.insert(0, str(TOOLS))

from payment_capacity import FIELD_LABELS, RED_FLAGS, score_payment_capacity  # noqa: E402


MAX_UPLOAD_BYTES = 30 * 1024 * 1024
MAX_JSON_BYTES = 1024 * 1024
MAX_PAGES = 80
OCR_TIMEOUT_SECONDS = 12 * 60
LIVE_OUTPUT = ROOT / "outputs" / "live"
OCR_LOCK = threading.BoundedSemaphore(1)


def executable_status(name: str) -> dict[str, object]:
    path = shutil.which(name)
    return {"available": bool(path), "path": path or ""}


def read_csv(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        return []
    with path.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def pdf_page_count(path: Path) -> int | None:
    pdfinfo = shutil.which("pdfinfo")
    if pdfinfo:
        result = subprocess.run([pdfinfo, str(path)], capture_output=True, text=True, timeout=30)
        match = re.search(r"^Pages:\s+(\d+)\s*$", result.stdout, re.MULTILINE)
        if match:
            return int(match.group(1))
    try:
        from pypdf import PdfReader
        return len(PdfReader(str(path)).pages)
    except Exception:
        return None


def profile_options() -> list[dict[str, str]]:
    profiles_path = TOOLS / "ocr_profiles.json"
    profiles = json.loads(profiles_path.read_text(encoding="utf-8"))
    return [
        {
            "key": key,
            "entity": str(value.get("entity", "")),
            "period": str(value.get("period", "")),
            "unit": str(value.get("unit", "")),
        }
        for key, value in profiles.items()
    ]


def parse_multipart(content_type: str, body: bytes) -> tuple[bytes, str | None]:
    message = BytesParser(policy=default).parsebytes(
        b"Content-Type: " + content_type.encode("ascii", "ignore") + b"\r\nMIME-Version: 1.0\r\n\r\n" + body
    )
    pdf_bytes: bytes | None = None
    profile: str | None = None
    if not message.is_multipart():
        raise ValueError("Request must be multipart/form-data")
    for part in message.iter_parts():
        name = part.get_param("name", header="content-disposition")
        payload = part.get_payload(decode=True) or b""
        if name == "file":
            pdf_bytes = payload
        elif name == "profile":
            profile = payload.decode("utf-8", "replace").strip() or None
    if not pdf_bytes:
        raise ValueError("Missing PDF file")
    return pdf_bytes, profile


def run_ocr(pdf_bytes: bytes, profile: str | None) -> dict[str, object]:
    if len(pdf_bytes) > MAX_UPLOAD_BYTES:
        raise ValueError("PDF exceeds the 30 MB upload limit")
    if not pdf_bytes.lstrip().startswith(b"%PDF-"):
        raise ValueError("Uploaded file is not a valid PDF")
    run_id = time.strftime("%Y%m%d-%H%M%S") + "-" + uuid.uuid4().hex[:8]
    output_dir = LIVE_OUTPUT / run_id
    output_dir.mkdir(parents=True, exist_ok=False)
    with tempfile.TemporaryDirectory(prefix="iraq-dashboard-upload-") as temporary:
        pdf_path = Path(temporary) / "report.pdf"
        pdf_path.write_bytes(pdf_bytes)
        pages = pdf_page_count(pdf_path)
        if pages is not None and pages > MAX_PAGES:
            raise ValueError(f"PDF has {pages} pages; the local limit is {MAX_PAGES}")
        command = [sys.executable, str(TOOLS / "ocr_financials.py"), str(pdf_path), "--output-dir", str(output_dir)]
        if profile:
            command.extend(["--profile", profile])
        result = subprocess.run(command, capture_output=True, text=True, timeout=OCR_TIMEOUT_SECONDS)
    if result.returncode not in (0, 4):
        detail = (result.stderr or result.stdout or "OCR process failed").strip()
        raise RuntimeError(detail[-1600:])
    report_path = output_dir / "verification_report.json"
    if not report_path.exists():
        raise RuntimeError("OCR process did not create a verification report")
    report = json.loads(report_path.read_text(encoding="utf-8"))
    candidates = read_csv(output_dir / "metric_candidates.csv")
    checks = read_csv(output_dir / "verification_checks.csv")
    score = score_payment_capacity(report.get("metrics", []))
    response = {
        "execution_mode": "local_api",
        "run_id": run_id,
        "report": report,
        "candidates": candidates[:250],
        "checks": checks,
        "score": score,
        "privacy": {
            "source_pdf_deleted": True,
            "raw_page_text_retained": False,
            "persisted_directory": f"outputs/live/{run_id}",
        },
    }
    (output_dir / "session_result.json").write_text(json.dumps(response, ensure_ascii=False, indent=2), encoding="utf-8")
    return response


class DashboardHandler(SimpleHTTPRequestHandler):
    server_version = "IraqTreasuryDashboard/1.0"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("X-Frame-Options", "DENY")
        super().end_headers()

    def json_response(self, payload: object, status: int = 200) -> None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def json_error(self, message: str, status: int) -> None:
        self.json_response({"ok": False, "error": message}, status)

    def do_GET(self) -> None:
        path = unquote(urlparse(self.path).path)
        if path == "/api/health":
            dependencies = {name: executable_status(name) for name in ("tesseract", "pdftoppm", "pdfinfo")}
            self.json_response({
                "ok": True,
                "ready": dependencies["tesseract"]["available"] and dependencies["pdftoppm"]["available"],
                "version": "v10-ocr-workbench",
                "dependencies": dependencies,
                "limits": {"upload_mb": MAX_UPLOAD_BYTES // 1024 // 1024, "pages": MAX_PAGES},
                "profiles": profile_options(),
                "field_labels": FIELD_LABELS,
                "red_flags": RED_FLAGS,
            })
            return
        if path == "/api/runs/latest":
            results = sorted(LIVE_OUTPUT.glob("*/session_result.json"), key=lambda item: item.stat().st_mtime, reverse=True)
            if not results:
                self.json_error("No OCR run is available", HTTPStatus.NOT_FOUND)
                return
            self.json_response(json.loads(results[0].read_text(encoding="utf-8")))
            return
        parts = [part for part in Path(path).parts if part not in ("/", "")]
        if any(part.startswith(".") for part in parts) or path.startswith("/outputs/live/") or "raw_ocr_page_" in path:
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        super().do_GET()

    def do_POST(self) -> None:
        path = urlparse(self.path).path
        if path == "/api/ocr":
            self.handle_ocr()
            return
        if path == "/api/score":
            self.handle_score()
            return
        self.json_error("Unknown API endpoint", HTTPStatus.NOT_FOUND)

    def read_body(self, maximum: int) -> bytes:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError as exc:
            raise ValueError("Invalid Content-Length") from exc
        if length <= 0:
            raise ValueError("Request body is empty")
        if length > maximum:
            raise OverflowError("Request body is too large")
        return self.rfile.read(length)

    def handle_ocr(self) -> None:
        if not OCR_LOCK.acquire(blocking=False):
            self.json_error("Another OCR job is running; retry after it completes", HTTPStatus.TOO_MANY_REQUESTS)
            return
        try:
            content_type = self.headers.get("Content-Type", "")
            if not content_type.lower().startswith("multipart/form-data"):
                self.json_error("Content-Type must be multipart/form-data", HTTPStatus.UNSUPPORTED_MEDIA_TYPE)
                return
            body = self.read_body(MAX_UPLOAD_BYTES + 1024 * 1024)
            pdf_bytes, profile = parse_multipart(content_type, body)
            allowed_profiles = {item["key"] for item in profile_options()}
            if profile and profile not in allowed_profiles:
                raise ValueError("Unknown OCR profile")
            self.json_response({"ok": True, **run_ocr(pdf_bytes, profile)})
        except OverflowError as exc:
            self.json_error(str(exc), HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
        except ValueError as exc:
            self.json_error(str(exc), HTTPStatus.BAD_REQUEST)
        except subprocess.TimeoutExpired:
            self.json_error("OCR exceeded the 12 minute local timeout", HTTPStatus.GATEWAY_TIMEOUT)
        except Exception as exc:
            self.json_error(str(exc), HTTPStatus.INTERNAL_SERVER_ERROR)
        finally:
            OCR_LOCK.release()

    def handle_score(self) -> None:
        try:
            body = self.read_body(MAX_JSON_BYTES)
            request = json.loads(body.decode("utf-8"))
            result = score_payment_capacity(
                request.get("metrics", []),
                request.get("overrides", {}),
                request.get("red_flags", {}),
                float(request.get("fcf_near_zero_pct", 0.01)),
            )
            self.json_response({"ok": True, "score": result})
        except OverflowError as exc:
            self.json_error(str(exc), HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
        except (ValueError, TypeError, json.JSONDecodeError) as exc:
            self.json_error(str(exc), HTTPStatus.BAD_REQUEST)

    def log_message(self, message: str, *args: object) -> None:
        sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), message % args))


def main() -> int:
    parser = argparse.ArgumentParser(description="Serve the dashboard with local OCR and scoring APIs")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8099)
    parser.add_argument("--allow-network", action="store_true", help="Required when binding to a non-loopback host")
    args = parser.parse_args()
    if args.host not in {"127.0.0.1", "localhost", "::1"} and not args.allow_network:
        parser.error("Non-loopback binding requires --allow-network")
    LIVE_OUTPUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer((args.host, args.port), DashboardHandler)
    print(f"Dashboard: http://{args.host}:{args.port}")
    print("Uploads stay local; source PDFs are deleted after OCR.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
