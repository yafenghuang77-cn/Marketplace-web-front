import { isTokenValid, removeToken } from '@/utils/token';
import { history } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';

/**
 * Token 过期检查 Hook
 * 定期检查 token 是否过期，过期则跳转到登录页
 * @param checkInterval 检查间隔（毫秒），默认 60 秒
 */
export function useTokenCheck(checkInterval: number = 60000): void {
  useEffect(() => {
    // 初始检查
    if (!isTokenValid()) {
      removeToken();
      message.error('登录已过期，请重新登录');
      history.push('/login');
      return;
    }

    // 定期检查
    const timer = setInterval(() => {
      if (!isTokenValid()) {
        removeToken();
        message.error('登录已过期，请重新登录');
        history.push('/login');
        clearInterval(timer);
      }
    }, checkInterval);

    // 清理定时器
    return () => {
      clearInterval(timer);
    };
  }, [checkInterval]);
}

export default useTokenCheck;
