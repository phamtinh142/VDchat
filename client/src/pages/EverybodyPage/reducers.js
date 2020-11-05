import { EVERYBODY, FRIENDS } from '../../redux/typeAction';

const INITIAL_STATE = {
  isLoading: false,
  users: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVERYBODY.GET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case EVERYBODY.GET_USER_FAIL:
      return {
        ...state,
        users: [],
      };
    case FRIENDS.ADD_FRIEND_FAIL:
      return {
        ...state,
      };
    case FRIENDS.ADD_FRIEND_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload.recipientID) {
            return { ...user, statusFriend: 1 };
          }
          return { ...user };
        }),
      };
    case FRIENDS.ACCEPT_FRIEND_SUCCESS: 
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload.requesterID) {
            return { ...user, statusFriend: 3 };
          }
          return { ...user };
        }),
      };
    case FRIENDS.DECLINED_FRIEND_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload.requesterID) {
            return { ...user, statusFriend: 0 };
          }
          return { ...user };
        }),
      };
    case FRIENDS.CANCEL_FRIEND_SUCCESS:
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
