import {
  call,
  takeLatest,
  put,
  take,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { push } from 'connected-react-router';
import JWTdecode from 'jwt-decode';

import { USER } from '../../redux/typeAction';
import getSocket, { socketDisconnect } from '../../networking/socket';
import { 
  fetchProfile,
  fetchUpdateProfile,
} from '../../api';
import {
  getMyProfileSuccess,
  getInfoUserSuccess,
  addUserToRequestFriends,
  removeUserInRequestFriends,
  updateProfileSuccess,
  updateProfileFail,
} from '../../redux/actions';

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

function* getMyProfile() {
  try {
    const token = window.localStorage.getItem('token');
    const decodeToken = JWTdecode(token);
    const userID = decodeToken.user._id;
    const profileResult = yield call(fetchProfile, userID);
    console.log('------- profileResult ------- getInfoUser');
    console.log(profileResult);
    console.log('------- profileResult ------- getInfoUser');
    yield put(getMyProfileSuccess(profileResult.infoUser));
  } catch (error) {
    console.log('------- error ------- getInfoUser');
    console.log(error);
    console.log('------- error ------- getInfoUser');

    yield call(logout);
  
    yield put(push('/login'));
  }
}

function* getInfoUser(action) {
  try {
    const userID = action.payload;
    const profileResult = yield call(fetchProfile, userID);
    console.log('------- profileResult ------- getInfoUser');
    console.log(profileResult);
    console.log('------- profileResult ------- getInfoUser');
    yield put(getInfoUserSuccess(profileResult.infoUser));
  } catch (error) {
    console.log('------- error ------- getInfoUser');
    console.log(error);
    console.log('------- error ------- getInfoUser');

    yield call(logout);
  
    yield put(push('/login'));
  }
}

function* updateProfile(action) {
  try {
    const data = action.payload;

    const updateProfileResult = yield call(fetchUpdateProfile, data);

    console.log('------- updateProfileResult ------- updateSex');
    console.log(updateProfileResult);
    console.log('------- updateProfileResult ------- updateSex');

    yield put(updateProfileSuccess(updateProfileResult.dataUpdate));
  } catch (error) {
    console.log('------- error ------- updateSex');
    console.log(error);
    console.log('------- error ------- updateSex');
    yield put(updateProfileFail(error.data.message));
  }
}

function* logout() {
  yield window.localStorage.removeItem('token');

  yield socketDisconnect();

  yield put(push('/login'));
}

function* privateRouterWatcher() {
  yield takeLatest(USER.CONNECT_SOCKET, onSocket);
  yield takeLatest(USER.GET_INFO_USER_REQUEST, getInfoUser);
  yield takeLatest(USER.GET_MY_PROFILE_REQUEST, getMyProfile);
  yield takeLatest(USER.UPDATE_PROFILE_REQUEST, updateProfile);  
  yield takeLatest(USER.LOG_OUT, logout);
}

export default privateRouterWatcher;