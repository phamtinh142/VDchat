import { FRIENDS } from '../../redux/typeAction';

export const getAllFriends = ({ id, textSearch }) => ({
  type: FRIENDS.GET_FRIENDS,
  payload: { id, textSearch },
});

export const getFriendsSuccess = (data) => ({
  type: FRIENDS.GET_FRIEND_SUCCESS,
  payload: data,
});

export const getFriendInvitation = () => ({
  type: FRIENDS.GET_FRIEND_INVITATION,
});

export const getFriendInvitationSuccess = (data) => ({
  type: FRIENDS.GET_FRIEND_INVITATION_SUCCESS,
  payload: data,
});

export const getFriendRequest = () => ({
  type: FRIENDS.GET_FRIEND_REQUEST,
});

export const getFriendRequestSuccess = (data) => ({
  type: FRIENDS.GET_FRIEND_REQUEST_SUCCESS,
  payload: data,
});

export const toggleFriendErrorModal = (status) => ({
  type: FRIENDS.TOGGLE_MODAL_ERROR,
  payload: status,
});

export const addNewFriendRequest = (userID) => ({
  type: FRIENDS.ADD_FRIEND_REQUEST,
  payload: userID,
});

export const addNewFriendSuccess = (data) => ({
  type: FRIENDS.ADD_FRIEND_SUCCESS,
  payload: data,
});

export const addNewFriendFail = () => ({
  type: FRIENDS.ADD_FRIEND_FAIL,
});

export const acceptFriendRequest = (userID) => ({
  type: FRIENDS.ACCEPT_FRIEND_REQUEST,
  payload: userID,
});

export const acceptFriendSuccess = (data) => ({
  type: FRIENDS.ACCEPT_FRIEND_SUCCESS,
  payload: data,
});

export const acceptFriendFail = (message) => ({
  type: FRIENDS.ACCEPT_FRIEND_FAIL,
  payload: message,
});

export const declinedFriendRequest = (userID) => ({
  type: FRIENDS.DECLINED_FRIEND_REQUEST,
  payload: userID,
});

export const declinedFriendSuccess = (data) => ({
  type: FRIENDS.DECLINED_FRIEND_SUCCESS,
  payload: data,
});

export const cancelingFriendRequest = (userID) => ({
  type: FRIENDS.CANCEL_FRIEND_REQUEST,
  payload: userID,
});

export const cancelingFriendSuccess = (data) => ({
  type: FRIENDS.CANCEL_FRIEND_SUCCESS,
  payload: data,
});

export const removeFriendRequest = (userID) => ({
  type: FRIENDS.REMOVE_FRIEND_REQUEST,
  payload: userID,
});

export const removeFriendSuccess = (data) => ({
  type: FRIENDS.REMOVE_FRIEND_SUCCESS,
  payload: data,
});

export const addUserToRequestFriends = (user) => ({
  type: FRIENDS.ADD_USER_TO_REQUEST_FRIENDS,
  payload: user,
});

export const removeUserInRequestFriends = (user) => ({
  type: FRIENDS.REMOVE_USER_IN_REQUEST_FRIENDS,
  payload: user,
});