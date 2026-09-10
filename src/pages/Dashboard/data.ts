export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'default';

export const cbiRows = [
  { key: 'fx', category: '外汇基准', metric: '官方 USD / IQD', value: '1,310', frequency: '日频', change: '较上周观察不变', relevance: '官方换算基准，不代表可及时获得可汇出美元', status: '稳定', tone: 'success', source: 'https://www.cbi.iq/' },
  { key: 'w524', category: '公开市场', metric: 'W524 期限 / 利率', value: '7 天 · 5.25%', frequency: '周频/事件', change: '9月8日执行', relevance: '短期 IQD 流动性管理证据，不等同美元可得性', status: '观察', tone: 'info', source: 'https://cbi.iq/news/view/3312' },
  { key: 'b359', category: '公开市场', metric: 'B359 期限', value: '14 天', frequency: '事件', change: '9月13日下一执行窗口', relevance: '下一可观察货币市场事件，公告未披露传统票据利率', status: '待结果', tone: 'warning', source: 'https://cbi.iq/news/view/3319' },
  { key: 'liquidity', category: '银行体系', metric: '流动资产 / 短期负债', value: '>60%', frequency: '事件', change: '9月5日披露', relevance: '只说明体系缓冲，不能外推到具体付款行', status: '缓冲', tone: 'success', source: 'https://cbi.iq/news/print_news/3309' },
  { key: 'altaif', category: '银行监管', metric: 'Al-Taif Bank 状态', value: '接管 · 分批提款', frequency: '事件', change: '监管干预升级', relevance: '若付款链路经过该行，将直接增加延迟风险', status: '高风险', tone: 'danger', source: 'https://cbi.iq/news/view/3318' },
  { key: 'licences', category: '外汇通道', metric: '外汇公司牌照撤销', value: '4 家', frequency: '事件', change: '9月6–7日集中撤销', relevance: '非银行外汇渠道连续性走弱、合规门槛趋严', status: '收紧', tone: 'warning', source: 'https://www.cbi.iq/news/section/77' },
  { key: 'balance', category: 'CBI资产负债表', metric: '最新可得月份', value: '2026-06', frequency: '月频', change: '本周无新月表', relevance: '储备和资产负债表继续标记陈旧，不做周度外推', status: '陈旧', tone: 'default', source: 'https://cbi.iq/page/73' },
  { key: 'facebook', category: '官方社媒', metric: 'CBI Facebook 最新公开帖', value: 'Al-Taif 存款声明', frequency: '事件', change: '与官网声明一致', relevance: '只作为快速发现与交叉核验，官网仍是记录源', status: '已核验', tone: 'info', source: 'https://web.facebook.com/cbi.iraq/' },
] as const;

export const capacityRows = [
  { key: 'cash', index: '01', dimension: '现金', metric: 'Cash / Current Liabilities', formula: '现金及现金等价物 ÷ 流动负债', weight: 15, good: '>30%', average: '15–30%', risk: '<15%', asiacell: '48.8%', asiaBand: '好 · 15.0', zain: '14.1%', zainBand: '风险 · 0.0' },
  { key: 'current', index: '02', dimension: '流动性', metric: 'Current Ratio', formula: '流动资产 ÷ 流动负债', weight: 10, good: '>1.5x', average: '1.0–1.5x', risk: '<1.0x', asiacell: '0.92x', asiaBand: '风险 · 0.0', zain: '1.00x', zainBand: '一般 · 6.0' },
  { key: 'cfo-cl', index: '03', dimension: '经营现金流', metric: 'CFO / Current Liabilities', formula: '经营现金流 ÷ 流动负债', weight: 10, good: '>30%', average: '10–30%', risk: '<10%', asiacell: '38.7%', asiaBand: '好 · 10.0', zain: '-18.8%', zainBand: '风险 · 0.0' },
  { key: 'fcf', index: '04', dimension: '自由现金流', metric: 'FCF', formula: 'CFO − Capex', weight: 15, good: '>0', average: '接近0', risk: '<0', asiacell: '163,687', asiaBand: '好 · 15.0', zain: '-410,902', zainBand: '风险 · 0.0' },
  { key: 'cfo-ebitda', index: '05', dimension: '现金转化', metric: 'CFO / EBITDA', formula: '经营现金流 ÷ EBITDA', weight: 10, good: '>70%', average: '40–70%', risk: '<40%', asiacell: '63.3%', asiaBand: '一般 · 6.0', zain: '待补', zainBand: 'EBITDA 待最终确认' },
  { key: 'debt', index: '06', dimension: '杠杆', metric: 'Net Debt / EBITDA', formula: '(有息负债 − 现金) ÷ EBITDA', weight: 10, good: '<2x', average: '2–3x', risk: '>3x', asiacell: '待补', asiaBand: '有息负债分类', zain: '待补', zainBand: '有息负债、EBITDA' },
  { key: 'interest', index: '07', dimension: '偿债', metric: 'Interest Coverage', formula: 'EBITDA ÷ 利息费用', weight: 10, good: '>5x', average: '2–5x', risk: '<2x', asiacell: '待补', asiaBand: '利息费用', zain: '待补', zainBand: 'EBITDA 待最终确认' },
  { key: 'dso', index: '08', dimension: '回款', metric: 'DSO', formula: '应收账款 ÷ Revenue × 365', weight: 5, good: '<60天', average: '60–90天', risk: '>90天', asiacell: '41.2 天', asiaBand: '好 · 5.0', zain: '234.0 天', zainBand: '风险 · 0.0' },
  { key: 'payable', index: '09', dimension: '供应商付款', metric: 'Payable Days', formula: '应付账款 ÷ COGS × 365', weight: 5, good: '<90天', average: '90–120天', risk: '>120天', asiacell: '待补', asiaBand: 'COGS', zain: '1,653.4 天', zainBand: '风险 · 0.0' },
  { key: 'our-ar', index: '10', dimension: '我方风险敞口', metric: 'Our AR / Available Cash', formula: '我方 AR ÷ 可动用现金', weight: 10, good: '<20%', average: '20–40%', risk: '>40%', asiacell: '待补', asiaBand: '我方 AR、可动用现金', zain: '待补', zainBand: '我方 AR、可动用现金' },
];

