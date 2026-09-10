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

console.log('Browser OCR scoring tests: 3/3 passed');
