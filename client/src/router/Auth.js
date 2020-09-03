import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

const AuthRouter = () => (
  <Router>
    <Route path="/login" exact>
      <LoginPage />
    </Route>
    <Route path="/signup" exact>
      <SignupPage />
    </Route>
  </Router>
);

export default AuthRouter;