import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isAuthenticated } from '../networking/axios';

const AuthRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated()
        ? (<Redirect to="/" />)
        : (<Component {...props} />)
    )}
  />
);

AuthRouter.propTypes = {
  component: PropTypes.func,
};

AuthRouter.defaultProps = {
  component: null,
};

export default AuthRouter;