import React, { useState, useEffect } from 'react';
import {
  ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';
import ExproleIcon from '../../../assets/icons/explore.svg';
import SearchFriendIcon from '../../../assets/icons/search-colorful.svg';

const LeftBarHome = () => {
  const EXPLORE_TAB = 'explore';
  const FOLLOW_FEED_TAB = 'follow-feed';
  const SUGGEST_FRIEND_TAB = 'suggest-friend';
  const [currentTab, setCurrentTab] = useState('explore');

  useEffect(() => {
    const url = window.location.pathname;
    if (url.search('/suggest-friend') >= 0) {
      return setCurrentTab(SUGGEST_FRIEND_TAB);
    }
    if (url.search('/') >= 0) {
      return setCurrentTab(EXPLORE_TAB);
    }
    if (url.search('/follow') >= 0) {
      return setCurrentTab(FOLLOW_FEED_TAB);
    }
  });

  return (
    <div className="left-bar">
      <div className="header-bar">
        <h3 className="title">
          Trang chủ
        </h3>
        <ListGroup className="border-0 side-menu">
          <Link className="text-decoration-none" to="/">
            <ListGroup.Item className={`border-0 item-menu ${currentTab === EXPLORE_TAB ? 'active' : ''}`}>
              <img className="icon-item" src={ExproleIcon} />
              <span className="title-item">Khám phá</span>
            </ListGroup.Item>
          </Link>
          <Link className="text-decoration-none" to="/suggest-friend">
            <ListGroup.Item className={`border-0 item-menu ${currentTab === SUGGEST_FRIEND_TAB ? 'active' : ''}`}>
              <img className="icon-item" src={SearchFriendIcon} />
              <span className="title-item">Tìm bạn bè</span>
            </ListGroup.Item>
          </Link>
        </ListGroup>
      </div>
    </div>
  );
};

export default LeftBarHome;