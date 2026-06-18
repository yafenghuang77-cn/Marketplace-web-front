import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  hash: true,
  history: { type: 'hash' },
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [...routes],
  npmClient: 'yarn',
  utoopack: {},
});
