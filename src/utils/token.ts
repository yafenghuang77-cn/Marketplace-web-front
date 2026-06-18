/**
 * Token 管理工具
 * 用于管理 token 的存储、读取和过期检查
 */

const TOKEN_KEY = 'token';
const TOKEN_EXPIRE_KEY = 'token_expire_time';

// Token 有效期：3天（毫秒）
const TOKEN_EXPIRE_DAYS = 3;
const TOKEN_EXPIRE_MS = TOKEN_EXPIRE_DAYS * 24 * 60 * 60 * 1000;

/**
 * 保存 token 及其过期时间
 * @param token 用户 token
 */
export function setToken(token: string): void {
  const expireTime = Date.now() + TOKEN_EXPIRE_MS;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRE_KEY, String(expireTime));
}

/**
 * 移除 token 及其过期时间
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRE_KEY);
}

/**
 * 获取 token，如果已过期则返回 null
 * @returns token 或 null（已过期/不存在）
 */
export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const expireTimeStr = localStorage.getItem(TOKEN_EXPIRE_KEY);

  if (!token || !expireTimeStr) {
    return null;
  }

  const expireTime = Number(expireTimeStr);
  if (Date.now() > expireTime) {
    // Token 已过期，清除
    removeToken();
    return null;
  }

  return token;
}

/**
 * 检查 token 是否有效（存在且未过期）
 * @returns 是否有效
 */
export function isTokenValid(): boolean {
  return getToken() !== null;
}

/**
 * 获取 token 剩余有效时间（毫秒）
 * @returns 剩余时间（毫秒），如果 token 无效则返回 0
 */
export function getTokenRemainingTime(): number {
  const expireTimeStr = localStorage.getItem(TOKEN_EXPIRE_KEY);
  if (!expireTimeStr) {
    return 0;
  }

  const expireTime = Number(expireTimeStr);
  const remaining = expireTime - Date.now();
  return remaining > 0 ? remaining : 0;
}
