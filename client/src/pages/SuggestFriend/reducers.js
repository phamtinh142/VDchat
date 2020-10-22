import { SUGGEST_FRIENDS } from '../../redux/typeAction';

const INITIAL_STATE = {
  isLoading: false,
  users: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUGGEST_FRIENDS.INITIAL_STATE:
      return {
        ...INITIAL_STATE,
      };
    case SUGGEST_FRIENDS.GET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case SUGGEST_FRIENDS.GET_USER_FAIL:
      return {
        ...state,
        users: [],
      };
    case SUGGEST_FRIENDS.ADD_FRIEND_FAIL:
      return {
        ...state,
      };
    case SUGGEST_FRIENDS.ADD_FRIEND_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload.recipientID) {
            return { ...user, statusFriend: 1 };
          }
          return { ...user };
        }),
      };
    case SUGGEST_FRIENDS.ACCEPT_FRIEND_SUCCESS: 
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload.requesterID) {
            return { ...user, statusFriend: 3 };
          }
          return { ...user };
        }),
      };
    case SUGGEST_FRIENDS.DECLINED_FRIEND_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload.requesterID) {
            return { ...user, statusFriend: 0 };
          }
          return { ...user };
        }),
      };
    case SUGGEST_FRIENDS.CANCEL_FRIEND_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload.recipientID) {
            return { ...user, statusFriend: 0 };
          }
          return { ...user };
        }),
      };
    default:
      return state;
  }
};
