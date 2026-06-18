import { login, register } from '@/services/auth';
import { setToken } from '@/utils/token';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button, Checkbox, Form, Input, Space, Tabs, message } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [loading, setLoading] = useState(false);
  const { setInitialState } = useModel('@@initialState');

  // 登录表单提交
  const handleLogin = async (values: API.LoginParams) => {
    setLoading(true);
    try {
      const result = await login(values);
      if (result.code === 200 && result.data) {
        // 保存 token（3天有效期）
        setToken(result.data.token || '');
        message.success('登录成功！');
        // 更新初始状态
        await setInitialState((s: any) => ({
          ...s,
          currentUser: result.data?.userInfo,
        }));
        // 跳转到首页
        history.push('/');
      } else {
        message.error(result.message || '登录失败');
      }
    } catch (error: any) {
      message.error(error.message || '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 注册表单提交
  const handleRegister = async (values: API.RegisterParams) => {
    setLoading(true);
    try {
      const result = await register(values);
      if (result.code === 200) {
        message.success('注册成功！请登录');
        setActiveTab('login');
      } else {
        message.error(result.message || '注册失败');
      }
    } catch (error: any) {
      message.error(error.message || '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 登录表单
  const LoginForm = () => (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={handleLogin}
      size="large"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名！' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码！' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <div className={styles.loginOptions}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <a className={styles.forgotPassword}>忘记密码？</a>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          登录
        </Button>
      </Form.Item>
      <div className={styles.loginHints}>
        <Space>
          <span>演示账号：</span>
          <span>admin / admin123</span>
          <span>或</span>
          <span>user / user123</span>
        </Space>
      </div>
    </Form>
  );

  // 注册表单
  const RegisterForm = () => (
    <Form name="register" onFinish={handleRegister} size="large">
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入用户名！' },
          { min: 4, message: '用户名至少4个字符！' },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码！' },
          { min: 6, message: '密码至少6个字符！' },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码！' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码输入不一致！'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ type: 'email', message: '请输入有效的邮箱地址！' }]}
      >
        <Input prefix={<MailOutlined />} placeholder="邮箱（选填）" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          注册
        </Button>
      </Form.Item>
    </Form>
  );

  // Tab 项
  const tabItems = [
    {
      key: 'login',
      label: '登录',
      children: <LoginForm />,
    },
    {
      key: 'register',
      label: '注册',
      children: <RegisterForm />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <h1 className={styles.title}>Marketplace</h1>
            <p className={styles.desc}>商品管理系统</p>
          </div>
        </div>
        <div className={styles.main}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            items={tabItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
