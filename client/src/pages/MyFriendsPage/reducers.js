import { FRIENDS } from '../../redux/typeAction';

const INITIAL_STATE = {
  isLoading: false,
  isShowError: false,
  messageError: '',
  friends: [],
  friendsInvitation: [],
  friendsRequest: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FRIENDS.GET_FRIEND_SUCCESS:
      return {
        ...state,
        friends: action.payload,
      };
    case FRIENDS.GET_FRIEND_INVITATION_SUCCESS:
      return {
        ...state,
        friendsInvitation: action.payload,
      };
    case FRIENDS.GET_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendsRequest: action.payload,
      };
    case FRIENDS.TOGGLE_MODAL_ERROR:
      return {
        ...state,
        isShowError: action.payload,
      };
    case FRIENDS.REMOVE_FRIEND_SUCCESS:
      return {
        ...state,
        friends: state.friends.map((user) => {
          if (user._id === action.payload.userID) {
            return { ...user, statusFriend: 'addFriend' };
          }
          return { ...user };
        }),
        friendsRequest: state.friendsRequest.map((user) => {
          if (user._id === action.payload.userID) {
            return { ...user, statusFriend: 'addFriend' };
          }
          return { ...user };
        }),
        friendsInvitation: state.friendsInvitation.map((user) => {
          if (user._id === action.payload.userID) {
            return { ...user, statusFriend: 'addFriend' };
          }
          return { ...user };
        }),
      };
    case FRIENDS.ADD_FRIEND_SUCCESS:
      return {
        ...state,
        friends: state.friends.map((user) => {
          if (user._id === action.payload.recipientID) {
            return { ...user, statusFriend: 'friendInvitation' };
          }
          return { ...user };
        }),
        friendsInvitation: state.friendsInvitation.map((user) => {
          if (user._id === action.payload.recipientID) {
            return { ...user, statusFriend: 'friendInvitation' };
          }
          return { ...user };
        }),
        friendsRequest: state.friendsRequest.map((user) => {
          if (user._id === action.payload.recipientID) {
            return { ...user, statusFriend: 'friendInvitation' };
          }
          return { ...user };
        }),
      };
    case FRIENDS.CANCEL_FRIEND_SUCCESS:
      return {
        ...state,
        friendsInvitation: state.friendsInvitation.map((user) => {
          if (user._id === action.payload.recipientID) {
            return { ...user, statusFriend: 'addFriend' };
          }
          return { ...user };
        }),
        friends: state.friends.map((user) => {
          if (user._id === action.payload.recipientID) {
            return { ...user, statusFriend: 'addFriend' };
          }
          return { ...user };
        }),
        friendsRequest: state.friendsRequest.map((user) => {
          if (user._id === action.payload.recipientID) {
            return { ...user, statusFriend: 'addFriend' };
          }
          return { ...user };
        }),
      };
    case FRIENDS.ACCEPT_FRIEND_SUCCESS: 
      return {
        ...state,
        friends: state.friends.map((user) => {
          if (user._id === action.payload.requesterID) {
            return { ...user, statusFriend: 'friend' };
          }
          return { ...user };
        }),
        friendsInvitation: state.friendsInvitation.map((user) => {
          if (user._id === action.payload.requesterID) {
            return { ...user, statusFriend: 'friend' };
          }
          return { ...user };
        }),
        friendsRequest: state.friendsRequest.map((user) => {
          if (user._id === action.payload.requesterID) {
            return { ...user, statusFriend: 'friend' };
          }
          return { ...user };
        }),
      };
    case FRIENDS.ACCEPT_FRIEND_FAIL:
      return {
        ...state,
        isShowError: true,
        messageError: action.payload,
      };
    case FRIENDS.DECLINED_FRIEND_SUCCESS:
      return {
        ...state,
        friendsRequest: state.friendsRequest.filter((user) => user._id !== action.payload.requesterID),
      };
    default:
      return state;
  }
};
