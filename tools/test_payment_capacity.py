#!/usr/bin/env python3
import unittest

from payment_capacity import score_payment_capacity


def verified_rows(values):
    return [{"field": field, "value": value, "status": "verified"} for field, value in values.items()]


GOOD_VALUES = {
    "cash": 40,
    "current_liabilities": 100,
    "current_assets": 200,
    "cfo": 40,
    "capex": 10,
    "ebitda": 50,
    "interest_bearing_debt": 100,
    "interest_expense": 5,
    "ar": 100,
    "revenue": 1000,
    "ap": 100,
    "cogs": 500,
    "our_ar": 5,
    "available_cash": 40,
}


class PaymentCapacityTests(unittest.TestCase):
    def test_all_good_scores_100(self):
        result = score_payment_capacity(verified_rows(GOOD_VALUES))
        self.assertTrue(result["complete"])
        self.assertEqual(result["base_score"], 100)
        self.assertEqual(result["final_grade"], "A")

    def test_red_flag_downgrades_one_grade(self):
        result = score_payment_capacity(
            verified_rows(GOOD_VALUES),
            red_flags={"large_debt_due": True, "going_concern": True},
        )
        self.assertEqual(result["base_grade"], "A")
        self.assertEqual(result["final_grade"], "B")
        self.assertTrue(result["red_flag_downgrade"])

    def test_missing_field_suppresses_total(self):
        values = dict(GOOD_VALUES)
        del values["our_ar"]
        result = score_payment_capacity(verified_rows(values))
        self.assertFalse(result["complete"])
        self.assertIsNone(result["base_score"])
        self.assertEqual(result["available_metric_count"], 9)
        self.assertEqual(result["available_weight_pct"], 90)

    def test_review_value_is_blocked_until_override(self):
        rows = verified_rows(GOOD_VALUES)
        for row in rows:
            if row["field"] == "interest_bearing_debt":
                row["status"] = "review_classification"
        blocked = score_payment_capacity(rows)
        accepted = score_payment_capacity(rows, overrides={"interest_bearing_debt": 100})
        self.assertFalse(blocked["complete"])
        self.assertTrue(accepted["complete"])
        self.assertEqual(accepted["provenance"]["interest_bearing_debt"], "manual_verified")

    def test_fcf_near_zero_band_uses_configured_revenue_tolerance(self):
        values = dict(GOOD_VALUES, cfo=10, capex=5, revenue=1000)
        result = score_payment_capacity(verified_rows(values), fcf_near_zero_pct=0.01)
        fcf = next(row for row in result["metrics"] if row["key"] == "fcf")
        self.assertEqual(fcf["band"], "average")


if __name__ == "__main__":
    unittest.main()
