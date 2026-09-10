import {
  AlertOutlined,
  ApartmentOutlined,
  BankOutlined,
  BellOutlined,
  BookOutlined,
  CloudDownloadOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  FileSearchOutlined,
  FundOutlined,
  GlobalOutlined,
  LinkOutlined,
  RadarChartOutlined,
  SafetyCertificateOutlined,
  SwapOutlined,
  SyncOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Column, Line } from '@ant-design/plots';
import { PageContainer, ProCard, ProLayout, StatisticCard } from '@ant-design/pro-components';
import {
  Alert,
  App as AntApp,
  Badge,
  Button,
  Card,
  Col,
  ConfigProvider,
  Descriptions,
  Divider,
  Drawer,
  Flex,
  Grid,
  List,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  Timeline,
  Typography,
  theme,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import OcrWorkbench from './OcrWorkbench';
import { capacityRows, cbiRows, riskRows, sourceRows, type Tone } from './data';
import './style.less';

const { Title, Text, Paragraph } = Typography;

const menuItems = [
  { path: 'overview', name: '总览驾驶舱', icon: <DashboardOutlined /> },
  { path: 'cbi', name: 'CBI 每周分析', icon: <BankOutlined /> },
  { path: 'capacity', name: '运营商 10 项评分', icon: <TeamOutlined /> },
  { path: 'ocr', name: '财报 OCR 工作台', icon: <FileSearchOutlined /> },
  { path: 'risk', name: '风险矩阵与行动', icon: <RadarChartOutlined /> },
  { path: 'sources', name: '来源与证据链', icon: <DatabaseOutlined /> },
];

const toneColors: Record<Tone, string> = {
  success: 'success', warning: 'warning', danger: 'error', info: 'processing', default: 'default',
};

const scoreTrend = [
  { week: 'W36 初始', value: 44, type: '综合风险指数' },
  { week: 'W36 刷新', value: 44, type: '综合风险指数' },
  { week: 'W36 周更', value: 40, type: '综合风险指数' },
  { week: 'W37 当前', value: 30, type: '综合风险指数' },
];

const layerScores = [
  { layer: 'A 国家供给', value: 34 },
  { layer: 'B 支付通道', value: 25 },
  { layer: 'C 客户能力', value: 0 },
  { layer: 'D 我方敞口', value: 0 },
];

const priorityItems = [
  { index: '01', title: '工资与养老金', note: '7月多个部委欠薪；强滞后确认信号', tone: 'red' },
  { index: '02', title: '能源与粮食', note: '民生优先，付款顺位不让渡', tone: 'amber' },
  { index: '03', title: '地缘付款', note: '邻国电力、天然气等刚性支出', tone: 'amber' },
  { index: '04', title: '债务与举债', note: '财政缺口挤压后续顺位', tone: 'blue' },
  { index: '05', title: '国企与承包商', note: '本地运营付款优先于外国供应商', tone: 'blue' },
  { index: '06', title: '外国 ICT 供应商', note: '队尾；工资延迟意味着我方早已承压', tone: 'gold' },
];

const actions = [
  { title: '本周必做', color: '#ff6b7a', items: [
    ['完成三类银行名单比对', '收款行 / 客户付款行 / 代理行逐项对 CBI 28+4', 'Treasury · 2个工作日'],
    ['推动集团或境外付款', 'Zain Group、Ooredoo Group 确认 USD 付款路径', '客户经理 + CFO · 5日'],
    ['复核 OCR 被拦截字段', '确认债务计息范围、受限现金、利息/COGS，并补入我方 AR', 'AR Owner + Finance · 周五前'],
  ]},
  { title: '30 天内', color: '#ffbd59', items: [
    ['建立两条备用汇路', '约旦 / 阿联酋优先；土耳其路径完成 OFAC 重筛', 'Treasury · 30日'],
    ['标准化合规包', '合同、发票、报关/验收、受益人 KYC 一次齐套', 'Finance Ops · 14日'],
    ['按客户设 AR 上限', '单一客户超过 50% 时，新单升级地区部审批', 'CFO · 月内'],
  ]},
  { title: '结构性保护', color: '#37c2ff', items: [
    ['新大单改为担保结算', 'confirmed L/C、SBLC、预付或母公司担保', 'Commercial + Legal'],
    ['补充不可兑换条款', 'currency inconvertibility / transfer restriction', 'Legal · 新合同起'],
    ['复核 Sinosure 限额', '核对国别、买方和政治风险承保可用性', 'Risk · 季度'],
  ]},
];

function SectionTitle({ title, subtitle, extra }: { title: string; subtitle: string; extra?: React.ReactNode }) {
  return <Flex justify="space-between" align="flex-end" gap={16} wrap className="section-title">
    <div><Title level={3}>{title}</Title><Text type="secondary">{subtitle}</Text></div>{extra}
  </Flex>;
}

function Overview({ navigate }: { navigate: (key: string) => void }) {
  return <>
    <section className="hero-card">
      <div className="hero-copy">
        <Space size={[8, 8]} wrap>
          <Tag color="error">高风险</Tag><Tag color="processing">模型 v13</Tag><Tag>数据截止 2026-09-10</Tag>
        </Space>
        <Title>伊拉克回款风险<br /><span>决策驾驶舱</span></Title>
        <Paragraph>把国家资金供给、跨境支付通道、客户付款能力与我方风险敞口放在同一条证据链上。当前主因仍是“钱出不去”，其次是付款优先级靠后；客户“没钱”尚不能下结论。</Paragraph>
        <Flex gap={10} wrap>
          <Button type="primary" size="large" onClick={() => navigate('capacity')}>查看运营商评分</Button>
          <Button size="large" onClick={() => navigate('cbi')}>查看 CBI 周报</Button>
        </Flex>
      </div>
      <div className="risk-dial">
        <div className="risk-gauge">
          <Progress type="dashboard" percent={30} size={190} strokeWidth={8} status="exception" showInfo={false} />
          <div className="risk-gauge-copy"><b>30</b><span>高风险</span><small>风险指数 / 100</small></div>
        </div>
        <Text type="secondary">较 W36 下降 10 分 · 口径已升级</Text>
      </div>
    </section>

    <Row gutter={[14, 14]} className="stat-row">
      <Col xs={24} sm={12} xl={6}><StatisticCard statistic={{ title: '官方 USD / IQD', value: 1310, suffix: 'IQD', description: <Tag color="success">本周稳定</Tag> }} chart={<div className="stat-accent blue" />} /></Col>
      <Col xs={24} sm={12} xl={6}><StatisticCard statistic={{ title: '平行市场溢价', value: 18.7, precision: 1, suffix: '%', description: <Text type="danger">红档 · 钱出去更贵</Text> }} chart={<div className="stat-accent red" />} /></Col>
      <Col xs={24} sm={12} xl={6}><StatisticCard statistic={{ title: 'CBI 体系流动性缓冲', value: 60, prefix: '>', suffix: '%', description: <Text type="secondary">不可外推到单一银行</Text> }} chart={<div className="stat-accent green" />} /></Col>
      <Col xs={24} sm={12} xl={6}><StatisticCard statistic={{ title: '运营商评分覆盖', value: 6, suffix: '/ 10', description: <Text type="warning">两家均缺 4 项</Text> }} chart={<div className="stat-accent amber" />} /></Col>
    </Row>

    <SectionTitle title="决策信号" subtitle="从数据事实直接映射到本周管理动作" />
    <Row gutter={[14, 14]}>
      <Col xs={24} xl={14}>
        <Card bordered={false} className="surface-card" title="关键变化">
          <List dataSource={[
            { icon: <GlobalOutlined />, title: '国家资金供给仍承压', text: 'Hormuz 维持 CRITICAL；工资延迟是更强的财政现金流滞后信号。', tag: '红' },
            { icon: <SwapOutlined />, title: '支付通道合规门槛上升', text: '外汇公司牌照撤销、Al-Taif 接管和土耳其代理路径制裁需要逐链路重筛。', tag: '红' },
            { icon: <TeamOutlined />, title: '客户能力只能给部分画像', text: '两家运营商各 6/10 可计算；缺失数据不按 0 分，也不输出正式评级。', tag: '黄' },
          ]} renderItem={(item) => <List.Item extra={<Tag color={item.tag === '红' ? 'error' : 'warning'}>{item.tag}灯</Tag>}><List.Item.Meta avatar={<div className="signal-icon">{item.icon}</div>} title={item.title} description={item.text} /></List.Item>} />
        </Card>
      </Col>
      <Col xs={24} xl={10}>
        <Card bordered={false} className="surface-card" title="本周管理判断">
          <Timeline items={[
            { color: 'red', children: <><b>先查付款路径</b><br /><Text type="secondary">确认三类银行名称及对应行关系，不能把“未比对”当作“未命中”。</Text></> },
            { color: 'orange', children: <><b>再补客户能力数据</b><br /><Text type="secondary">债务、利息、COGS、可动用现金、我方 AR 需同口径核验。</Text></> },
            { color: 'blue', children: <><b>付款结构前置保护</b><br /><Text type="secondary">推动母公司付款、保兑 L/C、SBLC 或预付。</Text></> },
          ]} />
        </Card>
      </Col>
    </Row>

    <SectionTitle title="风险趋势与四层结构" subtitle="评分下降代表风险改善；C/D 缺失不以零分参与正式合成" />
    <Row gutter={[14, 14]}>
      <Col xs={24} xl={14}><Card bordered={false} className="surface-card chart-card" title="周度风险指数"><Line data={scoreTrend} xField="week" yField="value" color="#37c2ff" point={{ size: 5 }} area={{ style: { fill: 'linear-gradient(-90deg, rgba(55,194,255,0.02) 0%, rgba(55,194,255,0.34) 100%)' } }} axis={{ y: { domain: false, title: '风险指数' }, x: { title: false } }} /></Card></Col>
      <Col xs={24} xl={10}><Card bordered={false} className="surface-card chart-card" title="四层最新可用值"><Column data={layerScores} xField="layer" yField="value" colorField="layer" legend={false} axis={{ x: { labelAutoRotate: true }, y: { domain: false } }} /></Card></Col>
    </Row>

    <SectionTitle title="付款优先级队列" subtitle="真正的问题不是国家有没有钱，而是外国 ICT 供应商排在第几位" />
    <div className="priority-grid">{priorityItems.map((item) => <Card bordered={false} key={item.index} className={`priority-card ${item.tone}`}><Text>{item.index}</Text><b>{item.title}</b><small>{item.note}</small></Card>)}</div>
  </>;
}

function CbiWeekly() {
  const columns: any[] = [
    { title: '类别', dataIndex: 'category', width: 130, fixed: 'left', render: (value: string) => <Tag>{value}</Tag> },
    { title: '核心指标', dataIndex: 'metric', width: 210, render: (value: string) => <Text strong>{value}</Text> },
    { title: '当前值', dataIndex: 'value', width: 170, render: (value: string) => <Text className="number-value">{value}</Text> },
    { title: '频率', dataIndex: 'frequency', width: 100 },
    { title: '周度变化', dataIndex: 'change', width: 210 },
    { title: '与回款关系', dataIndex: 'relevance', width: 360 },
    { title: '状态', dataIndex: 'status', width: 110, render: (value: string, row: any) => <Tag color={toneColors[row.tone as Tone]}>{value}</Tag> },
    { title: '来源', dataIndex: 'source', width: 90, render: (url: string) => <Button type="link" href={url} target="_blank" icon={<LinkOutlined />}>原文</Button> },
  ];
  return <>
    <SectionTitle title="CBI 每周核心数据分析" subtitle="官网是记录源；Facebook 只用于快速发现和交叉核验" extra={<Space><Badge status="processing" text="周度快照" /><Tag>2026-09-10</Tag></Space>} />
    <Alert showIcon type="warning" message="本周判断：体系流动性披露提供缓冲，但 Al-Taif 接管与外汇渠道牌照撤销直接抬高特定付款链路风险。" description="官方汇率稳定不代表美元可得、代理行可用或实际汇出及时。所有结论都保留来源日期与频率。" />
    <Card bordered={false} className="surface-card table-card" style={{ marginTop: 14 }}>
      <Table rowKey="key" pagination={false} columns={columns} dataSource={cbiRows as any} scroll={{ x: 1380 }} />
    </Card>
    <Row gutter={[14, 14]} style={{ marginTop: 14 }}>
      <Col xs={24} lg={8}><Card bordered={false} className="surface-card info-card" title="日频"><b>官方汇率</b><p>每日读取官网牌价，并与平行市场交叉观察；不把价差等同于银行可汇出额度。</p></Card></Col>
      <Col xs={24} lg={8}><Card bordered={false} className="surface-card info-card" title="周频 / 事件"><b>公开市场与监管公告</b><p>跟踪票据、存单、银行接管、牌照和反洗钱动作，映射至付款链路。</p></Card></Col>
      <Col xs={24} lg={8}><Card bordered={false} className="surface-card info-card" title="月频"><b>储备与货币变量</b><p>缺少新月表时明确标注 stale，绝不将旧值伪装成实时数据。</p></Card></Col>
    </Row>
    <Card bordered={false} className="surface-card facebook-card" style={{ marginTop: 14 }}>
      <Flex justify="space-between" align="center" gap={16} wrap>
        <Space size={14}><div className="facebook-mark">f</div><div><Title level={5}>CBI Facebook 快速监测</Title><Text type="secondary">最新可见公开帖：Al-Taif Bank 存款声明 · 与官网 9月8日声明一致</Text></div></Space>
        <Button href="https://web.facebook.com/cbi.iraq/" target="_blank" icon={<BellOutlined />}>打开官方页面</Button>
      </Flex>
    </Card>
  </>;
}

function OperatorSnapshot({ name, subtitle, coverage, accent, values }: { name: string; subtitle: string; coverage: string; accent: string; values: [string, string][] }) {
  return <Card bordered={false} className="surface-card operator-card" styles={{ body: { padding: 20 } }}>
    <Flex justify="space-between" align="flex-start"><Space><div className="operator-mark" style={{ background: accent }}>{name.slice(0, 1)}</div><div><Title level={4}>{name}</Title><Text type="secondary">{subtitle}</Text></div></Space><Tag color="warning">{coverage}</Tag></Flex>
    <div className="operator-stats">{values.map(([label, value]) => <div key={label}><Text type="secondary">{label}</Text><b>{value}</b></div>)}</div>
    <Alert type="warning" showIcon message="正式评级暂不输出" description="缺失或 review 状态字段不会被当成 0，也不会被自动放行。" />
  </Card>;
}

function Capacity() {
  const renderMetric = (value: string, note: string) => {
    const pending = value === '待补';
    const good = note.startsWith('好');
    const average = note.startsWith('一般');
    return <div><Text strong className={!pending ? good ? 'metric-good' : average ? 'metric-warn' : 'metric-risk' : ''}>{value}</Text><small className="cell-note">{note}</small></div>;
  };
  const columns: any[] = [
    { title: '#', dataIndex: 'index', width: 55, fixed: 'left' },
    { title: '维度 / 指标', width: 245, fixed: 'left', render: (_: unknown, row: any) => <><Tag>{row.dimension}</Tag><Text strong>{row.metric}</Text><small className="cell-note">{row.formula}</small></> },
    { title: '权重', dataIndex: 'weight', width: 70, render: (value: number) => <Text className="weight">{value}%</Text> },
    { title: '好 / 一般 / 风险', width: 230, render: (_: unknown, row: any) => <Space size={4} wrap><Tag color="success">{row.good}</Tag><Tag color="warning">{row.average}</Tag><Tag color="error">{row.risk}</Tag></Space> },
    { title: 'ASIACELL', width: 190, render: (_: unknown, row: any) => renderMetric(row.asiacell, row.asiaBand) },
    { title: 'ZAIN IRAQ', width: 190, render: (_: unknown, row: any) => renderMetric(row.zain, row.zainBand) },
  ];
  return <>
    <SectionTitle title="客户付款能力评分模型" subtitle="10 个核心指标 · 100 分 · 全部有效后才输出正式评级" extra={<Space><Tag color="processing">Asiacell 6/10 · 65%</Tag><Tag color="processing">Zain Iraq 6/10 · 60%</Tag></Space>} />
    <Row gutter={[14, 14]}>
      <Col xs={24} xl={12}><OperatorSnapshot name="Asiacell" subtitle="Ooredoo Iraq · H1 2026" coverage="6/10 · 覆盖 65%" accent="linear-gradient(135deg,#e23b3b,#ff7a45)" values={[["Q2 Revenue","QAR 1,416m"],["Q2 EBITDA","QAR 645m"],["Margin","46%"],["Capex / Revenue","9%"]]} /></Col>
      <Col xs={24} xl={12}><OperatorSnapshot name="Zain Iraq" subtitle="Zain Group 76% · H1 2026" coverage="6/10 · 覆盖 60%" accent="linear-gradient(135deg,#722ed1,#d43887)" values={[["Q2 Revenue","$334m"],["Q2 EBITDA","$122m"],["Margin","37%"],["Customers","20.4m"]]} /></Col>
    </Row>
    <Card bordered={false} className="surface-card table-card" style={{ marginTop: 14 }}>
      <Table rowKey="key" size="middle" pagination={false} columns={columns} dataSource={capacityRows} scroll={{ x: 1040 }} />
    </Card>
    <Row gutter={[14, 14]} style={{ marginTop: 14 }}>
      <Col xs={24} lg={12}><Card bordered={false} className="surface-card" title="最终评级"><Descriptions column={1} size="small" items={[
        { key: 'A', label: <Tag color="success">A</Tag>, children: '80–100 · Strong Payment Capacity' },
        { key: 'B', label: <Tag color="cyan">B</Tag>, children: '70–79 · Good Payment Capacity' },
        { key: 'C', label: <Tag color="warning">C</Tag>, children: '60–69 · Moderate Risk' },
        { key: 'D', label: <Tag color="error">D</Tag>, children: '<60 · High Payment Risk' },
      ]} /></Card></Col>
      <Col xs={24} lg={12}><Card bordered={false} className="surface-card" title="Red Flag 降级规则"><Space size={[8, 8]} wrap>{['CFO 连续为负','FCF 连续为负','DSO 持续上升','大额债务近期到期','持续经营风险'].map((flag) => <Tag color="error" key={flag}>{flag}</Tag>)}</Space><Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 0 }}>任一项经证据确认，即使总分较高，最终评级也至少下调一级。</Paragraph></Card></Col>
    </Row>
    <Flex gap={8} wrap style={{ marginTop: 14 }}>
      <Button href="customer_payment_capacity_model.csv" icon={<CloudDownloadOutlined />}>下载模型 CSV</Button>
      <Button href="outputs/payment-capacity-ocr-20260910/customer_payment_capacity_model_ocr.xlsx" icon={<CloudDownloadOutlined />}>下载 OCR Excel 模型</Button>
      <Tag>单位：IQD million（扫描财报）</Tag>
    </Flex>
  </>;
}

