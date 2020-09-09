import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import login from '../pages/LoginPage/reducers';
import signup from '../pages/SignupPage/reducers';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  login,
  signup,
});

export default rootReducer;