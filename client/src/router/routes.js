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
  {
    key: 2,
    path: '/chat',
    exact: true,
    loader: () => import('../pages/ChatPage'),
  },
  {
    key: 2,
    path: '/suggest-friend',
    exact: true,
    loader: () => import('../pages/SuggestFriend'),
  },
  {
    key: 3,
    path: '/profile',
    exact: true,
    loader: () => import('../pages/ProfilePage'),
  },
];

export default {
  authRoutes,
  homeRoutes,
};