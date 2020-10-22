import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import login from '../../pages/LoginPage/reducers';
import signup from '../../pages/SignupPage/reducers';
import suggestFriend from '../../pages/SuggestFriend/reducers';
import privateRouter from './privateRouter.reducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  login,
  signup,
  suggestFriend,
  privateRouter,
});

export default rootReducer;