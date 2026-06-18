/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface PageInfo {
    /**
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    /**
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  /** 统一响应结构 */
  interface ApiResult<T = any> {
    code?: number;
    data?: T;
    message?: string;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_UserInfo_;
  }

  /** 用户信息响应 */
  type Result_UserInfo_ = ApiResult<UserInfo>;

  /** 字符串响应 */
  type Result_string_ = ApiResult<string>;

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
    avatar?: string;
    phone?: string;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  type definitions_0 = null;

  // ==================== 认证相关类型 ====================

  /** 登录请求参数 */
  interface LoginParams {
    username: string;
    password: string;
    remember?: boolean;
  }

  /** 注册请求参数 */
  interface RegisterParams {
    username: string;
    password: string;
    confirmPassword: string;
    email?: string;
  }

  /** 登录响应 */
  interface LoginResult {
    token?: string;
    userInfo?: UserInfo;
  }

  /** 登录响应结果 */
  type Result_LoginResult_ = ApiResult<LoginResult>;

  /** 错误响应 */
  interface Result_Error_ {
    code?: number;
    data?: any;
    message?: string;
  }
}
