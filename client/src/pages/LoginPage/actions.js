import { LOGIN } from '../../redux/typeAction';

export const initialLogin = () => ({
  type: LOGIN.INITIAL_STATE,
});

export const submitLogin = (payload) => ({
  type: LOGIN.SUBMIT_LOGIN,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN.LOGIN_SUCCESS,
  payload,
});

export const loginFail = (payload) => ({
  type: LOGIN.LOGIN_FAIL,
  payload,
});