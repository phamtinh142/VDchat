import { USER } from '../../redux/typeAction';

const INITIAL_STATE = {
  isShowModalError: false,
  messageError: '',
  myProfile: null,
  userInfo: null,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER.GET_MY_PROFILE_SUCCESS:
      return {
        ...state,
        myProfile: action.payload,
      };
    case USER.GET_INFO_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: true,
      };
    case USER.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        myProfile: Object.assign(state.myProfile, action.payload),
        userInfo: Object.assign(state.userInfo, action.payload),
      };
    case USER.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        isShowModalError: true,
        messageError: action.payload,
      };
    case USER.TOGGLE_MODAL_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        isShowModalError: action.payload,
      };
    case USER.LOG_OUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};