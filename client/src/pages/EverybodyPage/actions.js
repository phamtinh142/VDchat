import { EVERYBODY } from '../../redux/typeAction';

export const getEverybody = (text) => ({
  type: EVERYBODY.GET_USER_REQUEST,
  payload: text,
});

export const getEverybodySuccess = (payload) => ({
  type: EVERYBODY.GET_USER_SUCCESS,
  payload,
});

export const getEverybodyFail = () => ({
  type: EVERYBODY.GET_USER_FAIL,
});