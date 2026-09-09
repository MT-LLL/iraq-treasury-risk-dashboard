#!/usr/bin/env python3
"""Deterministic 10-metric customer payment-capacity scoring.

Only OCR rows whose status begins with ``verified`` are accepted automatically.
Analyst-entered overrides are accepted explicitly and labelled ``manual_verified``.
Missing inputs never become zero and suppress the official total score.
"""

from __future__ import annotations

import math
from typing import Any, Mapping


FIELD_LABELS = {
    "cash": "现金及现金等价物",
    "current_liabilities": "流动负债",
    "current_assets": "流动资产",
    "cfo": "经营现金流 CFO",
    "capex": "资本开支 Capex",
    "ebitda": "EBITDA",
    "interest_bearing_debt": "有息负债",
    "interest_expense": "利息费用",
    "ar": "应收账款 AR",
    "revenue": "Revenue",
    "ap": "应付账款 AP",
    "cogs": "COGS",
    "our_ar": "我方 AR",
    "available_cash": "可动用现金",
}


METRICS = [
    {"key": "cash_to_current_liabilities", "dimension": "现金", "label": "Cash / Current Liabilities", "formula": "现金及现金等价物 ÷ 流动负债", "weight": 15, "format": "percent"},
    {"key": "current_ratio", "dimension": "流动性", "label": "Current Ratio", "formula": "流动资产 ÷ 流动负债", "weight": 10, "format": "multiple"},
    {"key": "cfo_to_current_liabilities", "dimension": "经营现金流", "label": "CFO / Current Liabilities", "formula": "经营现金流 ÷ 流动负债", "weight": 10, "format": "percent"},
    {"key": "fcf", "dimension": "自由现金流", "label": "FCF", "formula": "CFO − Capex", "weight": 15, "format": "amount"},
    {"key": "cfo_to_ebitda", "dimension": "现金转化", "label": "CFO / EBITDA", "formula": "经营现金流 ÷ EBITDA", "weight": 10, "format": "percent"},
    {"key": "net_debt_to_ebitda", "dimension": "杠杆", "label": "Net Debt / EBITDA", "formula": "（有息负债 − 现金）÷ EBITDA", "weight": 10, "format": "multiple"},
    {"key": "interest_coverage", "dimension": "偿债", "label": "Interest Coverage", "formula": "EBITDA ÷ 利息费用", "weight": 10, "format": "multiple"},
    {"key": "dso", "dimension": "回款", "label": "DSO", "formula": "应收账款 ÷ Revenue × 365", "weight": 5, "format": "days"},
    {"key": "payable_days", "dimension": "供应商付款", "label": "Payable Days", "formula": "应付账款 ÷ COGS × 365", "weight": 5, "format": "days"},
    {"key": "our_ar_to_available_cash", "dimension": "我方风险敞口", "label": "Our AR / Available Cash", "formula": "我方 AR ÷ 可动用现金", "weight": 10, "format": "percent"},
]


REQUIRED_FIELDS = {
    "cash_to_current_liabilities": ("cash", "current_liabilities"),
    "current_ratio": ("current_assets", "current_liabilities"),
    "cfo_to_current_liabilities": ("cfo", "current_liabilities"),
    "fcf": ("cfo", "capex", "revenue"),
    "cfo_to_ebitda": ("cfo", "ebitda"),
    "net_debt_to_ebitda": ("interest_bearing_debt", "cash", "ebitda"),
    "interest_coverage": ("ebitda", "interest_expense"),
    "dso": ("ar", "revenue"),
    "payable_days": ("ap", "cogs"),
    "our_ar_to_available_cash": ("our_ar", "available_cash"),
}


RED_FLAGS = {
    "cfo_negative_consecutive": "CFO 连续为负",
    "fcf_negative_consecutive": "FCF 连续为负",
    "dso_rising": "DSO 持续上升",
    "large_debt_due": "大额债务近期到期",
    "going_concern": "持续经营风险",
}


def _number(value: Any) -> float | None:
    if value in (None, ""):
        return None
    try:
        parsed = float(str(value).replace(",", "").strip())
    except (TypeError, ValueError):
        return None
    return parsed if math.isfinite(parsed) else None


def verified_values(metric_rows: list[Mapping[str, Any]], overrides: Mapping[str, Any] | None = None) -> tuple[dict[str, float], dict[str, str]]:
    values: dict[str, float] = {}
    provenance: dict[str, str] = {}
    for row in metric_rows:
        field = str(row.get("field", ""))
        status = str(row.get("status", ""))
        value = _number(row.get("value"))
        if field in FIELD_LABELS and status.startswith("verified") and value is not None:
            values[field] = value
            provenance[field] = status
    for field, raw_value in (overrides or {}).items():
        value = _number(raw_value)
        if field in FIELD_LABELS and value is not None:
            values[field] = value
            provenance[field] = "manual_verified"
    return values, provenance


def _safe_div(numerator: float, denominator: float) -> float | None:
    if denominator == 0:
        return None
    value = numerator / denominator
    return value if math.isfinite(value) else None


