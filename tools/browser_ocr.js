(function () {
  'use strict';

  const FIELD_LABELS = {
    cash: '现金及现金等价物', current_liabilities: '流动负债', current_assets: '流动资产',
    cfo: '经营现金流 CFO', capex: '资本开支 Capex', ebitda: 'EBITDA',
    interest_bearing_debt: '有息负债', interest_expense: '利息费用', ar: '应收账款 AR',
    revenue: 'Revenue', ap: '应付账款 AP', cogs: 'COGS', our_ar: '我方 AR', available_cash: '可动用现金'
  };
  const RED_FLAGS = {
    cfo_negative_consecutive: 'CFO 连续为负', fcf_negative_consecutive: 'FCF 连续为负',
    dso_rising: 'DSO 持续上升', large_debt_due: '大额债务近期到期', going_concern: '持续经营风险'
  };
  const ALIASES = {
    cash: ['النقد', 'صافي النقود', 'النقد ومعادلاته', 'cash and cash equivalents'],
    current_liabilities: ['مجموع الالتزامات المتداولة', 'current liabilities'],
    current_assets: ['مجموع الأصول المتداولة', 'current assets'],
    cfo: ['صافي النقد الناتج من الانشطة التشغيلية', 'صافي التدفقات النقدية من الأنشطة التشغيلية', 'net cash from operating activities'],
    capex: ['زيادة في الموجودات الثابتة', 'شراء الموجودات الثابتة', 'capital expenditure', 'capex'],
    ebitda: ['ebitda'], interest_bearing_debt: ['القروض طويلة الاجل', 'القروض قصيرة الاجل', 'التزامات تمويل عقود الايجار', 'interest bearing debt'],
    interest_expense: ['فوائد مدينة', 'interest expense', 'finance costs'],
    ar: ['صافي الذمم المدينة', 'الذمم المدينة', 'trade receivables'], revenue: ['إيراد النشاط الجاري', 'ايراد النشاط الجاري', 'revenue'],
    ap: ['الذمم الدائنة', 'trade payables'], cogs: ['كلفة النشاط التجاري', 'cost of goods sold', 'cogs'],
    our_ar: ['our ar', 'أرصدة شركتنا'], available_cash: ['available cash', 'النقد المتاح', 'النقد غير المقيد']
  };
  const METRICS = [
    ['cash_to_current_liabilities', '现金', 'Cash / Current Liabilities', '现金及现金等价物 ÷ 流动负债', 15, 'percent', ['cash', 'current_liabilities']],
    ['current_ratio', '流动性', 'Current Ratio', '流动资产 ÷ 流动负债', 10, 'multiple', ['current_assets', 'current_liabilities']],
    ['cfo_to_current_liabilities', '经营现金流', 'CFO / Current Liabilities', '经营现金流 ÷ 流动负债', 10, 'percent', ['cfo', 'current_liabilities']],
    ['fcf', '自由现金流', 'FCF', 'CFO − Capex', 15, 'amount', ['cfo', 'capex', 'revenue']],
    ['cfo_to_ebitda', '现金转化', 'CFO / EBITDA', '经营现金流 ÷ EBITDA', 10, 'percent', ['cfo', 'ebitda']],
    ['net_debt_to_ebitda', '杠杆', 'Net Debt / EBITDA', '（有息负债 − 现金）÷ EBITDA', 10, 'multiple', ['interest_bearing_debt', 'cash', 'ebitda']],
    ['interest_coverage', '偿债', 'Interest Coverage', 'EBITDA ÷ 利息费用', 10, 'multiple', ['ebitda', 'interest_expense']],
    ['dso', '回款', 'DSO', '应收账款 ÷ Revenue × 365', 5, 'days', ['ar', 'revenue']],
    ['payable_days', '供应商付款', 'Payable Days', '应付账款 ÷ COGS × 365', 5, 'days', ['ap', 'cogs']],
    ['our_ar_to_available_cash', '我方风险敞口', 'Our AR / Available Cash', '我方 AR ÷ 可动用现金', 10, 'percent', ['our_ar', 'available_cash']]
  ];
  const CDN = {
    pdf: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/build/pdf.min.mjs',
    pdfWorker: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/build/pdf.worker.min.mjs',
    tesseract: 'https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/tesseract.esm.min.js',
    tesseractWorker: 'https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/worker.min.js',
    tesseractCore: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@7.0.0',
    languages: 'https://tessdata.projectnaptha.com/4.0.0'
  };

  const finiteNumber = value => {
    if (value === '' || value === null || value === undefined) return null;
    const parsed = Number(String(value).replaceAll(',', '').trim());
    return Number.isFinite(parsed) ? parsed : null;
  };
  const describeError = error => {
    if (!error) return '未知错误';
    const message = String(error.message || error.reason || '').trim();
    return message || String(error.name || error) || '未知错误';
  };
  const normalize = value => String(value || '').normalize('NFKC')
    .replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replaceAll('ـ', '').replaceAll('،', ',').replaceAll('٬', ',').replaceAll('٫', '.')
    .replace(/\s+/g, ' ').trim().toLowerCase();
  const redact = value => String(value || '')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[REDACTED]')
    .replace(/\+\d[\d\s().-]{7,}\d/g, '[REDACTED]');
  const parseNumbers = value => {
    const matches = normalize(value).match(/\(?[-+]?\d[\d,.]*\d\)?|\b\d\b/g) || [];
    return matches.map(token => {
      const negative = token.startsWith('(') || token.startsWith('-');
      const cleaned = token.replaceAll(',', '').replace(/[^0-9.]/g, '');
      const number = Number(cleaned);
      return Number.isFinite(number) ? (negative ? -number : number) : null;
    }).filter(value => value !== null);
  };
  const aliasScore = (line, alias) => {
    const lineText = normalize(line), aliasText = normalize(alias);
    if (lineText.includes(aliasText)) return 1;
    const lineTokens = new Set(lineText.split(' ')), aliasTokens = aliasText.split(' ');
    return aliasTokens.filter(token => lineTokens.has(token)).length / Math.max(1, aliasTokens.length);
  };
  const sha256 = async buffer => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', buffer))).map(byte => byte.toString(16).padStart(2, '0')).join('');
  const safeDivide = (a, b) => b === 0 ? null : a / b;

  async function loadProfiles() {
    const response = await fetch('tools/ocr_profiles.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('无法加载本地 OCR 复核档案');
    return response.json();
  }

  function candidatesFromText(text, page) {
    const lines = String(text || '').split(/\r?\n/).map(redact).filter(Boolean), candidates = [];
    lines.forEach((line, index) => {
      let best = { field: '', alias: '', score: 0 };
      Object.entries(ALIASES).forEach(([field, aliases]) => aliases.forEach(alias => {
        const score = aliasScore(line, alias);
        if (score > best.score) best = { field, alias, score };
      }));
      if (best.score < 0.60) return;
      let evidence = line, numbers = parseNumbers(line);
      if (!numbers.length) {
        const nearby = lines.slice(index + 1, index + 3).filter(item => parseNumbers(item).length);
        if (nearby.length) { evidence = [line, ...nearby].join(' | '); numbers = nearby.flatMap(parseNumbers); }
      }
      if (numbers.length) candidates.push({ source: 'browser_ocr', field: best.field, page, ocr_confidence: '', alias_score: best.score, matched_alias: best.alias, numbers: numbers.join(' | '), evidence_text: evidence, bbox: '' });
    });
    return candidates;
  }

  function metricRows(profile, candidates, hashMatch) {
    const byField = {};
    candidates.forEach(row => { (byField[row.field] ||= []).push(row); });
    return Object.keys(FIELD_LABELS).map(field => {
      const reviewed = profile?.metrics?.[field] || {}, auto = (byField[field] || []).sort((a, b) => b.alias_score - a.alias_score)[0];
      if (Object.keys(reviewed).length) return {
        field, label_zh: reviewed.label_zh || FIELD_LABELS[field], value: reviewed.value ?? '', unit: reviewed.unit || profile.unit || '',
        period: reviewed.period || profile.period || '', status: hashMatch ? (reviewed.status || 'review') : 'review_hash_mismatch',
        page: reviewed.page || auto?.page || '', verification_method: reviewed.verification_method || '浏览器 OCR 待人工复核',
        evidence_text: redact(reviewed.evidence_text || auto?.evidence_text || ''), ocr_confidence: auto?.ocr_confidence || '', note: reviewed.note || ''
      };
      const number = auto ? parseNumbers(auto.numbers)[0] : null;
      return { field, label_zh: FIELD_LABELS[field], value: number ?? '', unit: '', period: '', status: auto ? 'review_browser_ocr' : 'missing', page: auto?.page || '', verification_method: auto ? '浏览器 OCR 待人工复核' : '未检出', evidence_text: auto?.evidence_text || '', ocr_confidence: '', note: '' };
    });
  }

  function runChecks(profile, hashMatch) {
    return (profile?.checks || []).map(check => {
      const lhs = (check.lhs || []).reduce((sum, value) => sum + Number(value), 0), rhs = (check.rhs || []).reduce((sum, value) => sum + Number(value), 0), tolerance = Number(check.tolerance ?? 0.5);
      return { check: check.name, lhs, rhs, difference: lhs - rhs, tolerance, status: hashMatch && Math.abs(lhs - rhs) <= tolerance ? 'pass' : 'fail', note: check.note || '' };
    });
  }

  function verifiedValues(rows, overrides = {}) {
    const values = {}, provenance = {};
    (rows || []).forEach(row => { const value = finiteNumber(row.value); if (String(row.status || '').startsWith('verified') && value !== null) { values[row.field] = value; provenance[row.field] = row.status; } });
    Object.entries(overrides || {}).forEach(([field, raw]) => { const value = finiteNumber(raw); if (field in FIELD_LABELS && value !== null) { values[field] = value; provenance[field] = 'manual_verified'; } });
    return { values, provenance };
  }

  function calculate(values) {
    const has = (...fields) => fields.every(field => field in values);
    return {
      cash_to_current_liabilities: has('cash', 'current_liabilities') ? safeDivide(values.cash, values.current_liabilities) : null,
      current_ratio: has('current_assets', 'current_liabilities') ? safeDivide(values.current_assets, values.current_liabilities) : null,
      cfo_to_current_liabilities: has('cfo', 'current_liabilities') ? safeDivide(values.cfo, values.current_liabilities) : null,
      fcf: has('cfo', 'capex') ? values.cfo - Math.abs(values.capex) : null,
      cfo_to_ebitda: has('cfo', 'ebitda') ? safeDivide(values.cfo, values.ebitda) : null,
      net_debt_to_ebitda: has('interest_bearing_debt', 'cash', 'ebitda') ? safeDivide(values.interest_bearing_debt - values.cash, values.ebitda) : null,
      interest_coverage: has('ebitda', 'interest_expense') ? safeDivide(values.ebitda, Math.abs(values.interest_expense)) : null,
      dso: has('ar', 'revenue') ? safeDivide(values.ar * 365, values.revenue) : null,
      payable_days: has('ap', 'cogs') ? safeDivide(values.ap * 365, values.cogs) : null,
      our_ar_to_available_cash: has('our_ar', 'available_cash') ? safeDivide(values.our_ar, values.available_cash) : null
    };
  }

  function band(key, value, values, tolerance) {
    if (key === 'cash_to_current_liabilities') return value > .30 ? 'good' : value >= .15 ? 'average' : 'risk';
    if (key === 'current_ratio') return value > 1.5 ? 'good' : value >= 1 ? 'average' : 'risk';
    if (key === 'cfo_to_current_liabilities') return value > .30 ? 'good' : value >= .10 ? 'average' : 'risk';
    if (key === 'fcf') { const limit = Math.abs(values.revenue || 0) * tolerance; return value > limit ? 'good' : value >= -limit ? 'average' : 'risk'; }
    if (key === 'cfo_to_ebitda') return value > .70 ? 'good' : value >= .40 ? 'average' : 'risk';
    if (key === 'net_debt_to_ebitda') return value < 2 ? 'good' : value <= 3 ? 'average' : 'risk';
    if (key === 'interest_coverage') return value > 5 ? 'good' : value >= 2 ? 'average' : 'risk';
    if (key === 'dso') return value < 60 ? 'good' : value <= 90 ? 'average' : 'risk';
    if (key === 'payable_days') return value < 90 ? 'good' : value <= 120 ? 'average' : 'risk';
    return value < .20 ? 'good' : value <= .40 ? 'average' : 'risk';
  }
  const grade = score => score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';
  const downgrade = value => ({ A: 'B', B: 'C', C: 'D', D: 'D' })[value];

  function scorePaymentCapacity(request) {
    const tolerance = Number(request.fcf_near_zero_pct ?? .01);
    if (!(tolerance >= 0 && tolerance <= .10)) throw new Error('FCF 阈值必须在 0%–10% 之间');
    const { values, provenance } = verifiedValues(request.metrics || [], request.overrides || {}), calculated = calculate(values);
    let total = 0, availableWeight = 0;
    const rows = METRICS.map(([key, dimension, label, formula, weight, format, required]) => {
      const value = calculated[key], missing = required.filter(field => !(field in values));
      if (value === null || !Number.isFinite(value)) return { key, dimension, label, formula, weight, format, value: null, band: 'pending', band_points: null, weighted_points: null, missing_fields: missing };
      const bucket = band(key, value, values, tolerance), points = { good: 100, average: 60, risk: 0 }[bucket], weighted = weight * points / 100;
      total += weighted; availableWeight += weight;
      return { key, dimension, label, formula, weight, format, value, band: bucket, band_points: points, weighted_points: weighted, missing_fields: [] };
    });
    const complete = availableWeight === 100, baseScore = complete ? Math.round(total * 100) / 100 : null, baseGrade = complete ? grade(baseScore) : null;
    const active = Object.entries(request.red_flags || {}).filter(([key, enabled]) => RED_FLAGS[key] && Boolean(enabled)).map(([key]) => RED_FLAGS[key]);
    return { complete, available_metric_count: rows.filter(row => row.value !== null).length, available_weight_pct: availableWeight, base_score: baseScore, base_grade: baseGrade, final_grade: baseGrade && active.length ? downgrade(baseGrade) : baseGrade, red_flag_downgrade: Boolean(baseGrade && active.length), active_red_flags: active, fcf_near_zero_pct: tolerance, values, provenance, metrics: rows };
  }

  function buildReviewedProfile(profileKey, profiles) {
    const profile = profiles?.[profileKey];
    if (!profile) throw new Error('未找到该运营商的复核档案');
    const metrics = metricRows(profile, [], true), checks = runChecks(profile, true);
    const report = {
      schema_version: 2, source_filename: '未打包（复核快照）', source_sha256: profile.sha256, source_pdf_bundled: false,
      profile: profileKey, profile_hash_match: true, report_entity: profile.entity || '', report_period: profile.period || '', unit: profile.unit || '',
      page_count: null, text_layer_detected: false, ocr_engine: '已复核 OCR 档案预载', privacy_mode: 'reviewed_financial_rows_only',
      verified_metric_count: metrics.filter(row => String(row.status).startsWith('verified')).length,
      review_metric_count: metrics.filter(row => String(row.status).startsWith('review')).length,
      missing_metric_count: metrics.filter(row => row.status === 'missing').length,
      verification_checks_passed: checks.filter(row => row.status === 'pass').length, verification_checks_total: checks.length, metrics, checks
    };
    return {
      ok: true, execution_mode: 'reviewed_profile', run_id: `${profileKey}-reviewed`, report, candidates: [], checks,
      score: scorePaymentCapacity({ metrics }),
      privacy: { source_pdf_transmitted: false, raw_page_text_retained: false, persisted_directory: '预置复核档案（只读）' }
    };
  }

  async function loadReviewedProfile(profileKey) {
    return buildReviewedProfile(profileKey, await loadProfiles());
  }

  async function run(file, requestedProfile, onProgress = () => {}) {
    if (!file || file.size > 30 * 1024 * 1024) throw new Error('请选择不超过 30 MB 的 PDF');
    const buffer = await file.arrayBuffer();
    if (new TextDecoder('ascii').decode(buffer.slice(0, 5)) !== '%PDF-') throw new Error('文件不是有效 PDF');
    const digest = await sha256(buffer), profiles = await loadProfiles();
    let profileKey = requestedProfile || Object.keys(profiles).find(key => profiles[key].sha256 === digest) || null;
    const profile = profileKey ? profiles[profileKey] : null, hashMatch = Boolean(profile && profile.sha256 === digest);
    onProgress({ stage: 'loading', message: '正在加载浏览器 OCR 引擎…' });
    const [pdfjsLib, tesseractModule] = await Promise.all([import(CDN.pdf), import(CDN.tesseract)]);
    const tesseract = tesseractModule.default || tesseractModule;
    pdfjsLib.GlobalWorkerOptions.workerSrc = CDN.pdfWorker;
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
    if (pdf.numPages > 80) throw new Error(`PDF 共 ${pdf.numPages} 页，超过 80 页限制`);
    const pages = hashMatch && profile.financial_pages?.length ? profile.financial_pages : Array.from({ length: pdf.numPages }, (_, index) => index + 1);
    let currentPage = 0;
    let worker;
    try {
      worker = await tesseract.createWorker(['ara', 'eng'], tesseract.OEM.LSTM_ONLY, {
        workerPath: CDN.tesseractWorker, corePath: CDN.tesseractCore, langPath: CDN.languages,
        logger: message => onProgress({ stage: message.status, progress: message.progress || 0, page: currentPage, total: pages.length, message: `第 ${currentPage || 1}/${pages.length} 页 · ${message.status} ${Math.round((message.progress || 0) * 100)}%` })
      });
    } catch (error) {
      throw new Error(`OCR 引擎初始化失败：${describeError(error)}`);
    }
    const candidates = [];
    try {
      await worker.setParameters({ tessedit_pageseg_mode: tesseract.PSM.SINGLE_BLOCK, preserve_interword_spaces: '1' });
      for (let index = 0; index < pages.length; index += 1) {
        currentPage = index + 1;
        const pageNumber = pages[index], page = await pdf.getPage(pageNumber), viewport = page.getViewport({ scale: 2.5 }), canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
        await page.render({ canvasContext: canvas.getContext('2d', { alpha: false }), viewport }).promise;
        onProgress({ stage: 'recognizing', page: currentPage, total: pages.length, message: `正在识别第 ${currentPage}/${pages.length} 个财务页…` });
        let result;
        try { result = await worker.recognize(canvas); }
        catch (error) { throw new Error(`第 ${pageNumber} 页 OCR 失败：${describeError(error)}`); }
        candidates.push(...candidatesFromText(result.data.text, pageNumber));
        canvas.width = canvas.height = 1;
      }
    } finally { await worker.terminate(); }
    const metrics = metricRows(profile, candidates, hashMatch), checks = runChecks(profile, hashMatch);
    const report = {
      schema_version: 2, source_filename: 'browser-upload.pdf', source_sha256: digest, source_pdf_bundled: false,
      profile: profileKey, profile_hash_match: hashMatch, report_entity: profile?.entity || '', report_period: profile?.period || '', unit: profile?.unit || '',
      page_count: pdf.numPages, text_layer_detected: false, ocr_engine: 'Tesseract.js 7.0.0 ara+eng', privacy_mode: 'browser_memory_financial_rows_only',
      verified_metric_count: metrics.filter(row => String(row.status).startsWith('verified')).length,
      review_metric_count: metrics.filter(row => String(row.status).startsWith('review')).length,
      missing_metric_count: metrics.filter(row => row.status === 'missing').length,
      verification_checks_passed: checks.filter(row => row.status === 'pass').length, verification_checks_total: checks.length, metrics, checks
    };
    const score = scorePaymentCapacity({ metrics });
    return { ok: true, execution_mode: 'browser', run_id: new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14) + '-browser', report, candidates: candidates.slice(0, 250), checks, score, privacy: { source_pdf_transmitted: false, raw_page_text_retained: false, persisted_directory: '未持久化（浏览器内存）' } };
  }

  window.BrowserOCR = { run, scorePaymentCapacity, loadProfiles, loadReviewedProfile, buildReviewedProfile, defaults: { fieldLabels: FIELD_LABELS, redFlags: RED_FLAGS }, versions: { tesseract: '7.0.0', pdfjs: '6.3.289' } };
})();
