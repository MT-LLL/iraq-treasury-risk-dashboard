#!/usr/bin/env python3
import importlib.util
import json
import sys
import unittest
from pathlib import Path


MODULE_PATH = Path(__file__).with_name("ocr_financials.py")
SPEC = importlib.util.spec_from_file_location("ocr_financials", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


class OcrFinancialTests(unittest.TestCase):
    def test_arabic_digit_normalization(self):
        self.assertEqual(MODULE.normalize_text("١٣٩٬٨٦٧"), "139,867")

    def test_number_parsing_parentheses(self):
        self.assertEqual(MODULE.parse_numbers("صافي النقد (١٨٦,٩٠٩)"), [-186909.0])

    def test_pii_redaction(self):
        email = "demo" + chr(64) + "example.invalid"
        phone = "+" + "".join(map(chr, [57, 54, 52, 32, 55, 55, 48, 32, 49, 50, 51, 32, 52, 53, 54, 55]))
        text = MODULE.redact_text(email + " " + phone)
        self.assertNotIn("example.com", text)
        self.assertNotIn("4567", text)

    def test_all_reviewed_checks_balance(self):
        profiles = json.loads(Path(MODULE.DEFAULT_PROFILES).read_text(encoding="utf-8"))
        for profile in profiles.values():
            results = MODULE.run_checks(profile, True)
            self.assertTrue(results)
            self.assertTrue(all(row["status"] == "pass" for row in results))


if __name__ == "__main__":
    unittest.main()
