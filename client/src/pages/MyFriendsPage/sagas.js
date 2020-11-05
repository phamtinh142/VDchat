import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';

import {
  getFriendsSuccess,
  getFriendInvitationSuccess,
  getFriendRequestSuccess,
  addNewFriendSuccess,
  addNewFriendFail,
  acceptFriendSuccess,
  declinedFriendSuccess,
  cancelingFriendSuccess,
  removeFriendSuccess,
} from '../../redux/actions';
import { FRIENDS } from '../../redux/typeAction';
import { 
  fetchAllFriends,
  fetchFriendInvitation,
  fetchFriendRequest,
  fetchAddNewFriend,
  fetchAcceptFriendRequest,
  fetchDeclinedFriendRequest,
  fetchCancelFriendRequest,
  fetchRemoveFriend,
} from '../../api';
import getSocket from '../../networking/socket';

function* getAllFriends(action) {
  try {
    const { textSearch, id } = action.payload;

    const allFriendsResult = yield call(fetchAllFriends, { textSearch, id });

    const friends = allFriendsResult.friends.map((user) => ({ ...user, statusFriend: 'friend' }));

    yield put(getFriendsSuccess(friends));
  } catch (error) {
    console.log('------- error ------- getAllFriends');
    console.log(error);
    console.log('------- error ------- getAllFriends');
  }
}

function* getFriendInvitation() {
  try {
    const friendInvitationResulr = yield call(fetchFriendInvitation);

    let friendInvitation = [];
    friendInvitation = friendInvitationResulr.friendInvitation.map((user) => ({ ...user, statusFriend: 'friendInvitation' }));

    yield put(getFriendInvitationSuccess(friendInvitation));
  } catch (error) {
    console.log('------- error ------- getFriendInvitation');
    console.log(error);
    console.log('------- error ------- getFriendInvitation');
  }
}

function* getFriendRequest() {
  try {
    const friendRequestResult = yield call(fetchFriendRequest);

    let friendRequest = [];
    friendRequest = friendRequestResult.friendRequest.map((user) => ({ ...user, statusFriend: 'friendRequest' }));

    yield put(getFriendRequestSuccess(friendRequest));
  } catch (error) {
    console.log('------- error ------- getFriendRequest');
    console.log(error);
    console.log('------- error ------- getFriendRequest');
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

function* removeFriend(action) {
  try {
    const userID = action.payload;

    const removeFriendResult = yield call(fetchRemoveFriend, userID);

    yield put(removeFriendSuccess(removeFriendResult));
  } catch (error) {
    console.log('------- error ------- removeFriend');
    console.log(error);
    console.log('------- error ------- removeFriend');
  }
}

function* suggestFriendWatcher() {
  yield takeLatest(FRIENDS.GET_FRIENDS, getAllFriends);
  yield takeLatest(FRIENDS.GET_FRIEND_INVITATION, getFriendInvitation);
  yield takeLatest(FRIENDS.GET_FRIEND_REQUEST, getFriendRequest);
  yield takeLatest(FRIENDS.ADD_FRIEND_REQUEST, addNewFriend);
  yield takeLatest(FRIENDS.ACCEPT_FRIEND_REQUEST, acceptFriend);
  yield takeLatest(FRIENDS.DECLINED_FRIEND_REQUEST, declinedFriend);
  yield takeLatest(FRIENDS.CANCEL_FRIEND_REQUEST, cancelFriend);
  yield takeLatest(FRIENDS.REMOVE_FRIEND_REQUEST, removeFriend);
}

export default suggestFriendWatcher;