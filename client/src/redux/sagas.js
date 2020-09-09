import { all } from 'redux-saga/effects';

import login from '../pages/LoginPage/sagas';
import signup from '../pages/SignupPage/sagas';

export default function* rootSaga() {
  yield all([
    login(),
    signup(),
  ]);
}