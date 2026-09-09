#!/usr/bin/env python3
"""Local OCR and evidence pipeline for scanned Arabic/English financial reports.

The default output is deliberately privacy-minimised: it stores only candidate
financial rows, page numbers, confidence, hashes and verification results. Full
page OCR text is written only when --retain-raw is explicitly supplied.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable


ROOT = Path(__file__).resolve().parent.parent
DEFAULT_PROFILES = ROOT / "tools" / "ocr_profiles.json"
LOCAL_TESSDATA = ROOT / "tools" / "tessdata"

ARABIC_DIGITS = str.maketrans("٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹", "01234567890123456789")
PII_PATTERNS = [
    re.compile(r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", re.I),
    re.compile(r"(?<!\d)(?:\+\d[\d\s().-]{7,}\d)(?!\d)"),
]

FIELD_ALIASES: dict[str, list[str]] = {
    "cash": ["النقد", "صافي النقود", "النقد ومعادلاته", "cash and cash equivalents"],
    "current_liabilities": ["مجموع الالتزامات المتداولة", "current liabilities"],
    "current_assets": ["مجموع الأصول المتداولة", "current assets"],
    "cfo": ["صافي النقد الناتج من الانشطة التشغيلية", "صافي التدفقات النقدية من الأنشطة التشغيلية", "net cash from operating activities"],
    "capex": ["زيادة في الموجودات الثابتة", "شراء الموجودات الثابتة", "capital expenditure", "capex"],
    "ebitda": ["ebitda"],
    "interest_bearing_debt": ["القروض طويلة الاجل", "القروض قصيرة الاجل", "التزامات تمويل عقود الايجار", "interest bearing debt"],
    "interest_expense": ["فوائد مدينة", "interest expense", "finance costs"],
    "ar": ["صافي الذمم المدينة", "الذمم المدينة", "trade receivables"],
    "revenue": ["إيراد النشاط الجاري", "ايراد النشاط الجاري", "revenue"],
    "ap": ["الذمم الدائنة", "trade payables"],
    "cogs": ["كلفة النشاط التجاري", "cost of goods sold", "cogs"],
    "our_ar": ["our ar", "أرصدة شركتنا"],
    "available_cash": ["available cash", "النقد المتاح", "النقد غير المقيد"],
}


@dataclass
class OcrLine:
    page: int
    text: str
    confidence: float
    left: int
    top: int
    width: int
    height: int


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def normalize_text(value: str) -> str:
    value = unicodedata.normalize("NFKC", value).translate(ARABIC_DIGITS)
    value = value.replace("ـ", "").replace("،", ",").replace("٬", ",").replace("٫", ".")
    value = "".join(ch for ch in value if unicodedata.category(ch) != "Cf")
    return re.sub(r"\s+", " ", value).strip().lower()


def redact_text(value: str) -> str:
    for pattern in PII_PATTERNS:
        value = pattern.sub("[REDACTED]", value)
    return value


def parse_numbers(value: str) -> list[float]:
    value = normalize_text(value)
    found: list[float] = []
    for match in re.finditer(r"(?<!\w)(\()?[-+]?\d[\d,.]*\d|(?<!\w)\d(?!\w)", value):
        token = match.group(0).strip()
        negative = token.startswith("(") or token.startswith("-")
        token = re.sub(r"[^0-9.]", "", token.replace(",", ""))
        if not token or token.count(".") > 1:
            continue
        try:
            number = float(token)
        except ValueError:
            continue
        found.append(-number if negative else number)
    return found


def find_binary(name: str, explicit: str | None = None) -> str:
    candidates = [explicit] if explicit else []
    candidates.extend([
        shutil.which(name),
        str(Path("/usr/local/bin") / name),
        str(Path("/opt/homebrew/bin") / name),
    ])
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return str(candidate)
    raise RuntimeError(f"Missing required executable: {name}")


def find_system_tessdata() -> Path:
    env = os.environ.get("TESSDATA_PREFIX")
    candidates = [
        Path(env) if env else None,
        Path("/usr/local/share/tessdata"),
        Path("/opt/homebrew/share/tessdata"),
    ]
    candidates.extend(Path("/usr/local/Cellar/tesseract").glob("*/share/tessdata"))
    candidates.extend(Path("/opt/homebrew/Cellar/tesseract").glob("*/share/tessdata"))
    for candidate in candidates:
        if candidate and (candidate / "eng.traineddata").exists():
            return candidate
    raise RuntimeError("Cannot locate eng.traineddata. Install Tesseract with English language data.")


def prepare_tessdata(temp_root: Path) -> Path:
    system_data = find_system_tessdata()
    local_ar = LOCAL_TESSDATA / "ara.traineddata"
    if not local_ar.exists():
        raise RuntimeError(f"Missing bundled Arabic model: {local_ar}")
    target = temp_root / "tessdata"
    target.mkdir()
    for lang, source in {
        "ara": local_ar,
        "eng": system_data / "eng.traineddata",
        "osd": system_data / "osd.traineddata",
    }.items():
        if source.exists():
            os.symlink(source, target / f"{lang}.traineddata")
    return target


def has_text_layer(pdf: Path) -> tuple[bool, int]:
    try:
        from pypdf import PdfReader
    except ImportError:
        return False, 0
    reader = PdfReader(str(pdf))
    chars = sum(len((page.extract_text() or "").strip()) for page in reader.pages)
    return chars >= 100, len(reader.pages)


def render_pages(pdf: Path, output_prefix: Path, dpi: int, pdftoppm: str) -> list[Path]:
    command = [pdftoppm, "-r", str(dpi), "-png", str(pdf), str(output_prefix)]
    subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    pages = sorted(output_prefix.parent.glob(f"{output_prefix.name}-*.png"), key=lambda p: int(p.stem.rsplit("-", 1)[-1]))
    if not pages:
        raise RuntimeError("PDF rendering produced no pages")
    return pages


def tesseract_lines(image: Path, page: int, tesseract: str, tessdata: Path) -> tuple[list[OcrLine], str]:
    env = dict(os.environ)
    env["TESSDATA_PREFIX"] = str(tessdata)
    # Tesseract 4.x on the migration baseline ignores a trailing `tsv` config
    # after options, so enable TSV explicitly for version-independent output.
    command = [tesseract, str(image), "stdout", "-l", "ara+eng", "--psm", "6", "-c", "tessedit_create_txt=0", "-c", "tessedit_create_tsv=1"]
    result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, env=env)
    rows = csv.DictReader(result.stdout.splitlines(), delimiter="\t")
    grouped: dict[tuple[int, int, int], list[dict[str, str]]] = {}
    for row in rows:
        if int(row.get("level", "0") or 0) != 5 or not (row.get("text") or "").strip():
            continue
        key = (int(row["block_num"]), int(row["par_num"]), int(row["line_num"]))
        grouped.setdefault(key, []).append(row)
    lines: list[OcrLine] = []
    raw_parts: list[str] = []
    for words in grouped.values():
        words.sort(key=lambda r: int(r["left"]))
        text = " ".join((w.get("text") or "").strip() for w in words).strip()
        confidences = [float(w["conf"]) for w in words if float(w.get("conf", "-1") or -1) >= 0]
        left = min(int(w["left"]) for w in words)
        top = min(int(w["top"]) for w in words)
        right = max(int(w["left"]) + int(w["width"]) for w in words)
        bottom = max(int(w["top"]) + int(w["height"]) for w in words)
        line = OcrLine(page, redact_text(text), sum(confidences) / len(confidences) if confidences else 0.0, left, top, right-left, bottom-top)
        lines.append(line)
        raw_parts.append(redact_text(text))
    lines.sort(key=lambda line: (line.top, line.left))
    return lines, "\n".join(raw_parts)


def alias_score(line: str, alias: str) -> float:
    line_n = normalize_text(line)
    alias_n = normalize_text(alias)
    if alias_n in line_n:
        return 1.0
    line_tokens = set(line_n.split())
    alias_tokens = set(alias_n.split())
    return len(line_tokens & alias_tokens) / max(1, len(alias_tokens))


def candidate_rows(lines: Iterable[OcrLine]) -> list[dict[str, Any]]:
    lines = list(lines)
    candidates: list[dict[str, Any]] = []
    for line in lines:
        best_field = ""
        best_alias = ""
        best_score = 0.0
        for field, aliases in FIELD_ALIASES.items():
            for alias in aliases:
                score = alias_score(line.text, alias)
                if score > best_score:
                    best_field, best_alias, best_score = field, alias, score
        numbers = parse_numbers(line.text)
        evidence_text = line.text
        evidence_confidence = line.confidence
        if best_score >= 0.60 and not numbers:
            center = line.top + line.height / 2
            nearby = []
            for other in lines:
                if other is line or other.page != line.page:
                    continue
                other_center = other.top + other.height / 2
                threshold = max(line.height, other.height) * 1.4 + 12
                if abs(center - other_center) <= threshold and parse_numbers(other.text):
                    nearby.append(other)
            nearby.sort(key=lambda row: row.left)
            if nearby:
                numbers = [number for row in nearby for number in parse_numbers(row.text)]
                evidence_text = " | ".join([line.text] + [row.text for row in nearby])
                evidence_confidence = min([line.confidence] + [row.confidence for row in nearby])
        if best_score >= 0.60 and numbers:
            candidates.append({
                "source": "ocr",
                "field": best_field,
                "page": line.page,
                "ocr_confidence": round(evidence_confidence, 2),
                "alias_score": round(best_score, 3),
                "matched_alias": best_alias,
                "numbers": " | ".join(f"{n:g}" for n in numbers),
                "evidence_text": evidence_text,
                "bbox": f"{line.left},{line.top},{line.width},{line.height}",
            })
    return candidates


def load_profiles(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def select_profile(profiles: dict[str, Any], requested: str | None, digest: str) -> tuple[str | None, dict[str, Any] | None]:
    if requested:
        if requested not in profiles:
            raise RuntimeError(f"Unknown profile: {requested}")
        return requested, profiles[requested]
    for name, profile in profiles.items():
        if profile.get("sha256") == digest:
            return name, profile
    return None, None


def metric_rows(profile: dict[str, Any] | None, candidates: list[dict[str, Any]], hash_match: bool) -> list[dict[str, Any]]:
    by_field: dict[str, list[dict[str, Any]]] = {}
    for candidate in candidates:
        by_field.setdefault(candidate["field"], []).append(candidate)
    output: list[dict[str, Any]] = []
    reviewed = (profile or {}).get("metrics", {})
    for field in FIELD_ALIASES:
        item = dict(reviewed.get(field, {}))
        auto = sorted(by_field.get(field, []), key=lambda row: (row["alias_score"], row["ocr_confidence"]), reverse=True)
        status = item.get("status", "review" if auto else "missing")
        if item and not hash_match:
            status = "review_hash_mismatch"
        row = {
            "field": field,
            "label_zh": item.get("label_zh", field),
            "value": item.get("value", ""),
            "unit": item.get("unit", (profile or {}).get("unit", "")),
            "period": item.get("period", (profile or {}).get("period", "")),
            "status": status,
            "page": item.get("page", auto[0]["page"] if auto else ""),
            "verification_method": item.get("verification_method", "OCR待人工复核" if auto else "未检出"),
            "evidence_text": item.get("evidence_text", auto[0]["evidence_text"] if auto else ""),
            "ocr_confidence": auto[0]["ocr_confidence"] if auto else "",
            "note": item.get("note", ""),
        }
        output.append(row)
    return output


def run_checks(profile: dict[str, Any] | None, hash_match: bool) -> list[dict[str, Any]]:
    results: list[dict[str, Any]] = []
    for check in (profile or {}).get("checks", []):
        lhs = sum(float(x) for x in check.get("lhs", []))
        rhs = sum(float(x) for x in check.get("rhs", []))
        tolerance = float(check.get("tolerance", 0.5))
        passed = hash_match and abs(lhs - rhs) <= tolerance
        results.append({
            "check": check["name"],
            "lhs": lhs,
            "rhs": rhs,
            "difference": lhs-rhs,
            "tolerance": tolerance,
            "status": "pass" if passed else "fail",
            "note": check.get("note", ""),
        })
    return results


def write_csv(path: Path, rows: list[dict[str, Any]], fieldnames: list[str] | None = None) -> None:
    if not rows and not fieldnames:
        return
    names = fieldnames or list(rows[0])
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=names,
            extrasaction="ignore",
            lineterminator="\n",
        )
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract and verify scanned Arabic/English financial reports locally")
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--profile", help="Named reviewed profile; auto-selected by SHA-256 when omitted")
    parser.add_argument("--profiles", type=Path, default=DEFAULT_PROFILES)
    parser.add_argument("--dpi", type=int, default=300)
    parser.add_argument("--tesseract")
    parser.add_argument("--pdftoppm")
    parser.add_argument("--retain-raw", action="store_true", help="Store full per-page OCR text; may contain personal information")
    args = parser.parse_args()

    pdf = args.pdf.resolve()
    if not pdf.is_file():
        parser.error(f"PDF not found: {pdf}")
    args.output_dir.mkdir(parents=True, exist_ok=True)
    digest = sha256_file(pdf)
    profiles = load_profiles(args.profiles)
    profile_name, profile = select_profile(profiles, args.profile, digest)
    hash_match = bool(profile and profile.get("sha256") == digest)
    text_layer, page_count = has_text_layer(pdf)
    tesseract = find_binary("tesseract", args.tesseract)
    pdftoppm = find_binary("pdftoppm", args.pdftoppm)

    all_lines: list[OcrLine] = []
    with tempfile.TemporaryDirectory(prefix="financial-ocr-") as tmp:
        temp_root = Path(tmp)
        tessdata = prepare_tessdata(temp_root)
        images = render_pages(pdf, temp_root / "page", args.dpi, pdftoppm)
        for page_number, image in enumerate(images, 1):
            lines, raw_text = tesseract_lines(image, page_number, tesseract, tessdata)
            all_lines.extend(lines)
            if args.retain_raw:
                (args.output_dir / f"raw_ocr_page_{page_number}.txt").write_text(raw_text, encoding="utf-8")

    financial_pages = set((profile or {}).get("financial_pages", []))
    candidate_input = [line for line in all_lines if not financial_pages or line.page in financial_pages]
    candidates = candidate_rows(candidate_input)
    metrics = metric_rows(profile, candidates, hash_match)
    checks = run_checks(profile, hash_match)
    profile_candidates = []
    for row in metrics:
        if row["value"] == "":
            continue
        profile_candidates.append({
            "source": "reviewed_profile" if hash_match else "profile_hash_mismatch",
            "field": row["field"],
            "page": row["page"],
            "ocr_confidence": row["ocr_confidence"],
            "alias_score": 1 if hash_match else 0,
            "matched_alias": "SHA-256 locked reviewed evidence",
            "numbers": row["value"],
            "evidence_text": row["evidence_text"],
            "bbox": "",
        })
    write_csv(args.output_dir / "metric_candidates.csv", candidates + profile_candidates, ["source", "field", "page", "ocr_confidence", "alias_score", "matched_alias", "numbers", "evidence_text", "bbox"])
    write_csv(args.output_dir / "verified_metrics.csv", metrics)
    write_csv(args.output_dir / "verification_checks.csv", checks, ["check", "lhs", "rhs", "difference", "tolerance", "status", "note"])

    summary = {
        "schema_version": 1,
        "source_filename": pdf.name,
        "source_sha256": digest,
        "source_pdf_bundled": False,
        "profile": profile_name,
        "profile_hash_match": hash_match,
        "report_entity": (profile or {}).get("entity", ""),
        "report_period": (profile or {}).get("period", ""),
        "unit": (profile or {}).get("unit", ""),
        "page_count": page_count,
        "text_layer_detected": text_layer,
        "ocr_engine": "Tesseract 4.x ara+eng",
        "privacy_mode": "raw_ocr_retained" if args.retain_raw else "financial_rows_only",
        "verified_metric_count": sum(1 for row in metrics if str(row["status"]).startswith("verified")),
        "review_metric_count": sum(1 for row in metrics if str(row["status"]).startswith("review")),
        "missing_metric_count": sum(1 for row in metrics if row["status"] == "missing"),
        "verification_checks_passed": sum(1 for row in checks if row["status"] == "pass"),
        "verification_checks_total": len(checks),
        "metrics": metrics,
        "checks": checks,
    }
    (args.output_dir / "verification_report.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: summary[k] for k in ["profile", "report_entity", "verified_metric_count", "review_metric_count", "missing_metric_count", "verification_checks_passed", "verification_checks_total", "privacy_mode"]}, ensure_ascii=False))
    return 0 if (not checks or all(row["status"] == "pass" for row in checks)) else 4


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (RuntimeError, subprocess.CalledProcessError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(2)
