import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
  acceptFriendRequest,
  declinedFriendRequest,
} from '../../../redux/actions';
import './style.scss';
import RequestFriendItem from '../../itemList/RequestFriendItem';

const FriendDialogHeader = React.forwardRef(({ isShow, data }, ref) => {
  const requestFriendDispatch = useDispatch();
  const onClickAcceptFriendRequest = (userID) => {
    requestFriendDispatch(acceptFriendRequest(userID));
  };

  const onClickDeleteFriendRequest = (userID) => {
    requestFriendDispatch(declinedFriendRequest(userID));
  };

  console.log('------- data ------- FriendDialogHeader');
  console.log(data);
  console.log('------- data ------- FriendDialogHeader');

  return (
    <>
      {
        isShow && (
          <div className="dialog-header__friend" ref={ref}>
            <div className="friend__header">
              <span className="friend__header--title">Lời mời kết bạn</span>
              <span className="friend__header--count">{data.length}</span>
            </div>
            <div className="friend__list">
              {
                data.map((element) => (
                  <RequestFriendItem 
                    key={element._id}
                    data={element}
                    acceptFriendRequest={() => onClickAcceptFriendRequest(element._id)}
                    deleteFriendRequest={() => onClickDeleteFriendRequest(element._id)}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </>
  );
});

FriendDialogHeader.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
};

FriendDialogHeader.defaultProps = {
  isShow: false,
  data: [],
};

export default FriendDialogHeader;