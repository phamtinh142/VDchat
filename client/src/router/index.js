import React from 'react';
import { Switch } from 'react-router-dom';

import routes from './routes';
import AuthRouter from './AuthRouter';
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
  </Switch>
);

export default RouterApp;