import { SIGNUP } from '../../redux/typeAction';

const INITIAL_STATE = {
  isLoading: false,
  errors: null,
  errorMessage: '',
  isShowError: false,
  isErrorUsername: false,
  errorMessageUsername: '',
  isErrorEmail: false,
  errorMessageEmail: '',
  isErrorPassword: false,
  errorMessagePassword: '',
  isErrorConfirmPassword: false,
  errorMessageConfirmPassword: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP.INITIAL_STATE:
      return {
        ...INITIAL_STATE,
      };
    case SIGNUP.SUBMIT_SIGNUP:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUP.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SIGNUP.SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        isShowError: action.payload.isShowError
          ? action.payload.isShowError
          : INITIAL_STATE.isShowError,
        errorMessage: action.payload.errorMessage
          ? action.payload.errorMessage
          : INITIAL_STATE.errorMessage,
        isErrorUsername: action.payload.isErrorUsername
          ? action.payload.isErrorUsername
          : INITIAL_STATE.isErrorUsername,
        errorMessageUsername: action.payload.errorMessageUsername
          ? action.payload.errorMessageUsername
          : INITIAL_STATE.errorMessageUsername,
        isErrorEmail: action.payload.isErrorEmail
          ? action.payload.isErrorEmail
          : INITIAL_STATE.isErrorEmail,
        errorMessageEmail: action.payload.errorMessageEmail
          ? action.payload.errorMessageEmail
          : INITIAL_STATE.errorMessageEmail,
        isErrorPassword: action.payload.isErrorPassword
          ? action.payload.isErrorPassword
          : INITIAL_STATE.isErrorPassword,
        errorMessagePassword: action.payload.errorMessagePassword
          ? action.payload.errorMessagePassword
          : INITIAL_STATE.errorMessagePassword,
        isErrorConfirmPassword: action.payload.isErrorConfirmPassword
          ? action.payload.isErrorConfirmPassword
          : INITIAL_STATE.isErrorConfirmPassword,
        errorMessageConfirmPassword: action.payload.errorMessageConfirmPassword
          ? action.payload.errorMessageConfirmPassword
          : INITIAL_STATE.errorMessageConfirmPassword,
      };
    default:
      return state;
  }
};