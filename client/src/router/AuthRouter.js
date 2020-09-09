import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => <Component {...props} />}
  />
);

AuthRouter.propTypes = {
  component: PropTypes.func,
};

AuthRouter.defaultProps = {
  component: null,
};

export default AuthRouter;