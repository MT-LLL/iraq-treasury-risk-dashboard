import {
  CheckCircleOutlined,
  CloudServerOutlined,
  DownloadOutlined,
  FileSearchOutlined,
  LaptopOutlined,
  LockOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Flex,
  InputNumber,
  Progress,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  Upload,
  message,
} from 'antd';
import type { UploadFile } from 'antd';
import { useEffect, useMemo, useState } from 'react';

declare global {
  interface Window {
    BrowserOCR?: any;
  }
}

type Mode = 'loading' | 'api' | 'browser' | 'unavailable';

const profileOptions = [
  { value: 'tasc_q2_2026', label: 'Asiacell · H1 2026 · IQD mn' },
  { value: 'tzni_q2_2026', label: 'Zain Iraq · H1 2026 · IQD mn' },
];

const redFlags = [
  ['cfo_consecutive_negative', 'CFO 连续为负'],
  ['fcf_consecutive_negative', 'FCF 连续为负'],
  ['dso_rising', 'DSO 持续上升'],
  ['large_debt_due_soon', '大额债务近期到期'],
  ['going_concern', '持续经营风险'],
];

function scriptUrl() {
  const path = window.location.pathname;
  const base = path.endsWith('/') ? path : path.slice(0, path.lastIndexOf('/') + 1);
  return `${base}tools/browser_ocr.js`;
}

