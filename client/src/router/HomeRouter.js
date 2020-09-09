import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomeRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => <Component {...props} />}
  />
);

HomeRouter.propTypes = {
  component: PropTypes.func,
};

HomeRouter.defaultProps = {
  component: null,
};

export default HomeRouter;