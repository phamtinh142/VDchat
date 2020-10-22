import { SUGGEST_FRIENDS } from '../../redux/typeAction';

export const initialSuggestFriend = () => ({
  type: SUGGEST_FRIENDS.INITIAL_STATE,
});

export const getSuggestFriends = (text) => ({
  type: SUGGEST_FRIENDS.GET_USER_LIST,
  payload: text,
});

export const getSuggestFriendsSuccess = (payload) => ({
  type: SUGGEST_FRIENDS.GET_USER_SUCCESS,
  payload,
});

export const getSuggestFriendsFail = () => ({
  type: SUGGEST_FRIENDS.GET_USER_FAIL,
});

export const addNewFriendRequest = (userID) => ({
  type: SUGGEST_FRIENDS.ADD_FRIEND_REQUEST,
  payload: userID,
});

export const addNewFriendSuccess = (data) => ({
  type: SUGGEST_FRIENDS.ADD_FRIEND_SUCCESS,
  payload: data,
});

export const addNewFriendFail = () => ({
  type: SUGGEST_FRIENDS.ADD_FRIEND_FAIL,
});

export const acceptFriendRequest = (userID) => ({
  type: SUGGEST_FRIENDS.ACCEPT_FRIEND_REQUEST,
  payload: userID,
});

export const acceptFriendSuccess = (data) => ({
  type: SUGGEST_FRIENDS.ACCEPT_FRIEND_SUCCESS,
  payload: data,
});

export const declinedFriendRequest = (userID) => ({
  type: SUGGEST_FRIENDS.DECLINED_FRIEND_REQUEST,
  payload: userID,
});

export const declinedFriendSuccess = (data) => ({
  type: SUGGEST_FRIENDS.DECLINED_FRIEND_SUCCESS,
  payload: data,
});

export const cancelingFriendRequest = (userID) => ({
  type: SUGGEST_FRIENDS.CANCEL_FRIEND_REQUEST,
  payload: userID,
});

export const cancelingFriendSuccess = (data) => ({
  type: SUGGEST_FRIENDS.CANCEL_FRIEND_SUCCESS,
  payload: data,
});

export const addUserToRequestFriends = (user) => ({
  type: SUGGEST_FRIENDS.ADD_USER_TO_REQUEST_FRIENDS,
  payload: user,
});

export const removeUserInRequestFriends = (user) => ({
  type: SUGGEST_FRIENDS.REMOVE_USER_IN_REQUEST_FRIENDS,
  payload: user,
});