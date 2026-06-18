export default [
  {
    path: '/login',
    name: '登录',
    component: './Login',
    layout: false,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    icon: 'HomeOutlined',
    component: './Home',
  },
  {
    name: '系统管理',
    path: '/system',
    icon: 'SettingOutlined',
    routes: [
      {
        name: '用户管理',
        path: '/system/user',
        icon: 'UserOutlined',
        component: './System/User',
      },
      {
        name: '角色管理',
        path: '/system/role',
        icon: 'TeamOutlined',
        component: './System/Role',
      },
      {
        name: '菜单管理',
        path: '/system/menu',
        icon: 'MenuOutlined',
        component: './System/Menu',
      },
      {
        name: '部门管理',
        path: '/system/dept',
        icon: 'ApartmentOutlined',
        component: './System/Dept',
      },
    ],
  },
  {
    name: '数据中心',
    path: '/data',
    icon: 'DatabaseOutlined',
    routes: [
      {
        name: '数据大屏',
        path: '/data/screen',
        icon: 'DashboardOutlined',
        component: './Data/Screen',
      },
      {
        name: '报表管理',
        path: '/data/report',
        icon: 'BarChartOutlined',
        component: './Data/Report',
      },
    ],
  },
  {
    name: '订单管理',
    path: '/order',
    icon: 'ShoppingCartOutlined',
    routes: [
      {
        name: '订单列表',
        path: '/order/list',
        icon: 'OrderedListOutlined',
        component: './Order/List',
      },
      {
        name: '退款管理',
        path: '/order/refund',
        icon: 'RefundOutlined',
        component: './Order/Refund',
      },
    ],
  },
  {
    name: '商品管理',
    path: '/goods',
    icon: 'AppstoreOutlined',
    routes: [
      {
        name: '商品列表',
        path: '/goods/list',
        icon: 'UnorderedListOutlined',
        component: './Goods/List',
      },
      {
        name: '分类管理',
        path: '/goods/category',
        icon: 'TagsOutlined',
        component: './Goods/Category',
      },
      {
        name: '品牌管理',
        path: '/goods/brand',
        icon: 'TrademarkOutlined',
        component: './Goods/Brand',
      },
    ],
  },
  {
    path: '/*',
    component: './NotFound',
    layout: false,
  },
];