export const riskRows = [
  { key: 'oil', layer: 'A · 国家资金供给', indicator: '油运与财政现金流', evidence: 'Hormuz 维持 CRITICAL；8月装运较战前基线下降', light: '红', action: '缩短回款复核周期；不使用陈旧出口均值' },
  { key: 'fx', layer: 'A · 国家资金供给', indicator: '官方/平行汇率价差', evidence: '1,310 vs 1,555；平行溢价约 18.7%', light: '红', action: '对美元应收做 IQD 成本敏感性压力测试' },
  { key: 'channel', layer: 'B · 支付通道', indicator: '银行及代理行链路', evidence: '收款行、付款行、代理行名称仍待内部补入', light: '黄', action: '逐项比对 CBI 限制名单和 OFAC 50% 规则' },
  { key: 'customers', layer: 'C · 客户能力', indicator: 'Asiacell / Zain Iraq', evidence: '均仅 6/10 可计算；不得输出正式总分', light: '黄', action: '补齐债务分类、利息、COGS、可动用现金和我方 AR' },
  { key: 'internal', layer: 'D · 我方敞口', indicator: 'AR、账龄、争议与催收', evidence: '内部数据尚未接入', light: '未知', action: '按客户、币种、账龄建立可审计输入表' },
];

export const sourceRows = [
  { key: 'S01', source: 'CBI 财务状况月表', publisher: 'Central Bank of Iraq', asOf: '2026-06', status: '官方·陈旧', url: 'https://www.cbi.iq/page/73' },
  { key: 'S02', source: 'SOMO 月度出口工作簿', publisher: 'SOMO', asOf: '2026-06', status: '官方·陈旧', url: 'https://www.somooil.gov.iq/annual-summary-chart' },
  { key: 'S05', source: 'CBI 美元交易受限名单', publisher: 'Central Bank of Iraq', asOf: '2026-02-22', status: '官方', url: 'https://www.cbi.iq/news/view/3135' },
  { key: 'S09', source: 'OFAC Iraq oil-sector action', publisher: 'U.S. Treasury', asOf: '2026-05-07', status: '监管', url: 'https://home.treasury.gov/news/press-releases/sb0492' },
  { key: 'S11', source: 'Zain Group Q2 / H1 results', publisher: 'Zain Group', asOf: '2026-08-10', status: '官方', url: 'https://www.zain.com/en/press-release/zaingroup2026-q2' },
  { key: 'S13', source: 'Ooredoo Q2 supplementary schedule', publisher: 'Ooredoo Group', asOf: '2026-06-30', status: '官方', url: 'https://www.ooredoo.com/wp-content/uploads/2026/07/Supplementary-Schedules-Q2-2026.pdf' },
  { key: 'S24', source: 'Asiacell H1 扫描财报', publisher: 'Iraq Securities Commission', asOf: '2026-06-30', status: 'OCR 已核验', url: 'https://uploads.isc.gov.iq/upload/2026/08/11/6a7af9bc8d298.pdf' },
  { key: 'S25', source: 'Zain Iraq H1 扫描财报', publisher: 'Iraq Securities Commission', asOf: '2026-06-30', status: 'OCR 已核验', url: 'https://uploads.isc.gov.iq/upload/2026/08/31/6a9554bede623.pdf' },
  { key: 'S26', source: 'CBI W524 / ICD832', publisher: 'Central Bank of Iraq', asOf: '2026-09-06', status: '官方周频', url: 'https://cbi.iq/news/view/3312' },
  { key: 'S29', source: 'Al-Taif Bank deposits statement', publisher: 'Central Bank of Iraq', asOf: '2026-09-08', status: '官方', url: 'https://cbi.iq/news/view/3318' },
  { key: 'S32', source: 'CBI Facebook', publisher: 'Central Bank of Iraq', asOf: '2026-09-08', status: '官方社媒', url: 'https://web.facebook.com/cbi.iraq/' },
];
