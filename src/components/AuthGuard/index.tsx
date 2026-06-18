import { isTokenValid, removeToken } from '@/utils/token';
import { history } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect } from 'react';

// 不需要登录的白名单路径
const whiteList = ['/login'];

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * 认证守卫组件
 * 用于检查 token 有效性，过期则跳转到登录页
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  useEffect(() => {
    // 白名单路径不检查
    const currentPath = history.location.pathname;
    if (whiteList.includes(currentPath)) {
      return;
    }

    // 检查 token 是否有效
    if (!isTokenValid()) {
      removeToken();
      message.error('登录已过期，请重新登录');
      history.push('/login');
    }

    // 定期检查 token（每分钟）
    const timer = setInterval(() => {
      const path = history.location.pathname;
      if (!isTokenValid() && !whiteList.includes(path)) {
        removeToken();
        message.error('登录已过期，请重新登录');
        history.push('/login');
        clearInterval(timer);
      }
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
