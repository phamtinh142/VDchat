import {
  takeLatest,
  put,
  call,
  delay,
} from 'redux-saga/effects';

import {
  getSuggestFriendsSuccess,
  getSuggestFriendsFail,
  addNewFriendSuccess,
  addNewFriendFail,
  acceptFriendSuccess,
  declinedFriendSuccess,
  cancelingFriendSuccess,
} from '../../redux/actions';
import { SUGGEST_FRIENDS } from '../../redux/typeAction';
import { 
  fetchSuggestFriend,
  fetchSearchUser,
  fetchAddNewFriend,
  fetchAcceptFriendRequest,
  fetchDeclinedFriendRequest,
  fetchCancelFriendRequest,
} from '../../api';
import getSocket from '../../networking/socket';

function* getSuggestFriends(action) {
  try {
    const searchText = action.payload;
    let usersResult = {};

    if (searchText !== '') {
      yield delay(500);
      usersResult = yield call(fetchSearchUser, { searchText });
    } else {
      usersResult = yield call(fetchSuggestFriend);
    }
    
    yield put(getSuggestFriendsSuccess(usersResult.data));
  } catch (error) {
    console.log('------- error ------- getSuggestFriends');
    console.log(error);
    console.log('------- error ------- getSuggestFriends');
    yield put(getSuggestFriendsFail());
  }
}

function* addNewFriend(action) {
  try {
    const userID = action.payload;

    const addNewFriendResult = yield call(fetchAddNewFriend, { userID });

    yield getSocket().emit('add_new_contact', addNewFriendResult);

    yield put(addNewFriendSuccess(addNewFriendResult));
  } catch (error) {
    console.log('------- error ------- addNewFriend');
    console.log(error);
    console.log('------- error ------- addNewFriend');
    yield put(addNewFriendFail());
  }
}

function* acceptFriend(action) {
  try {
    const userID = action.payload;

    const acceptFriendResult = yield call(fetchAcceptFriendRequest, userID);

    yield put(acceptFriendSuccess(acceptFriendResult));
  } catch (error) {
    console.log('------- error ------- acceptFriend');
    console.log(error);
    console.log('------- error ------- acceptFriend');
  }
}

function* declinedFriend(action) {
  try {
    const userID = action.payload;

    const declinedFriendResult = yield call(fetchDeclinedFriendRequest, userID);

    yield put(declinedFriendSuccess(declinedFriendResult));
  } catch (error) {
    console.log('------- error ------- declinedFriend');
    console.log(error);
    console.log('------- error ------- declinedFriend');
  }
}

function* cancelFriend(action) {
  try {
    const userID = action.payload;

    const cancelFriendResult = yield call(fetchCancelFriendRequest, userID);

    yield getSocket().emit('cancel_request_contact', cancelFriendResult);

    yield put(cancelingFriendSuccess(cancelFriendResult));
  } catch (error) {
    console.log('------- error ------- cancelFriend');
    console.log(error);
    console.log('------- error ------- cancelFriend');
  }
}

function* suggestFriendWatcher() {
  yield takeLatest(SUGGEST_FRIENDS.GET_USER_LIST, getSuggestFriends);
  yield takeLatest(SUGGEST_FRIENDS.ADD_FRIEND_REQUEST, addNewFriend);
  yield takeLatest(SUGGEST_FRIENDS.ACCEPT_FRIEND_REQUEST, acceptFriend);
  yield takeLatest(SUGGEST_FRIENDS.DECLINED_FRIEND_REQUEST, declinedFriend);
  yield takeLatest(SUGGEST_FRIENDS.CANCEL_FRIEND_REQUEST, cancelFriend);
}

export default suggestFriendWatcher;