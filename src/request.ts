import { getToken, removeToken } from '@/utils/token';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

// 请求拦截器
const requestInterceptors: RequestConfig['requestInterceptors'] = [
  (config: any) => {
    // 从 token 管理工具获取 token（自动检查过期）
    const token = getToken();
    console.log('请求拦截器 - token:', token);
    console.log('请求拦截器 - 请求URL:', config.url);

    if (token) {
      // 确保 headers 对象存在
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('请求拦截器 - 最终headers:', config.headers);
    return config;
  },
];

// 响应拦截器
const responseInterceptors: RequestConfig['responseInterceptors'] = [
  (response: any) => {
    console.log(response.data, 'response.data');

    return response.data;
  },
];

const requestConfig: RequestConfig = {
  timeout: 10000,

  // 请求拦截器
  requestInterceptors,

  // 响应拦截器
  responseInterceptors,

  // 错误处理
  errorConfig: {
    // 错误抛出
    errorThrower: (res: API.Result_Error_) => {
      const { code, data, message: msg } = res;
      if (code !== 200) {
        const error: any = new Error(msg);
        error.name = 'BizError';
        error.info = { code, message: msg, data };
        throw error;
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;

      // 业务错误处理
      if (error.name === 'BizError') {
        const errorInfo = error.info;
        if (errorInfo) {
          message.error(errorInfo.message);
        }
      } else if (error.response) {
        // HTTP 错误处理
        const status = error.response.status;
        if (status === 401) {
          // 未授权，清除 token 并跳转到登录页
          removeToken();
          message.error('登录已过期，请重新登录');
          window.location.href = '/login';
        } else if (status === 403) {
          message.error('没有权限访问该资源');
        } else if (status === 404) {
          message.error('请求的资源不存在');
        } else if (status >= 500) {
          message.error('服务器错误，请稍后重试');
        }
      } else if (error.request) {
        message.error('网络异常，请检查网络连接');
      } else {
        message.error('请求配置错误');
      }
    },
  },
};

export default requestConfig;