function downloadJson(payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = `ocr-audit-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(href);
}

export default function OcrWorkbench() {
  const [mode, setMode] = useState<Mode>('loading');
  const [profile, setProfile] = useState('tasc_q2_2026');
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('正在检查本地 OCR 服务与浏览器引擎…');
  const [result, setResult] = useState<any>(null);
  const [overrides, setOverrides] = useState<Record<string, number>>({});
  const [activeFlags, setActiveFlags] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const initialise = async () => {
      try {
        const response = await fetch('api/health', { cache: 'no-store' });
        if (!response.ok) throw new Error('local API unavailable');
        await response.json();
        if (!cancelled) {
          setMode('api');
          setStatus('本地高性能模式就绪：上传后由本机 Tesseract 处理，源 PDF 临时文件随后删除。');
        }
        return;
      } catch {
        // GitHub Pages intentionally falls back to in-browser OCR.
      }
      try {
        if (!window.BrowserOCR) {
          await new Promise<void>((resolve, reject) => {
            const existing = document.querySelector<HTMLScriptElement>('script[data-browser-ocr]');
            if (existing) {
              existing.addEventListener('load', () => resolve(), { once: true });
              existing.addEventListener('error', () => reject(new Error('OCR script load failed')), { once: true });
              return;
            }
            const script = document.createElement('script');
            script.src = scriptUrl();
            script.async = true;
            script.dataset.browserOcr = 'true';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('OCR script load failed'));
            document.head.appendChild(script);
          });
        }
        await window.BrowserOCR?.loadProfiles();
        if (!cancelled) {
          setMode('browser');
          setStatus('浏览器隐私模式就绪：PDF 与页面图像仅在当前浏览器内存中处理，不上传服务器。');
        }
      } catch (error: any) {
        if (!cancelled) {
          setMode('unavailable');
          setStatus(error?.message || 'OCR 组件加载失败');
        }
      }
    };
    void initialise();
    return () => { cancelled = true; };
  }, []);

  const scoreRows = result?.score?.metrics || [];
  const missingInputs = useMemo(() => {
    const fields = new Set<string>();
    for (const row of scoreRows) for (const field of row.missing_fields || []) fields.add(field);
    return [...fields];
  }, [scoreRows]);

  const loadProfile = async (key = profile) => {
    if (!window.BrowserOCR) return;
    setBusy(true);
    setStatus('正在载入已复核财报快照…');
    try {
      const payload = await window.BrowserOCR.loadReviewedProfile(key);
      setResult(payload);
      setProfile(key);
      setOverrides({});
      setActiveFlags([]);
      setStatus('已载入 SHA-256 锁定的复核档案；未核验字段仍保持“待补”。');
    } catch (error: any) {
      message.error(error?.message || '载入失败');
    } finally {
      setBusy(false);
    }
  };

  const runOcr = async () => {
    const rawFile = files[0]?.originFileObj;
    if (!rawFile) {
      message.warning('请先选择扫描版 PDF');
      return;
    }
    setBusy(true);
    setProgress(2);
    setStatus(mode === 'api' ? '正在本机执行 OCR 与财务勾稽…' : '正在浏览器内执行 Arabic + English OCR…');
    try {
      let payload: any;
      if (mode === 'api') {
        const body = new FormData();
        body.append('file', rawFile);
        body.append('profile', profile);
        const response = await fetch('api/ocr', { method: 'POST', body });
        payload = await response.json();
        if (!response.ok) throw new Error(payload?.error || 'OCR failed');
      } else if (mode === 'browser' && window.BrowserOCR) {
        payload = await window.BrowserOCR.run(rawFile, profile, (event: any) => {
          const pageRatio = event.total ? (event.page || 0) / event.total : 0;
          setProgress(Math.max(5, Math.min(96, Math.round(pageRatio * 90 + (event.progress || 0) * 10))));
          if (event.message) setStatus(event.message);
        });
      } else throw new Error('OCR 当前不可用');
      setResult(payload);
      setOverrides({});
      setActiveFlags([]);
      setProgress(100);
      setStatus('识别完成：只有 verified 字段进入评分，review / missing 字段被自动拦截。');
    } catch (error: any) {
      message.error(error?.message || 'OCR 执行失败');
      setStatus(error?.message || 'OCR 执行失败');
    } finally {
      setBusy(false);
    }
  };

  const recalculate = async () => {
    if (!result) return;
    const red_flags = Object.fromEntries(redFlags.map(([key]) => [key, activeFlags.includes(key)]));
    try {
      let score: any;
      if (mode === 'api') {
        const response = await fetch('api/score', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ metrics: result.report?.metrics || [], overrides, red_flags }),
        });
        score = await response.json();
        if (!response.ok) throw new Error(score?.error || '评分失败');
      } else score = window.BrowserOCR?.scorePaymentCapacity({ metrics: result.report?.metrics || [], overrides, red_flags });
      setResult({ ...result, score });
      setStatus(score.complete ? '10 项指标完整，正式评分已重新计算。' : '已保存人工确认值；指标未齐，仍不输出正式总分。');
    } catch (error: any) {
      message.error(error?.message || '评分失败');
    }
  };

  const metricColumns: any[] = [
    { title: '指标', dataIndex: 'label', fixed: 'left', width: 180, render: (_: any, row: any) => <><b>{row.label}</b><Typography.Text type="secondary" style={{ display: 'block', fontSize: 11 }}>{row.formula}</Typography.Text></> },
    { title: '权重', dataIndex: 'weight', width: 75, render: (value: number) => `${value}%` },
    { title: '数值', dataIndex: 'value', width: 110, render: (value: number | null, row: any) => value == null ? <Tag>待补</Tag> : <Typography.Text strong>{row.format === 'percent' ? `${(value * 100).toFixed(1)}%` : Number(value).toLocaleString()}</Typography.Text> },
    { title: '判定', dataIndex: 'band', width: 95, render: (value: string) => <Tag color={value === 'good' ? 'success' : value === 'average' ? 'warning' : value === 'risk' ? 'error' : 'default'}>{({ good: '好', average: '一般', risk: '风险', pending: '待补' } as any)[value]}</Tag> },
    { title: '加权分', dataIndex: 'weighted_points', width: 85, render: (value: number | null) => value == null ? '—' : value.toFixed(1) },
    { title: '缺失字段', dataIndex: 'missing_fields', render: (value: string[]) => value?.length ? value.join('、') : '—' },
  ];

  return (
    <Card className="surface-card ocr-card" bordered={false}>
      <Flex justify="space-between" align="flex-start" gap={16} wrap>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>扫描版财报 OCR 与人工复核</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: '6px 0 0' }}>
            Arabic + English · 只让已核验财务行进入 10 项评分 · 原始全文不写入迁移包
          </Typography.Paragraph>
        </div>
        <Tag icon={mode === 'api' ? <CloudServerOutlined /> : <LaptopOutlined />} color={mode === 'unavailable' ? 'error' : mode === 'loading' ? 'processing' : 'cyan'}>
          {mode === 'api' ? '本地高性能模式' : mode === 'browser' ? '浏览器隐私模式' : mode === 'loading' ? '初始化中' : '不可用'}
        </Tag>
      </Flex>

      <Alert style={{ marginTop: 18 }} type={mode === 'unavailable' ? 'error' : 'info'} showIcon icon={<LockOutlined />} message={status} />
      {busy && <Progress percent={progress} status="active" style={{ marginTop: 12 }} />}

      <Row gutter={[16, 16]} style={{ marginTop: 18 }}>
        <Col xs={24} lg={13}>
          <Upload.Dragger
            accept="application/pdf,.pdf"
            maxCount={1}
            fileList={files}
            beforeUpload={(file) => { setFiles([{ uid: file.uid, name: file.name, status: 'done', originFileObj: file }]); return false; }}
            onRemove={() => { setFiles([]); return true; }}
            disabled={busy || mode === 'unavailable'}
          >
            <p className="ant-upload-drag-icon"><FileSearchOutlined /></p>
            <p className="ant-upload-text">拖入扫描版 PDF，或点击选择</p>
            <p className="ant-upload-hint">单份不超过 30 MB / 80 页；页面图像仅用于识别</p>
          </Upload.Dragger>
        </Col>
        <Col xs={24} lg={11}>
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <Select value={profile} options={profileOptions} onChange={setProfile} style={{ width: '100%' }} />
            <Button type="primary" size="large" block loading={busy} disabled={mode === 'loading' || mode === 'unavailable'} onClick={runOcr} icon={<FileSearchOutlined />}>开始 OCR、勾稽与评分</Button>
            <Flex gap={8} wrap>
              <Button disabled={mode !== 'browser' || busy} onClick={() => void loadProfile('tasc_q2_2026')}>载入 Asiacell 已核验数据</Button>
              <Button disabled={mode !== 'browser' || busy} onClick={() => void loadProfile('tzni_q2_2026')}>载入 Zain Iraq 已核验数据</Button>
            </Flex>
          </Space>
        </Col>
      </Row>

      {result && <>
        <Descriptions bordered size="small" column={{ xs: 1, sm: 2, lg: 4 }} style={{ marginTop: 20 }}>
          <Descriptions.Item label="主体">{result.report?.report_entity || '—'}</Descriptions.Item>
          <Descriptions.Item label="期间">{result.report?.report_period || '—'}</Descriptions.Item>
          <Descriptions.Item label="核验字段">{result.report?.verified_metric_count ?? 0}</Descriptions.Item>
          <Descriptions.Item label="勾稽通过">{result.report?.verification_checks_passed ?? 0} / {result.report?.verification_checks_total ?? 0}</Descriptions.Item>
          <Descriptions.Item label="可计算指标">{result.score?.available_metric_count ?? 0} / 10</Descriptions.Item>
          <Descriptions.Item label="覆盖权重">{result.score?.available_weight_pct ?? 0}%</Descriptions.Item>
          <Descriptions.Item label="正式总分">{result.score?.complete ? `${result.score.base_score} / 100` : '指标未齐，不评分'}</Descriptions.Item>
          <Descriptions.Item label="最终评级">{result.score?.final_grade || '待补'}</Descriptions.Item>
        </Descriptions>

        <Table rowKey="key" size="small" scroll={{ x: 850 }} pagination={false} columns={metricColumns} dataSource={scoreRows} style={{ marginTop: 16 }} />

        {missingInputs.length > 0 && <Card size="small" className="review-card" title="人工确认输入（只用于当前会话）" style={{ marginTop: 16 }}>
          <Row gutter={[12, 12]}>
            {missingInputs.map((field) => <Col xs={24} sm={12} lg={8} key={field}>
              <Typography.Text type="secondary">{window.BrowserOCR?.defaults?.fieldLabels?.[field] || field}</Typography.Text>
              <InputNumber style={{ width: '100%', marginTop: 5 }} value={overrides[field]} onChange={(value) => setOverrides((current) => ({ ...current, [field]: Number(value) }))} placeholder="输入已核验数值" />
            </Col>)}
          </Row>
        </Card>}

        <Card size="small" className="review-card" title="Red Flag 核验" style={{ marginTop: 16 }}>
          <Checkbox.Group value={activeFlags} onChange={(values) => setActiveFlags(values as string[])}>
            <Space wrap>{redFlags.map(([key, label]) => <Checkbox key={key} value={key}>{label}</Checkbox>)}</Space>
          </Checkbox.Group>
          <Flex gap={8} wrap style={{ marginTop: 14 }}>
            <Button type="primary" icon={<ReloadOutlined />} onClick={() => void recalculate()}>重新计算</Button>
            <Button icon={<DownloadOutlined />} onClick={() => downloadJson(result)}>下载审计 JSON</Button>
            <Tag icon={<CheckCircleOutlined />} color="success">缺失不按 0 分</Tag>
          </Flex>
        </Card>
      </>}
    </Card>
  );
}
