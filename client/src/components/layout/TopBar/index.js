import React, { useRef, useState, useEffect } from 'react';
import {
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  useSelector,
} from 'react-redux';

import './style.scss';
import HomeIconDefault from '../../../assets/icons/home-default.svg';
import HomeIconActive from '../../../assets/icons/home-active.svg';
import ChatIconDefault from '../../../assets/icons/chat-default.svg';
import ChatIconActive from '../../../assets/icons/chat-active.svg';
import NotificationIcon from '../../../assets/icons/notifications.svg';
import RequestFriendIcon from '../../../assets/icons/request-friend.svg';
import DropdownIcon from '../../../assets/icons/ic-dropdown.svg';

import {
  UserDialogHeader,
  FriendDialogHeader,
  NotifyDialogHeader,
} from '../../dialog';
import { URL_BASE } from '../../../networking/urls';

import useOnClickOutside from '../../../customHooks/useOnclickOutside';

const TopBar = () => {
  const USER_DIALOG = 'USER_DIALOG';
  const FRIEND_DIALOG = 'FRIEND_DIALOG';
  const NOTIFY_DIALOG = 'NOTIFY_DIALOG';
  const HOME_TAB = 'home';
  const CHAT_TAB = 'chat';

  const ref = useRef();
  const [currentTab, setCurrentTab] = useState('home');
  const [isShowUserDialog, setIsShowUserDialog] = useState(false);
  const [isShowNotifyDialog, setIsShowNotifyDialog] = useState(false);
  const [isShowFriendDialog, setIsShowFriendDialog] = useState(false);

  const requestFriend = useSelector((state) => state.privateRouter.requestFriend);
  const infoUser = useSelector((state) => state.privateRouter.infoUser);

  useEffect(() => {
    const url = window.location.pathname;
    if (url.search('/chat') < 0) {
      return setCurrentTab('home');
    }
    return setCurrentTab('chat');
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

  const isActiveHomeTab = {
    icon: currentTab === HOME_TAB ? HomeIconActive : HomeIconDefault,
    border: currentTab === HOME_TAB ? 'active' : '',
    color: currentTab === HOME_TAB ? 'active' : '',
  };

  const isActiveChatTab = {
    icon: currentTab === CHAT_TAB ? ChatIconActive : ChatIconDefault,
    border: currentTab === CHAT_TAB ? 'active' : '',
    color: currentTab === CHAT_TAB ? 'active' : '',
  };

  return (
    <Container fluid className="header">
      <Row className="header__wrapper">
        <Col sm={3} md={4} className="header__left">
          <Link to="/">
            <img src="/logo200.png" className="header__logo" alt="logo" />
          </Link>
        </Col>

        <Col sm={6} md={4} className="header__center">
          <Nav className="justify-content-center header__nav-center">
            <Nav.Item>
              <Link className={`text-decoration-none header__item-center ${isActiveHomeTab.border}`} to="/">
                <img src={isActiveHomeTab.icon} alt="Home" />
                <span className={`header__title ${isActiveHomeTab.color}`}>Trang chủ</span>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className={`text-decoration-none header__item-center ${isActiveChatTab.border}`} to="/chat">
                <img src={isActiveChatTab.icon} alt="Title" />
                <span className={`header__title ${isActiveChatTab.color}`}>Tin nhắn</span>
              </Link>
            </Nav.Item>
          </Nav>
        </Col>
        {
            infoUser 
              ? (
                <Col sm={3} md={4} className="header__right">
                  <Nav className="justify-content-end">
                    <Nav.Item className="header__item-right" onClick={() => toggleDialog(FRIEND_DIALOG)}>
                      <img src={RequestFriendIcon} alt="request friends" />
                    </Nav.Item>
                    <Nav.Item className="header__item-right" onClick={() => toggleDialog(NOTIFY_DIALOG)}>
                      <img src={NotificationIcon} alt="notification" />
                    </Nav.Item>
                    <Nav.Item className="header__item-right" onClick={() => toggleDialog(USER_DIALOG)}>
                      <div className="item-right__profile">
                        <img src={URL_BASE + infoUser.avatar} className="profile__avatar" alt="avatar" />
                        <span className="profile__user-name">
                          {infoUser.userName}
                        </span>
                        <img src={DropdownIcon} alt="dropdown icon" />
                      </div>
                    </Nav.Item>
                  </Nav>
                  <UserDialogHeader 
                    isShow={isShowUserDialog}
                    ref={ref} 
                    data={infoUser}
                  />
                  <NotifyDialogHeader isShow={isShowNotifyDialog} ref={ref} />
                  <FriendDialogHeader 
                    isShow={isShowFriendDialog} 
                    ref={ref} 
                    data={requestFriend}
                  />
                </Col>
              )
              : null
          }
      </Row>
    </Container>
  );
};

export default TopBar;