def calculate_indicators(values: Mapping[str, float]) -> dict[str, float | None]:
    return {
        "cash_to_current_liabilities": _safe_div(values["cash"], values["current_liabilities"]) if {"cash", "current_liabilities"} <= values.keys() else None,
        "current_ratio": _safe_div(values["current_assets"], values["current_liabilities"]) if {"current_assets", "current_liabilities"} <= values.keys() else None,
        "cfo_to_current_liabilities": _safe_div(values["cfo"], values["current_liabilities"]) if {"cfo", "current_liabilities"} <= values.keys() else None,
        "fcf": values["cfo"] - abs(values["capex"]) if {"cfo", "capex"} <= values.keys() else None,
        "cfo_to_ebitda": _safe_div(values["cfo"], values["ebitda"]) if {"cfo", "ebitda"} <= values.keys() else None,
        "net_debt_to_ebitda": _safe_div(values["interest_bearing_debt"] - values["cash"], values["ebitda"]) if {"interest_bearing_debt", "cash", "ebitda"} <= values.keys() else None,
        "interest_coverage": _safe_div(values["ebitda"], abs(values["interest_expense"])) if {"ebitda", "interest_expense"} <= values.keys() else None,
        "dso": _safe_div(values["ar"] * 365, values["revenue"]) if {"ar", "revenue"} <= values.keys() else None,
        "payable_days": _safe_div(values["ap"] * 365, values["cogs"]) if {"ap", "cogs"} <= values.keys() else None,
        "our_ar_to_available_cash": _safe_div(values["our_ar"], values["available_cash"]) if {"our_ar", "available_cash"} <= values.keys() else None,
    }

def band_for(key: str, value: float, values: Mapping[str, float], fcf_near_zero_pct: float) -> str:
    if key == "cash_to_current_liabilities":
        return "good" if value > 0.30 else "average" if value >= 0.15 else "risk"
    if key == "current_ratio":
        return "good" if value > 1.50 else "average" if value >= 1.00 else "risk"
    if key == "cfo_to_current_liabilities":
        return "good" if value > 0.30 else "average" if value >= 0.10 else "risk"
    if key == "fcf":
        tolerance = abs(values.get("revenue", 0)) * fcf_near_zero_pct
        return "good" if value > tolerance else "average" if value >= -tolerance else "risk"
    if key == "cfo_to_ebitda":
        return "good" if value > 0.70 else "average" if value >= 0.40 else "risk"
    if key == "net_debt_to_ebitda":
        return "good" if value < 2.00 else "average" if value <= 3.00 else "risk"
    if key == "interest_coverage":
        return "good" if value > 5.00 else "average" if value >= 2.00 else "risk"
    if key == "dso":
        return "good" if value < 60 else "average" if value <= 90 else "risk"
    if key == "payable_days":
        return "good" if value < 90 else "average" if value <= 120 else "risk"
    if key == "our_ar_to_available_cash":
        return "good" if value < 0.20 else "average" if value <= 0.40 else "risk"
    raise KeyError(key)


def grade_for(score: float) -> str:
    if score >= 80:
        return "A"
    if score >= 70:
        return "B"
    if score >= 60:
        return "C"
    return "D"


def downgrade(grade: str) -> str:
    return {"A": "B", "B": "C", "C": "D", "D": "D"}[grade]


def score_payment_capacity(
    metric_rows: list[Mapping[str, Any]],
    overrides: Mapping[str, Any] | None = None,
    red_flags: Mapping[str, Any] | None = None,
    fcf_near_zero_pct: float = 0.01,
) -> dict[str, Any]:
    if not 0 <= fcf_near_zero_pct <= 0.10:
        raise ValueError("fcf_near_zero_pct must be between 0 and 0.10")
    values, provenance = verified_values(metric_rows, overrides)
    calculated = calculate_indicators(values)
    rows: list[dict[str, Any]] = []
    total = 0.0
    available_weight = 0
    band_points = {"good": 100, "average": 60, "risk": 0}
    for definition in METRICS:
        key = definition["key"]
        value = calculated[key]
        missing = [field for field in REQUIRED_FIELDS[key] if field not in values]
        if value is None:
            band = "pending"
            points = None
            contribution = None
        else:
            band = band_for(key, value, values, fcf_near_zero_pct)
            points = band_points[band]
            contribution = definition["weight"] * points / 100
            total += contribution
            available_weight += definition["weight"]
        rows.append({**definition, "value": value, "band": band, "band_points": points, "weighted_points": contribution, "missing_fields": missing})
    complete = available_weight == 100
    base_score = round(total, 2) if complete else None
    base_grade = grade_for(base_score) if base_score is not None else None
    active_flags = [RED_FLAGS[key] for key, enabled in (red_flags or {}).items() if key in RED_FLAGS and bool(enabled)]
    final_grade = downgrade(base_grade) if base_grade and active_flags else base_grade
    return {
        "complete": complete,
        "available_metric_count": sum(1 for row in rows if row["value"] is not None),
        "available_weight_pct": available_weight,
        "base_score": base_score,
        "base_grade": base_grade,
        "final_grade": final_grade,
        "red_flag_downgrade": bool(base_grade and active_flags),
        "active_red_flags": active_flags,
        "fcf_near_zero_pct": fcf_near_zero_pct,
        "values": values,
        "provenance": provenance,
        "metrics": rows,
    }
