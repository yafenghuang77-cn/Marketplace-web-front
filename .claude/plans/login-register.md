# 登录注册功能实现计划

## 目标

实现用户登录和注册功能，未登录时自动跳转到登录页面。

## 实现方案

### 1. 创建登录页面 (`src/pages/Login/index.tsx`)

- 使用 Ant Design 的 Form、Input、Button、Tabs 组件
- 包含登录和注册两个 Tab
- 登录表单：用户名、密码、记住我
- 注册表单：用户名、密码、确认密码、邮箱
- 页面样式美观，居中显示

### 2. 创建认证服务 (`src/services/auth.ts`)

- `login(username, password)` - 登录接口
- `register(data)` - 注册接口
- `logout()` - 登出接口
- `getCurrentUser()` - 获取当前用户信息

### 3. 创建 Request 拦截器 (`src/request.ts`)

- 请求拦截器：自动添加 Authorization header (token)
- 响应拦截器：处理 401 未授权错误，自动跳转登录页
- 统一错误处理

### 4. 修改全局数据模型 (`src/models/global.ts`)

- 添加用户状态管理（userInfo、isAuthenticated）
- 提供 login、logout 方法
- 持久化 token 到 localStorage

### 5. 修改运行时配置 (`src/app.tsx`)

- 在 `getInitialState` 中检查登录状态
- 未登录时重定向到 `/login`
- 获取用户信息并返回

### 6. 修改路由配置 (`config/routes.ts`)

- 添加 `/login` 路由，设置 `layout: false`（不显示侧边栏）
- 修改根路由重定向逻辑

### 7. 创建认证 API Mock (`mock/auth.ts`)

- 提供登录、注册、获取用户信息的 mock 数据

### 8. 更新权限定义 (`src/access.ts`)

- 基于实际用户信息定义权限

## 文件变更清单

| 文件                         | 操作 | 说明               |
| ---------------------------- | ---- | ------------------ |
| `src/pages/Login/index.tsx`  | 新增 | 登录注册页面       |
| `src/pages/Login/index.less` | 新增 | 登录页样式         |
| `src/services/auth.ts`       | 新增 | 认证相关 API       |
| `src/request.ts`             | 新增 | Request 拦截器配置 |
| `src/models/global.ts`       | 修改 | 添加用户状态管理   |
| `src/app.tsx`                | 修改 | 添加登录状态检查   |
| `config/routes.ts`           | 修改 | 添加登录路由       |
| `mock/auth.ts`               | 新增 | 认证 API Mock      |
| `src/access.ts`              | 修改 | 更新权限定义       |

## 实现顺序

1. 创建认证服务和 Mock 数据
2. 创建 Request 拦截器
3. 创建登录页面
4. 修改全局数据模型
5. 修改路由配置
6. 修改运行时配置（getInitialState）
7. 更新权限定义
8. 测试完整流程

## 技术要点

- 使用 localStorage 存储 token
- 使用 umi 的 `getInitialState` 进行登录状态检查
- 使用 `history.push` 进行路由跳转
- 登录页设置 `layout: false` 隐藏侧边栏
- 使用 Ant Design Pro 的 LoginForm 组件样式
