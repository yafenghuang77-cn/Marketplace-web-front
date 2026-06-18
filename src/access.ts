export default (initialState: { currentUser?: API.UserInfo }) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  const { currentUser } = initialState || {};

  return {
    // 是否已登录
    isAuthenticated: !!currentUser,
    // 是否为管理员（这里简单用用户名判断，实际项目中应该用角色判断）
    isAdmin: currentUser?.name === '管理员',
    // 是否有访问权限（已登录即可访问）
    canAccess: !!currentUser,
  };
};
