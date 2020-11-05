import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './style.scss';
import LogoutIcon from '../../../assets/icons/logout.svg';
import { URL_BASE } from '../../../networking/urls';

const UserDialogHeader = React.forwardRef(({ isShow, data, logout }, ref) => (
  <>
    {
        isShow && (
          <div className="dialog-header__user" ref={ref}>
            <div className="profile">
              <img src={URL_BASE + data.avatar} alt="avatar" className="profile__avatar" />
              <span className="profile__username">
                {data.userName}
              </span>
              <Link 
                className="profile__profile-url" 
                to={`/${data._id}/profile`}
              >
                Trang cá nhân
              </Link>
            </div>
            <div className="option">
              <ul className="nav">
                <li className="nav-item w-100">
                  <button 
                    type="button" 
                    className="button-link"
                    onClick={logout}
                  >
                    <img src={LogoutIcon} className="option__icon" alt="icon" />
                    <span className="option__title">Đăng xuất</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )
      }
  </>
));

UserDialogHeader.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    _id: PropTypes.string,
    userName: PropTypes.string,
    avatar: PropTypes.string,
  }),
  logout: PropTypes.func,
};

UserDialogHeader.defaultProps = {
  isShow: false,
  data: {
    _id: '',
    userName: '',
    avatar: '',
  },
  logout: null,
};

export default UserDialogHeader;