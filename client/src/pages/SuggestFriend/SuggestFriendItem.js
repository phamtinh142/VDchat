import React from 'react';
import {
  Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';

import { URL_BASE } from '../../networking/urls';
import { 
  AddFriendButton,
  ConfirmFriendButton,
  RequestFriendButton,
  MyFriendButton,
} from '../../components/button';

const SuggestFriendItem = ({
  data, addFriendClick, cancelFriendClick, acceptFriendClick, 
}) => {
  const handleButton = () => {
    if (data.statusFriend === 0) {
      return <AddFriendButton onClick={addFriendClick} />;
    }
    if (data.statusFriend === 1) {
      return <RequestFriendButton onClick={cancelFriendClick} />;
    }
    if (data.statusFriend === 2) {
      return <ConfirmFriendButton onClick={acceptFriendClick} />;
    }
    if (data.statusFriend === 3) {
      return <MyFriendButton />;
    }
    return null;
  };

  return (
    <Col xl={3} lg={4} md={6} sm={12} className="item-list-background">
      <div className="content">
        <Link 
          to="/" 
          className="avatar" 
          style={{ backgroundImage: `url(${URL_BASE}${data.avatar})` }}
        />
        <Link to="/" className="text-decoration-none">
          <div className="username">{data.userName}</div>
        </Link>
        {/* <div className="mutual-friends text-secondary">
          <FaUserFriends />
          <span>1</span>
          <span>bạn chung</span>
        </div> */}
        <div className="button-container">
          {handleButton()}
        </div>
      </div>
    </Col>
  );
};

SuggestFriendItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    userName: PropTypes.string,
    avatar: PropTypes.string,
    statusFriend: PropTypes.number,
  }),
  addFriendClick: PropTypes.func,
  cancelFriendClick: PropTypes.func,
  acceptFriendClick: PropTypes.func,
};

SuggestFriendItem.defaultProps = {
  data: {
    _id: '',
    userName: '',
    avatar: '',
    statusFriend: 0,
  },
  addFriendClick: null,
  cancelFriendClick: null,
  acceptFriendClick: null,
};

export default SuggestFriendItem;