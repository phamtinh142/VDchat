import api from '../networking/axios';
import {
  URL_SUGGEST_FRIEND,
  URL_ADD_NEW_FRIEND,
  URL_SEARCH_USERS,
  URL_ACCEPT_FRIEND_REQUEST,
  URL_CANCEL_FRIEND_REQUEST,
  URL_DECLINED_FRIEND_REQUEST,
} from '../networking/urls';

export const fetchSuggestFriend = async () => {
  try {
    const response = await api.get(URL_SUGGEST_FRIEND);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchSearchUser = async ({ searchText }) => {
  try {
    const response = await api.get(URL_SEARCH_USERS, {
      params: {
        searchText,
      },
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchAddNewFriend = async ({ userID }) => {
  try {
    const response = await api.post(URL_ADD_NEW_FRIEND, {
      userID,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchAcceptFriendRequest = async (userID) => {
  try {
    const response = await api.post(URL_ACCEPT_FRIEND_REQUEST, {
      userID,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCancelFriendRequest = async (userID) => {
  try {
    const response = await api.post(URL_CANCEL_FRIEND_REQUEST, {
      userID,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchDeclinedFriendRequest = async (userID) => {
  try {
    const response = await api.post(URL_DECLINED_FRIEND_REQUEST, {
      userID,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};