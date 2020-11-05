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
    loader: () => import('../pages/ChatPage'),
  },
  {
    key: 2,
    path: '/:id/profile',
    exact: true,
    loader: () => import('../pages/MyProfilePage'),
  },
  {
    key: 3,
    path: '/:id/friends',
    exact: true,
    loader: () => import('../pages/MyFriendsPage'),
  },
  {
    key: 4,
    path: '/everybody',
    exact: true,
    loader: () => import('../pages/EverybodyPage'),
  },
];

export default {
  authRoutes,
  homeRoutes,
};