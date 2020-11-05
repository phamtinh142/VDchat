import { all } from 'redux-saga/effects';

import login from '../pages/LoginPage/sagas';
import signup from '../pages/SignupPage/sagas';
import myFriends from '../pages/MyFriendsPage/sagas';
import myProfile from '../pages/MyProfilePage/sagas';
import everybody from '../pages/EverybodyPage/sagas';

export default function* rootSaga() {
  yield all([
    login(),
    signup(),
    myFriends(),
    myProfile(),
    everybody(),
  ]);
}