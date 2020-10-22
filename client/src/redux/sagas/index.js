import { all } from 'redux-saga/effects';

import privateRouter from './privateRouter.saga';
import login from '../../pages/LoginPage/sagas';
import signup from '../../pages/SignupPage/sagas';
import suggestFriend from '../../pages/SuggestFriend/sagas';

export default function* rootSaga() {
  yield all([
    privateRouter(),
    login(),
    signup(),
    suggestFriend(),
  ]);
}