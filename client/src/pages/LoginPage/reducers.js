import { LOGIN } from '../../redux/typeAction';

const INITIAL_STATE = {
  isLoading: false,

  isShowError: false,
  messageError: '',

  isErrorEmail: false,
  messageErrorEmail: '',

  isErrorPassword: false,
  messageErrorPassword: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN.INITIAL_STATE:
      return {
        ...INITIAL_STATE,
      };
    case LOGIN.SUBMIT_LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isShowError: action.payload.isShowError
          ? action.payload.isShowError
          : INITIAL_STATE.isShowError,
        messageError: action.payload.messageError
          ? action.payload.messageError
          : INITIAL_STATE.messageError,
        isErrorEmail: action.payload.isErrorEmail
          ? action.payload.isErrorEmail
          : INITIAL_STATE.isErrorEmail,
        messageErrorEmail: action.payload.messageErrorEmail
          ? action.payload.messageErrorEmail
          : INITIAL_STATE.messageErrorEmail,
        isErrorPassword: action.payload.isErrorPassword
          ? action.payload.isErrorPassword
          : INITIAL_STATE.isErrorPassword,
        messageErrorPassword: action.payload.messageErrorPassword
          ? action.payload.messageErrorPassword
          : INITIAL_STATE.messageErrorPassword,
      };
    default:
      return state;
  }
};