// 运行时配置

import { getCurrentUser } from '@/services/auth';
import { isTokenValid, removeToken } from '@/utils/token';
import { history } from '@umijs/max';
import { message } from 'antd';
import AuthGuard from './components/AuthGuard';
import ErrorBoundary from './components/ErrorBoundary';

// 不需要登录的白名单路径
const whiteList = ['/login'];

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  currentUser?: API.UserInfo;
  name?: string;
}> {
  const { location } = history;

  // 如果在白名单中，不需要检查登录状态
  if (whiteList.includes(location.pathname)) {
    return { name: 'Marketplace' };
  }

  // 检查 token 是否有效（存在且未过期）
  if (!isTokenValid()) {
    // token 无效或已过期，跳转到登录页
    message.error('登录已过期，请重新登录');
    history.push('/login');
    return { name: 'Marketplace' };
  }

  try {
    // token 有效，尝试获取用户信息
    const result = await getCurrentUser();
    if (result.code === 200 && result.data) {
      return {
        currentUser: result.data,
        name: result.data.name || 'Marketplace',
      };
    } else {
      // 用户信息获取失败，清除 token 并跳转到登录页
      removeToken();
      message.error('登录已过期，请重新登录');
      history.push('/login');
      return { name: 'Marketplace' };
    }
  } catch (error) {
    // 请求失败，清除 token 并跳转到登录页
    removeToken();
    message.error('登录已过期，请重新登录');
    history.push('/login');
    return { name: 'Marketplace' };
  }
}

export const rootContainer = (container: React.ReactNode) => {
  return (
    <ErrorBoundary>
      <AuthGuard>{container}</AuthGuard>
    </ErrorBoundary>
  );
};

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    // 禁用 ProLayout 内置的 ErrorBoundary，使用自定义 ErrorBoundary
    ErrorBoundary: false,
  };
};
