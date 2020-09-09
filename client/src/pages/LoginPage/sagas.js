import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import { LOGIN } from '../../redux/typeAction';
import { fetchLogin } from '../../api';
import { loginFail } from './actions';

function* submitLogin(action) {
  const userData = action.payload;
  try {
    const loginResult = yield call(fetchLogin, userData);
    console.log('LOGIN_RESULT: ', loginResult);
  } catch (error) {
    console.log('LOGIN_ERROR: ', error);
    const errors = {};
    if (error.data.errors && Array.isArray(error.data.errors)) {
      const errorList = error.data.errors;
      errorList.forEach((element) => {
        switch (element.param) {
          case 'email':
            errors.isErrorEmail = true;
            errors.messageErrorEmail = element.msg;
            break;
          case 'password':
            errors.isErrorPassword = true;
            errors.messageErrorPassword = element.msg;
            break;
          default:
            break;
        }
      });
    } else {
      errors.isShowError = true;
      errors.messageError = error.data.message;
    }
    yield put(loginFail(errors));
  }
}

function* loginWatcher() {
  yield takeLatest(LOGIN.SUBMIT_LOGIN, submitLogin);
}

export default loginWatcher;