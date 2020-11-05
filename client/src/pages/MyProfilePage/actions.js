import { USER } from '../../redux/typeAction';

export const connectSocket = () => ({
  type: USER.CONNECT_SOCKET,
});

export const getMyProfileRequest = () => ({
  type: USER.GET_MY_PROFILE_REQUEST,
});

export const getMyProfileSuccess = (profile) => ({
  type: USER.GET_MY_PROFILE_SUCCESS,
  payload: profile,
});

export const getInfoUserRequest = (userID) => ({
  type: USER.GET_INFO_USER_REQUEST,
  payload: userID,
});

export const getInfoUserSuccess = (profile) => ({
  type: USER.GET_INFO_USER_SUCCESS,
  payload: profile,
});

export const updateProfileRequest = (data) => ({
  type: USER.UPDATE_PROFILE_REQUEST,
  payload: data,
});

export const updateProfileSuccess = (data) => ({
  type: USER.UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export const updateProfileFail = (data) => ({
  type: USER.UPDATE_PROFILE_FAIL,
  payload: data,
});

export const toggleModalUpdateProfileFail = (data) => ({
  type: USER.TOGGLE_MODAL_UPDATE_PROFILE_FAIL,
  payload: data,
});

export const logout = () => ({
  type: USER.LOG_OUT,
});