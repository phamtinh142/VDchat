import React, { useRef, useState, useEffect } from 'react';
import {
  Nav,
  Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { 
  logout,
  toggleFriendErrorModal,
} from '../../../redux/actions';
import './style.scss';
import { ReactComponent as NotificationIcon } from '../../../assets/icons/notifications.svg';
import { ReactComponent as RequestFriendIcon } from '../../../assets/icons/request-friend.svg';
import { ReactComponent as DropdownIcon } from '../../../assets/icons/ic-dropdown.svg';
import { ReactComponent as ChatDefaultIcon } from '../../../assets/icons/chat-default.svg';
import { ReactComponent as ChatActiveIcon } from '../../../assets/icons/chat-active.svg';
import { ReactComponent as EverybodyDefaultIcon } from '../../../assets/icons/everybody-default.svg';
import { ReactComponent as EverybodyActiveIcon } from '../../../assets/icons/everybody-active.svg';

import {
  UserDialogHeader,
  FriendDialogHeader,
  NotifyDialogHeader,
} from '../../dialog';
import { ErrorModal } from '../../modal';
import { URL_BASE } from '../../../networking/urls';

import useOnClickOutside from '../../../customHooks/useOnclickOutside';

const TopBar = () => {
  const USER_DIALOG = 'USER_DIALOG';
  const FRIEND_DIALOG = 'FRIEND_DIALOG';
  const NOTIFY_DIALOG = 'NOTIFY_DIALOG';

  const ref = useRef();
  const [currentTab, setCurrentTab] = useState('home');
  const [isShowUserDialog, setIsShowUserDialog] = useState(false);
  const [isShowNotifyDialog, setIsShowNotifyDialog] = useState(false);
  const [isShowFriendDialog, setIsShowFriendDialog] = useState(false);
  const dispatch = useDispatch();

  const friendsRequest = useSelector((state) => state.myFriends.friendsRequest);
  const infoUser = useSelector((state) => state.myProfile.myProfile);
  const isShowError = useSelector((state) => state.myFriends.isShowError);
  const messageError = useSelector((state) => state.myFriends.messageError);

  useEffect(() => {
    const url = window.location.pathname;
    if (url.search('/everybody') < 0) {
      return setCurrentTab('chat');
    }
    return setCurrentTab('everybody');
  });

  const toggleDialog = (dialog) => {
    switch (dialog) {
      case USER_DIALOG:
        setIsShowUserDialog(!isShowUserDialog);
        setIsShowFriendDialog(false);
        setIsShowNotifyDialog(false);
        break;
      case FRIEND_DIALOG:
        setIsShowUserDialog(false);
        setIsShowFriendDialog(!isShowFriendDialog);
        setIsShowNotifyDialog(false);
        break;
      case NOTIFY_DIALOG:
        setIsShowUserDialog(false);
        setIsShowFriendDialog(false);
        setIsShowNotifyDialog(!isShowNotifyDialog);
        break;
      default:
        break;
    }
  };

  useOnClickOutside(ref, () => {
    if (isShowFriendDialog) {
      setIsShowFriendDialog(false);
    }
    if (isShowNotifyDialog) {
      setIsShowNotifyDialog(false);
    }
    if (isShowUserDialog) {
      setIsShowUserDialog(false);
    }
  });

  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <Container fluid className="header">
      <div className="d-flex justify-content-between align-items-center header__wrapper">
        <div className="header__left">
          <Link to="/">
            <img src="/logo200.png" className="header__logo" alt="logo" />
          </Link>
        </div>
        <Nav className="justify-content-center header__nav-center">
          <Nav.Item>
            <Link className="text-decoration-none header__item-center" to="/">
              {
                currentTab === 'chat'
                  ? <ChatActiveIcon />
                  : <ChatDefaultIcon />
              }
              <span className={`header__title ${currentTab === 'chat' ? 'active' : ''}`}>
                Tin nhắn
              </span>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="text-decoration-none header__item-center" to="/everybody">
              {
                currentTab === 'everybody'
                  ? <EverybodyActiveIcon />
                  : <EverybodyDefaultIcon />
              }
              <span className={`header__title ${currentTab === 'everybody' ? 'active' : ''}`}>
                Mọi người
              </span>
            </Link>
          </Nav.Item>
        </Nav>
        {
          infoUser 
            ? (
              <div className="header__right">
                <Nav className="justify-content-end">
                  <Nav.Item className="header__item-right" onClick={() => toggleDialog(FRIEND_DIALOG)}>
                    <RequestFriendIcon />
                    <FriendDialogHeader 
                      isShow={isShowFriendDialog} 
                      ref={ref} 
                      data={friendsRequest}
                    />
                  </Nav.Item>
                  <Nav.Item className="header__item-right" onClick={() => toggleDialog(NOTIFY_DIALOG)}>
                    <NotificationIcon />
                    <NotifyDialogHeader 
                      isShow={isShowNotifyDialog} 
                      ref={ref}
                    />
                  </Nav.Item>
                  <Nav.Item className="header__item-right" onClick={() => toggleDialog(USER_DIALOG)}>
                    <div className="item-right__profile">
                      <img src={URL_BASE + infoUser.avatar} className="profile__avatar" alt="avatar" />
                      <span className="profile__user-name">
                        {infoUser.userName}
                      </span>
                      <DropdownIcon />
                    </div>
                    <UserDialogHeader 
                      isShow={isShowUserDialog}
                      ref={ref} 
                      data={infoUser}
                      logout={onClickLogout}
                    />
                  </Nav.Item>
                </Nav>
              </div>
            )
            : null
          }
      </div>
      <ErrorModal 
        isShow={isShowError}
        message={messageError}
        onHide={() => dispatch(toggleFriendErrorModal(false))}
      />
    </Container>
  );
};

export default TopBar;