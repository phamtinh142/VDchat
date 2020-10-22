import {
  call,
  takeLatest,
  put,
  take,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { push } from 'connected-react-router';

import { USER } from '../typeAction';
import getSocket from '../../networking/socket';
import { fetchProfile } from '../../api';
import {
  getInfoUserSuccess,
  addUserToRequestFriends,
  removeUserInRequestFriends,
} from '../actions';

function* event() {
  return eventChannel((emit) => {
    getSocket().on('REQUEST_FRIENDS_EVENT', (result) => {
      console.log('------- result ------- REQUEST_FRIENDS_EVENT');
      console.log(result);
      console.log('------- result ------- REQUEST_FRIENDS_EVENT');
    });
    getSocket().on('ADD_NEW_CONTACT', (result) => {
      console.log('------- result ------- ADD_NEW_CONTACT');
      console.log(result);
      console.log('------- result ------- ADD_NEW_CONTACT');
      emit(addUserToRequestFriends(result));
    });
    getSocket().on('CANCEL_REQUEST_CONTACT', (result) => {
      console.log('------- result ------- CANCEL_REQUEST_CONTACT');
      console.log(result);
      console.log('------- result ------- CANCEL_REQUEST_CONTACT');
      emit(removeUserInRequestFriends(result));
    });
    return () => {};
  });
}

function* onSocket() {
  const channel = yield call(event);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* getInfoUser() {
  try {
    const profileResult = yield call(fetchProfile);
    console.log('------- profileResult ------- getInfoUser');
    console.log(profileResult);
    console.log('------- profileResult ------- getInfoUser');
    yield put(getInfoUserSuccess(profileResult));
  } catch (error) {
    console.log('------- error ------- getInfoUser');
    console.log(error);
    console.log('------- error ------- getInfoUser');
    yield put(push('/login'));
  }
}

function* privateRouterWatcher() {
  yield takeLatest(USER.CONNECT_SOCKET, onSocket);
  yield takeLatest(USER.GET_INFO_USER, getInfoUser);
}

export default privateRouterWatcher;