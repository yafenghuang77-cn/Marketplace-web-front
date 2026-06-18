// 全局共享数据 - 用户状态管理
import { logout as logoutApi } from '@/services/auth';
import { history } from '@umijs/max';
import { message } from 'antd';
import { useCallback, useState } from 'react';

const useUser = () => {
  const [userInfo, setUserInfo] = useState<API.UserInfo | undefined>(() => {
    // 从 localStorage 恢复用户信息
    const stored = localStorage.getItem('userInfo');
    return stored ? JSON.parse(stored) : undefined;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  // 设置用户信息
  const setCurrentUser = useCallback((user: API.UserInfo | undefined) => {
    setUserInfo(user);
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('userInfo');
      setIsAuthenticated(false);
    }
  }, []);

  // 登出
  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch (error) {
      // 即使请求失败也要清除本地状态
      console.error('登出请求失败:', error);
    } finally {
      // 清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      // 更新状态
      setUserInfo(undefined);
      setIsAuthenticated(false);
      message.success('已退出登录');
      // 跳转到登录页
      history.push('/login');
    }
  }, []);

  return {
    userInfo,
    isAuthenticated,
    setCurrentUser,
    logout,
  };
};

export default useUser;
