import { PageContainer } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useState } from 'react';

export default function GoodsListPage() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('页面崩溃了！');
  }

  return (
    <PageContainer>
      <div>
        <p>商品列表</p>
        <Button
          type="primary"
          danger
          onClick={() => {
            message.warning('页面即将崩溃...');
            setTimeout(() => setShouldCrash(true), 500);
          }}
        >
          模拟页面崩溃
        </Button>
      </div>
    </PageContainer>
  );
}
