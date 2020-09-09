import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';

import { SIGNUP } from '../../redux/typeAction';
import { fetchSignup } from '../../api';
import {
  signupSuccess,
  signupFail,
} from '../../redux/actions';

function* submitSignup(action) {
  const userData = action.payload;
  try {
    const signupResult = yield call(fetchSignup, userData);
    console.log('signupResult: ', signupResult);
  } catch (error) {
    console.log('errorResult: ', error);
    const errors = {};
    if (error.data.errors && Array.isArray(error.data.errors)) {
      const errorList = error.data.errors;
      errorList.forEach((element) => {
        switch (element.param) {
          case 'userName':
            errors.isErrorUsername = true;
            errors.errorMessageUsername = element.msg;
            break;
          case 'email':
            errors.isErrorEmail = true;
            errors.errorMessageEmail = element.msg;
            break;
          case 'password':
            errors.isErrorPassword = true;
            errors.errorMessagePassword = element.msg;
            break;
          case 'confirmPassword':
            errors.isErrorConfirmPassword = true;
            errors.errorMessageConfirmPassword = element.msg;
            break;
          default:
            break;
        }
      });
    } else {
      errors.isShowError = true;
      errors.errorMessage = error.data.message;
    }
    yield put(signupFail(errors));
  }
}

function* signupWatcher() {
  yield takeLatest(SIGNUP.SUBMIT_SIGNUP, submitSignup);
}

export default signupWatcher;