function RiskAndActions() {
  const columns: any[] = [
    { title: '风险层', dataIndex: 'layer', width: 180, fixed: 'left', render: (value: string) => <Text strong>{value}</Text> },
    { title: '指标', dataIndex: 'indicator', width: 210 },
    { title: '证据', dataIndex: 'evidence', width: 360 },
    { title: '灯号', dataIndex: 'light', width: 90, render: (value: string) => <Tag color={value === '红' ? 'error' : value === '黄' ? 'warning' : 'default'}>{value}</Tag> },
    { title: '建议动作', dataIndex: 'action', width: 360 },
  ];
  return <>
    <SectionTitle title="四层风险矩阵" subtitle="结论、证据、灯号和动作保持在同一行，避免评分脱离业务语境" />
    <Card bordered={false} className="surface-card table-card"><Table rowKey="key" pagination={false} columns={columns} dataSource={riskRows} scroll={{ x: 1120 }} /></Card>
    <SectionTitle title="未来 13 周情景" subtitle="概率是管理判断区间，不是统计预测或预计到账时间" />
    <Row gutter={[14, 14]}>
      <Col xs={24} lg={8}><Card bordered={false} className="scenario-card green"><Tag color="success">S1 · 20–30%</Tag><Title level={4}>缓解</Title><Paragraph>北向路线增强、Basra 恢复且平行溢价回落至 15% 以下；通道风险缓解。</Paragraph></Card></Col>
      <Col xs={24} lg={8}><Card bordered={false} className="scenario-card amber"><Tag color="warning">S2 · 50–60%</Tag><Title level={4}>当前压力</Title><Paragraph>海峡维持 CRITICAL、溢价停留红档且工资队列继续承压；整体保持高风险。</Paragraph></Card></Col>
      <Col xs={24} lg={8}><Card bordered={false} className="scenario-card red"><Tag color="error">S3 · 15–25%</Tag><Title level={4}>尾部事件</Title><Paragraph>链路银行命中制裁、IQD 法定贬值或 Basra 中断超过 14 天；付款可能阶段性冻结。</Paragraph></Card></Col>
    </Row>
    <Alert style={{ marginTop: 14 }} showIcon type="warning" message="汇率敏感性" description="若官方汇率从 1,310 向巴格达现钞售汇价 1,555 靠拢，偿付同额 USD 应收的 IQD 成本约上升 18.7%。因我方 AR 未接入，暂不量化公司现金敞口。" />
    <SectionTitle title="执行清单" subtitle="按本周、30 天与结构性保护分层，每项绑定责任人与时限" />
    <Row gutter={[14, 14]}>{actions.map((group) => <Col xs={24} xl={8} key={group.title}><Card bordered={false} className="surface-card action-card" style={{ borderTopColor: group.color }} title={group.title}><List dataSource={group.items} renderItem={(item) => <List.Item><List.Item.Meta title={item[0]} description={<><span>{item[1]}</span><Tag color="processing" style={{ marginTop: 8 }}>{item[2]}</Tag></>} /></List.Item>} /></Card></Col>)}</Row>
  </>;
}

