import { USER, SUGGEST_FRIENDS } from '../typeAction';

const INITIAL_STATE = {
  infoUser: null,
  requestFriend: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER.GET_INFO_USER_SUCCESS:
      return {
        ...state,
        infoUser: action.payload.user,
        requestFriend: action.payload.requestFriends.map((user) => ({ ...user, status: 0 })),
      };
    case SUGGEST_FRIENDS.DECLINED_FRIEND_SUCCESS:
      return {
        ...state,
        requestFriend: state.requestFriend.filter((user) => user._id !== action.payload.requesterID),
      };
    case SUGGEST_FRIENDS.ACCEPT_FRIEND_SUCCESS:
      return {
        ...state,
        requestFriend: state.requestFriend.map((user) => {
          if (user._id === action.payload.requesterID) {
            return { ...user, status: 1 };
          }
          return { ...user };
        }),
      };
    case SUGGEST_FRIENDS.ADD_USER_TO_REQUEST_FRIENDS:
      return {
        ...state,
        requestFriend: [
          ...state.requestFriend,
          { ...action.payload },
        ],
      };
    case SUGGEST_FRIENDS.REMOVE_USER_IN_REQUEST_FRIENDS:
      return {
        ...state,
        requestFriend: state.requestFriend.filter((user) => user._id !== action.payload._id),
      };
    default:
      return state;
  }
};