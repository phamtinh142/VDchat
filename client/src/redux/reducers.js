import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import login from '../pages/LoginPage/reducers';
import signup from '../pages/SignupPage/reducers';
import myFriends from '../pages/MyFriendsPage/reducers';
import myProfile from '../pages/MyProfilePage/reducers';
import everybody from '../pages/EverybodyPage/reducers';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  login,
  signup,
  myFriends,
  myProfile,
  everybody,
});

export default rootReducer;