function Sources() {
  const columns: any[] = [
    { title: 'ID', dataIndex: 'key', width: 75, fixed: 'left', render: (value: string) => <Text code>{value}</Text> },
    { title: '来源', dataIndex: 'source', width: 290, render: (value: string, row: any) => <a href={row.url} target="_blank" rel="noreferrer"><Text strong>{value}</Text> <LinkOutlined /></a> },
    { title: '发布方', dataIndex: 'publisher', width: 220 },
    { title: '截止日', dataIndex: 'asOf', width: 130 },
    { title: '状态', dataIndex: 'status', width: 140, render: (value: string) => <Tag color={value.includes('陈旧') ? 'default' : value.includes('OCR') ? 'cyan' : 'success'}>{value}</Tag> },
  ];
  return <>
    <SectionTitle title="数据源与证据链" subtitle="官方源、监管源、OCR 核验源与交叉验证分层呈现" extra={<Button href="sources.csv" icon={<CloudDownloadOutlined />}>完整 sources.csv</Button>} />
    <Alert showIcon type="info" message="数据纪律" description="来源日期、频率和状态与数值一起展示；公开信息不足时标记 stale / 待补，不使用假设值填空。扫描财报只保留财务行证据、页码、置信度与哈希。" />
    <Card bordered={false} className="surface-card table-card" style={{ marginTop: 14 }}><Table rowKey="key" pagination={false} columns={columns} dataSource={sourceRows} scroll={{ x: 860 }} /></Card>
    <Row gutter={[14, 14]} style={{ marginTop: 14 }}>
      <Col xs={24} lg={8}><Card bordered={false} className="surface-card info-card" title={<><SafetyCertificateOutlined /> 隐私最小化</>}><p>PDF 不入迁移包；默认不保留全文 OCR；审计结果不含签名、姓名、电话等偶发个人信息。</p></Card></Col>
      <Col xs={24} lg={8}><Card bordered={false} className="surface-card info-card" title={<><BookOutlined /> 可复核</>}><p>每个运营商档案绑定 PDF SHA-256；文件变化会自动降级为 hash mismatch review。</p></Card></Col>
      <Col xs={24} lg={8}><Card bordered={false} className="surface-card info-card" title={<><SyncOutlined /> 可迁移</>}><p>浏览器模式无需 API key；本地模式只依赖 Python、Tesseract 与 Poppler。</p></Card></Col>
    </Row>
  </>;
}

