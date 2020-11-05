import React, { useState, useEffect } from 'react';
import {
  Row,
  Button,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import './style.scss';
import { withProfileContainer } from '../../hocs';
import {
  getAllFriends,
  getFriendInvitation,
  getFriendRequest,
  addNewFriendRequest,
  cancelingFriendRequest,
  declinedFriendRequest,
  acceptFriendRequest,
  removeFriendRequest,
} from '../../redux/actions';
import { FriendProfileItem } from '../../components/itemList';

const ProfilePage = () => {
  const { id } = useParams();
  const [isShowFriendBar, setIsShowFriendBar] = useState(false);
  const [tab, setTab] = useState('friend');
  const [textSearch, setTextSearch] = useState('');
  const myID = useSelector((state) => state.myProfile.myProfile._id);
  const friends = useSelector((state) => state.myFriends.friends);
  const friendsInvitation = useSelector((state) => state.myFriends.friendsInvitation);
  const friendsRequest = useSelector((state) => state.myFriends.friendsRequest);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== myID) {
      setIsShowFriendBar(true);
    }
    dispatch(getAllFriends({ id, textSearch }));
  }, []);

  const handleFriendTab = () => {
    setTab('friend');
    return dispatch(getAllFriends({ id, textSearch }));
  };

  const handleFriendInvitationTab = () => {
    setTab('friendInvitation');
    return dispatch(getFriendInvitation());
  };

  const handleFriendRequest = () => {
    setTab('friendRequest');
    return dispatch(getFriendRequest());
  };

  const addFriend = (userID) => {
    dispatch(addNewFriendRequest(userID));
  };

  const removeFriend = (userID) => {
    dispatch(removeFriendRequest(userID));
  };

  const cancelingAddFriend = (userID) => {
    dispatch(cancelingFriendRequest(userID));
  };

  const declinedFriend = (userID) => {
    dispatch(declinedFriendRequest(userID));
  };

  const acceptFriend = (userID) => {
    dispatch(acceptFriendRequest(userID));
  };

  const onChangeText = (event) => {
    setTextSearch(event.target.value);
  };

  return (
  <div className="friends-layout">
    <div className="friends-header">
      <h1 className="title-header">Bạn bè</h1>
      {
        tab === 'friend'
          ? (
          <FormControl 
            type="text" 
            placeholder="Tìm kiếm" 
            className="search-friend-profile"
            value={textSearch}
            onChange={(event) => onChangeText(event)}
          />
          )
          : null
      }
    </div>
    <div className="friends-content">
      {
        !isShowFriendBar
          ? (
          <div className="d-flex justify-content-start align-items-center my-3">
            <Button
              type="button" 
              className={`button-link button-header ${tab === 'friend' ? 'active' : ''}`}
              onClick={() => handleFriendTab()}
            >
              Tất cả bạn bè                                                                                                                                                                                                                  
            </Button>
            <Button
              type="button" 
              className={`button-link button-header ${tab === 'friendInvitation' ? 'active' : ''}`}
              onClick={() => handleFriendInvitationTab()}
            >
              Lời mời đã gửi
            </Button>
            <Button
              type="button" 
              className={`button-link button-header ${tab === 'friendRequest' ? 'active' : ''}`}
              onClick={() => handleFriendRequest()}
            >
              Lời mời kết bạn
            </Button>
          </div>
          )
          : null
      }
      <div>
        {
          tab === 'friend' && (
            <Row className="m-0">
              {
                friends.map((user) => (
                  <FriendProfileItem 
                    key={user._id} 
                    data={user} 
                    addFriendClick={() => addFriend(user._id)}
                    cancelFriendClick={() => cancelingAddFriend(user._id)}
                    acceptFriendClick={() => acceptFriend(user._id)}
                    declinedFriendClick={() => declinedFriend(user._id)}
                    removeFriendClick={() => removeFriend(user._id)}
                  />
                ))
              }
            </Row>
          )
        }
        {
          tab === 'friendInvitation' && (
            <Row className="m-0">
              {
                friendsInvitation.map((user) => (
                  <FriendProfileItem 
                    key={user._id} 
                    data={user} 
                    addFriendClick={() => addFriend(user._id)}
                    cancelFriendClick={() => cancelingAddFriend(user._id)}
                    acceptFriendClick={() => acceptFriend(user._id)}
                    declinedFriendClick={() => declinedFriend(user._id)}
                    removeFriendClick={() => removeFriend(user._id)}
                  />
                ))
              }
            </Row>
          )
        }
        {
          tab === 'friendRequest' && (
            <Row className="m-0">
              {
                friendsRequest.map((user) => (
                  <FriendProfileItem 
                    key={user._id} 
                    data={user} 
                    addFriendClick={() => addFriend(user._id)}
                    cancelFriendClick={() => cancelingAddFriend(user._id)}
                    acceptFriendClick={() => acceptFriend(user._id)}
                    declinedFriendClick={() => declinedFriend(user._id)}
                    removeFriendClick={() => removeFriend(user._id)}
                  />
                ))
              }
            </Row>
          )
        }
      </div>
    </div>
  </div>
  );
};

export default withProfileContainer({ Content: ProfilePage });