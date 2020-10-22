import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { isAuthenticated } from '../networking/axios';
import { configSocket } from '../networking/socket';
import { 
  getInfoUser,
} from '../redux/actions';

const HomeRouter = ({ component: Component, ...rest }) => {
  const profile = useSelector((state) => state.privateRouter.infoUser);
  const privateRouterDispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated()) {
      configSocket();
    }

    if (!profile && isAuthenticated()) {
      privateRouterDispatch(getInfoUser());
    }
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => (
        !isAuthenticated()
          ? (<Redirect to="/login" />)
          : (<Component {...props} />)
      )}
    />
  );
};

HomeRouter.propTypes = {
  component: PropTypes.func,
};

HomeRouter.defaultProps = {
  component: null,
};

export default HomeRouter;