function DashboardApp() {
  const screens = Grid.useBreakpoint();
  const [active, setActive] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [methodOpen, setMethodOpen] = useState(false);
  const route = useMemo(() => ({ path: '/', routes: menuItems }), []);

  useEffect(() => {
    if (screens.lg !== undefined) setCollapsed(!screens.lg);
  }, [screens.lg]);

  const navigate = (key: string) => {
    const normalized = key.replace(/^\/+/, '') || 'overview';
    setActive(normalized);
    if (screens.md === false) setCollapsed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = active === 'cbi' ? <CbiWeekly /> : active === 'capacity' ? <Capacity /> : active === 'ocr' ? <><SectionTitle title="财报 OCR 工作台" subtitle="扫描件提取、财务勾稽、人工确认、公式评分和审计留痕" /><OcrWorkbench /></> : active === 'risk' ? <RiskAndActions /> : active === 'sources' ? <Sources /> : <Overview navigate={navigate} />;

  return <ProLayout
    title="Iraq Treasury"
    logo={<div className="brand-logo"><ApartmentOutlined /></div>}
    route={route}
    location={{ pathname: `/${active}` }}
    layout="mix"
    splitMenus={false}
    fixedHeader
    fixSiderbar
    siderWidth={228}
    collapsed={collapsed}
    onCollapse={setCollapsed}
    menu={{ request: async () => menuItems }}
    menuProps={{ selectedKeys: [active, `/${active}`], onClick: ({ key }) => navigate(String(key)) }}
    token={{
      header: { colorBgHeader: 'rgba(7,17,31,.94)', colorHeaderTitle: '#eef5ff', colorTextMenu: '#9fb0c5', colorTextMenuSelected: '#fff', colorBgMenuItemSelected: 'rgba(55,194,255,.14)' },
      sider: { colorMenuBackground: '#081423', colorTextMenu: '#91a3ba', colorTextMenuSelected: '#fff', colorBgMenuItemSelected: 'rgba(55,194,255,.14)' },
      pageContainer: { paddingBlockPageContainerContent: 20, paddingInlinePageContainerContent: screens.md ? 24 : 12 },
    }}
    actionsRender={() => screens.md ? [
      <Badge status="success" text={<Text type="secondary">系统在线</Text>} key="status" />,
      <Button key="method" icon={<FundOutlined />} onClick={() => setMethodOpen(true)}>方法说明</Button>,
    ] : [<Button key="method" type="text" shape="circle" aria-label="方法说明" icon={<FundOutlined />} onClick={() => setMethodOpen(true)} />]}
    avatarProps={screens.md ? { src: undefined, icon: <SafetyCertificateOutlined />, title: 'Internal Reference' } : undefined}
    footerRender={() => <footer className="app-footer"><span>Internal Reference · 公开信息不足处已标记待补 / stale</span><span>Ant Design Pro v6 · 数据截止 2026-09-10</span></footer>}
  >
    <PageContainer header={{ title: false, breadcrumb: {} }} className="page-shell">{content}</PageContainer>
    <Drawer width={screens.md ? 520 : '92%'} open={methodOpen} onClose={() => setMethodOpen(false)} title="四层风险评价方法">
      <Timeline items={[
        { color: 'red', children: <><b>Layer A · 国家资金供给</b><p>石油出口、财政支付、储备与货币变量，判断国家层面资金压力。</p></> },
        { color: 'orange', children: <><b>Layer B · 支付通道</b><p>CBI 限制、代理行、OFAC/制裁与合规路径，判断资金能否汇出。</p></> },
        { color: 'blue', children: <><b>Layer C · 客户付款能力</b><p>10 指标 100 分模型；全部有效才形成正式 A–D 评级。</p></> },
        { color: 'gray', children: <><b>Layer D · 我方风险敞口</b><p>AR、账龄、争议、催收和客户可动用现金；当前待内部数据接入。</p></> },
      ]} />
      <Divider />
      <Alert showIcon icon={<AlertOutlined />} type="warning" message="风险指数不是预计到账天数" description="它用于比较风险层级与变化方向；结论必须回到具体付款路径、客户行为和我方敞口。" />
      <img className="method-image" src="methodology-overview-v3.png" alt="四层方法论概览" />
    </Drawer>
  </ProLayout>;
}

export default function Dashboard() {
  return <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, token: { colorPrimary: '#37c2ff', colorInfo: '#37c2ff', colorSuccess: '#3ddc97', colorWarning: '#ffbd59', colorError: '#ff6b7a', colorBgBase: '#07111f', colorBgContainer: '#0d1b2d', borderRadius: 12, fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif' }, components: { Card: { colorBgContainer: 'rgba(13,27,45,.88)' }, Table: { headerBg: '#10243a', rowHoverBg: '#112a43' }, Menu: { darkItemBg: '#081423' } } }}><AntApp><DashboardApp /></AntApp></ConfigProvider>;
}
