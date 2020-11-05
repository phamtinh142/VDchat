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
  getMyProfileRequest,
  getFriendRequest,
} from '../redux/actions';

const HomeRouter = ({ component: Component, ...rest }) => {
  const profile = useSelector((state) => state.myProfile.myProfile);
  const dispatch = useDispatch();

  async function fetchProfile() {
    await dispatch(getMyProfileRequest());
    await dispatch(getFriendRequest());
  }

  useEffect(() => {
    if (isAuthenticated()) {
      configSocket();
    }

    if (!profile && isAuthenticated()) {
      fetchProfile();
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