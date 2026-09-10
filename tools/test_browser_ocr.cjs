#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

global.window = globalThis;
vm.runInThisContext(fs.readFileSync(require.resolve('./browser_ocr.js'), 'utf8'), { filename: 'browser_ocr.js' });

const values = {
  cash: 100, current_liabilities: 200, current_assets: 400, cfo: 100, capex: 10,
  ebitda: 100, interest_bearing_debt: 200, interest_expense: 10, ar: 100,
  revenue: 1000, ap: 100, cogs: 1000, our_ar: 10, available_cash: 100
};
const metrics = Object.entries(values).map(([field, value]) => ({ field, value, status: 'verified' }));

const complete = BrowserOCR.scorePaymentCapacity({ metrics });
assert.equal(complete.complete, true);
assert.equal(complete.base_score, 100);
assert.equal(complete.base_grade, 'A');
assert.equal(complete.final_grade, 'A');
assert.equal(complete.available_metric_count, 10);

const redFlagged = BrowserOCR.scorePaymentCapacity({ metrics, red_flags: { dso_rising: true } });
assert.equal(redFlagged.base_grade, 'A');
assert.equal(redFlagged.final_grade, 'B');
assert.equal(redFlagged.red_flag_downgrade, true);

const incomplete = BrowserOCR.scorePaymentCapacity({ metrics: metrics.filter(row => row.field !== 'our_ar') });
assert.equal(incomplete.complete, false);
assert.equal(incomplete.base_score, null);
assert.equal(incomplete.available_weight_pct, 90);

const profiles = JSON.parse(fs.readFileSync(require.resolve('./ocr_profiles.json'), 'utf8'));
const asiacell = BrowserOCR.buildReviewedProfile('tasc_q2_2026', profiles);
assert.equal(asiacell.report.report_entity, 'Asiacell Communications PJSC');
assert.equal(asiacell.report.verified_metric_count, 9);
assert.equal(asiacell.score.available_metric_count, 6);
assert.equal(asiacell.score.available_weight_pct, 65);
assert.equal(asiacell.score.complete, false);

const zain = BrowserOCR.buildReviewedProfile('tzni_q2_2026', profiles);
assert.equal(zain.report.report_entity, 'Al-Khatem Telecommunications / Zain Iraq');
assert.equal(zain.report.verified_metric_count, 10);
assert.equal(zain.score.available_metric_count, 6);
assert.equal(zain.score.available_weight_pct, 60);
assert.equal(zain.score.complete, false);

console.log('Browser OCR scoring tests: 5/5 passed');
