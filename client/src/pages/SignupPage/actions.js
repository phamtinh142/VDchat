import { SIGNUP } from '../../redux/typeAction';

export const initialSignup = () => ({
  type: SIGNUP.INITIAL_STATE,
});

export const submitSignup = (payload) => ({
  type: SIGNUP.SUBMIT_SIGNUP,
  payload,
});

export const signupSuccess = (payload) => ({
  type: SIGNUP.SIGNUP_SUCCESS,
  payload,
});

export const signupFail = (payload) => ({
  type: SIGNUP.SIGNUP_FAIL,
  payload,
});