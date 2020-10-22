import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCheck } from 'react-icons/ai';

import './style.scss';
import { URL_BASE } from '../../../networking/urls';

const RequestFriendsItem = ({
  data, acceptFriendRequest, deleteFriendRequest,
}) => (
  <div className="request-friend__wrapper">
    <div className="request-friend__left">
      <img className="request-friend__avatar" src={URL_BASE + data.avatar} alt="avatar" />
      <span className="request-friend__username">
        {data.userName}
      </span>
    </div>
    <div className="request-friend__right">
      {
        data.status === 0
          ? (
            <>
              <button 
                type="button"
                className="request-friend__button request-friend__button--confirm"
                onClick={acceptFriendRequest}
              >
                Xác nhận
              </button>
              <button 
                type="button"
                className="request-friend__button request-friend__button--remove"
                onClick={deleteFriendRequest}
              >
                Xóa
              </button>
            </>
          )
          : (
            <button
              disabled
              type="button"
              className="request-friend__button request-friend__button--success"
            >
              <AiOutlineCheck size="15px" />
              Bạn bè
            </button>
          )
      }
    </div>
  </div>
);

RequestFriendsItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    userName: PropTypes.string,
    avatar: PropTypes.string,
    status: PropTypes.number,
  }),
  acceptFriendRequest: PropTypes.func,
  deleteFriendRequest: PropTypes.func,
};

RequestFriendsItem.defaultProps = {
  data: {
    _id: '',
    userName: '',
    avatar: '',
    status: 0,
  },
  acceptFriendRequest: null,
  deleteFriendRequest: null,
};

export default RequestFriendsItem;