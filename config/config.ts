import { defineConfig } from '@umijs/max';

export default defineConfig({
  title: '伊拉克资金洞察和回款风险评价工具',
  hash: true,
  esbuildMinifyIIFE: true,
  history: { type: 'hash' },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  routes: [{ path: '/', component: '@/pages/Dashboard' }],
  npmClient: 'pnpm',
  antd: {},
  lessLoader: {},
  favicons: [],
});
