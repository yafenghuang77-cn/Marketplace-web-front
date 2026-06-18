import { defineMock } from 'umi';

// 模拟用户数据
const users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: '管理员',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    email: 'admin@example.com',
    phone: '13800138000',
  },
];

export default defineMock({
  // 登录接口
  'POST /api/auth/login': (req: any, res: any) => {
    const { username, password } = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      // 生成 token，格式：token_userId_timestamp
      const token = `token_${user.id}_${Date.now()}`;

      const userInfo = { ...user };
      delete (userInfo as any).password;
      res.status(200).json({
        code: 200,
        data: {
          token,
          userInfo,
        },
        message: '登录成功',
      });
    } else {
      res.status(200).json({
        code: 401,
        data: null,
        message: '用户名或密码错误',
      });
    }
  },

  // 注册接口
  'POST /api/auth/register': (req: any, res: any) => {
    const { username, password, email } = req.body;

    // 检查用户名是否已存在
    if (users.find((u) => u.username === username)) {
      res.status(200).json({
        code: 400,
        data: null,
        message: '用户名已存在',
      });
      return;
    }

    // 创建新用户
    const newUser = {
      id: String(users.length + 1),
      username,
      password,
      name: username,
      avatar:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      email: email || '',
      phone: '',
    };
    users.push(newUser);

    const userInfo = { ...newUser };
    delete (userInfo as any).password;
    res.status(200).json({
      code: 200,
      data: userInfo,
      message: '注册成功',
    });
  },

  // 登出接口
  'POST /api/auth/logout': (_req: any, res: any) => {
    res.status(200).json({
      code: 200,
      data: null,
      message: '登出成功',
    });
  },

  // 获取当前用户信息
  'GET /api/auth/currentUser': (req: any, res: any) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(200).json({
        code: 401,
        data: null,
        message: '未登录或登录已过期',
      });
      return;
    }

    // 从 token 中提取用户 ID（格式：token_userId_timestamp）
    const parts = token.split('_');
    if (parts.length < 2) {
      res.status(200).json({
        code: 401,
        data: null,
        message: 'token 格式无效',
      });
      return;
    }

    const userId = parts[1];
    const user = users.find((u) => u.id === userId);

    if (user) {
      const userInfo = { ...user };
      delete (userInfo as any).password;
      res.status(200).json({
        code: 200,
        data: userInfo,
        message: '获取成功',
      });
    } else {
      res.status(200).json({
        code: 401,
        data: null,
        message: '用户不存在',
      });
    }
  },
});
