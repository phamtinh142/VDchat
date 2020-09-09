const authRoutes = [
  {
    key: 1,
    path: '/login',
    exact: true,
    loader: () => import('../pages/LoginPage'),
  },
  {
    key: 2,
    path: '/signup',
    exact: true,
    loader: () => import('../pages/SignupPage'),
  },
];

const homeRoutes = [
  {
    key: 1,
    path: '/',
    exact: true,
    loader: () => import('../pages/HomePage'),
  },
];

export default {
  authRoutes,
  homeRoutes,
};