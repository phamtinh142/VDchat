import React from 'react';
import { Switch } from 'react-router-dom';

import routes from './routes';
import AuthRouter from './AuthRouter';
import PrivateRouter from './PrivateRouter';
import CustomLoadable from '../components/common/CustomLoadable';

const RouterApp = () => (
  <Switch>
    {routes.authRoutes.map((route) => (
      <AuthRouter
        key={route.key}
        exact
        path={route.path}
        component={CustomLoadable({ loader: route.loader })}
      />
    ))}
    {routes.homeRoutes.map((route) => (
      <PrivateRouter
        key={route.key}
        exact
        path={route.path}
        component={CustomLoadable({ loader: route.loader })}
      />
    ))}
  </Switch>
);

export default RouterApp;