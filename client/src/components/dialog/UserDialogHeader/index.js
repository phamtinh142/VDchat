import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';
import LogoutIcon from '../../../assets/icons/logout.svg';
import { URL_BASE } from '../../../networking/urls';

const UserDialogHeader = React.forwardRef(({ isShow, data }, ref) => (
  <>
    {
        isShow && (
          <div className="dialog-header__user" ref={ref}>
            <div className="profile">
              <img src={URL_BASE + data.avatar} alt="avatar" className="profile__avatar" />
              <span className="profile__username">
                {data.userName}
              </span>
              <Link className="profile__profile-url" to="/profile">Trang cá nhân</Link>
            </div>
            <div className="option">
              <ul className="nav">
                <li className="nav-item w-100">
                  <Link className="option__item" to="/">
                    <img src={LogoutIcon} className="option__icon" alt="icon" />
                    <span className="option__title">Đăng xuất</span>
                  </Link>
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
};

UserDialogHeader.defaultProps = {
  isShow: false,
  data: {
    _id: '',
    userName: '',
    avatar: '',
  },
};

export default UserDialogHeader;