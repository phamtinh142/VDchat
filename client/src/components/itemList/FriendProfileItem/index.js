import React from 'react';
import {
  Col,
  Dropdown,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineCheck, AiOutlineUserAdd } from 'react-icons/ai';

import './style.scss';
import { URL_BASE } from '../../../networking/urls';

const FriendProfileItem = ({
  data, 
  cancelFriendClick, 
  acceptFriendClick, 
  declinedFriendClick,
  removeFriendClick,
  addFriendClick,
}) => {
  console.log('------- data ------- FriendProfileItem');
  console.log(data);
  console.log('------- data ------- FriendProfileItem');
  const handleButton = () => {
    if (data.statusFriend === 'addFriend') {
      return (
        <Button
          size="sm"
          variant="success"
          onClick={addFriendClick}
        >
          <AiOutlineUserAdd size="20px" />
          Kết bạn
        </Button>
      );
    }
    if (data.statusFriend === 'friend') {
      return (
        <Dropdown>
          <Dropdown.Toggle 
            variant="secondary" 
            id="dropdown-basic"
            size="sm"
            className="my-dropdown-button"
          >
            <AiOutlineCheck size="20px" />
            Bạn bè
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={removeFriendClick}
            >
              Hủy kết bạn
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    if (data.statusFriend === 'friendInvitation') {
      return (
        <Dropdown>
          <Dropdown.Toggle 
            variant="secondary" 
            size="sm"
            className="my-dropdown-button"
          >
            Đã gửi lời mời
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={cancelFriendClick}
            >
              Hủy lời mời
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    if (data.statusFriend === 'friendRequest') {
      return (
        <div className="d-flex align-items-center">
          <Button
            size="sm"
            className="mr-1"
            variant="success"
            onClick={acceptFriendClick}
          >
            <AiOutlineUserAdd size="20px" />
            Chấp nhận
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={declinedFriendClick}
          >
            Xóa
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <Col sm={6} className="px-1">
      <div className="d-flex justify-content-between align-items-center friend-item">
        <Link 
          to={`/${data._id}/profile`}
          className="d-flex align-items-center text-decoration-none"
        >
          <img src={URL_BASE + data.avatar} className="friend-avatar" alt="avatar" />
          <div className="info-friend">
            <div className="friend-user-name">
              <span>
                {data.userName}
              </span>
            </div>
          </div>
        </Link>
        {handleButton()}
      </div>
    </Col>
  );
};

FriendProfileItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    userName: PropTypes.string,
    avatar: PropTypes.string,
    statusFriend: PropTypes.string,
  }),
  declinedFriendClick: PropTypes.func,
  cancelFriendClick: PropTypes.func,
  acceptFriendClick: PropTypes.func,
  removeFriendClick: PropTypes.func,
  addFriendClick: PropTypes.func,
};

FriendProfileItem.defaultProps = {
  data: {
    _id: '',
    userName: '',
    avatar: '',
    statusFriend: '',
  },
  declinedFriendClick: null,
  cancelFriendClick: null,
  acceptFriendClick: null,
  removeFriendClick: null,
  addFriendClick: null,
};

export default FriendProfileItem;