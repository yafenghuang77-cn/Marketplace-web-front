import { history } from '@umijs/max';
import { Button, Result, Space } from 'antd';
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    history.push('/');
  };

  handleGoBack = () => {
    this.setState({ hasError: false, error: null });
    history.back();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Result
            status="error"
            title="页面出错了"
            subTitle={
              this.state.error?.message ||
              '抱歉，页面发生了错误，请尝试以下操作'
            }
            extra={
              <Space size="middle">
                <Button type="primary" onClick={this.handleRetry} size="large">
                  重试
                </Button>
                <Button onClick={this.handleGoBack} size="large">
                  返回上一页
                </Button>
                <Button onClick={this.handleGoHome} size="large">
                  返回首页
                </Button>
              </Space>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}
