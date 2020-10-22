import { USER } from '../typeAction';

export const connectSocket = () => ({
  type: USER.CONNECT_SOCKET,
});

export const getInfoUser = () => ({
  type: USER.GET_INFO_USER,
});

export const getInfoUserSuccess = (profile) => ({
  type: USER.GET_INFO_USER_SUCCESS,
  payload: profile,
});