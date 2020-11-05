import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
  acceptFriendRequest,
  declinedFriendRequest,
} from '../../../redux/actions';
import './style.scss';
import { FriendRequestItem } from '../../itemList';

const FriendDialogHeader = React.forwardRef(({ isShow, data }, ref) => {
  const dispatch = useDispatch();
  const onClickAcceptFriendRequest = (userID) => {
    dispatch(acceptFriendRequest(userID));
  };

  const onClickDeleteFriendRequest = (userID) => {
    dispatch(declinedFriendRequest(userID));
  };

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
                  <FriendRequestItem 
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