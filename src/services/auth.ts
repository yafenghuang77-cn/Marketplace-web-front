import { request } from '@umijs/max';

/** 登录 POST /api/auth/login */
export async function login(
  body: API.LoginParams,
  options?: { [key: string]: any },
) {
  return request<API.Result_LoginResult_>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册 POST /api/auth/register */
export async function register(
  body: API.RegisterParams,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出 POST /api/auth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.Result_string_>('/api/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /api/auth/currentUser */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.Result_UserInfo_>('/api/auth/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
