import React, { useState } from 'react';
import {
  Nav,
  Form,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { URL_BASE } from '../../../networking/urls';
import { updateProfileRequest } from '../../../redux/actions';
import './style.scss';

const HeaderProfile = () => {
  const url = window.location.pathname;
  const _id = useSelector((state) => state.myProfile.userInfo._id);
  const userName = useSelector((state) => state.myProfile.userInfo.userName);
  const avatar = useSelector((state) => state.myProfile.userInfo.avatar);
  const description = useSelector((state) => state.myProfile.userInfo.description);

  const [isShowEditDescription, setIsShowEditDescription] = useState(false);
  const [descriptionTemp, setDescriptionTemp] = useState(description);
  const dispatch = useDispatch();

  const toggleDescriptionForm = (status) => {
    setIsShowEditDescription(status);
  };

  const saveDescription = () => {
    dispatch(updateProfileRequest({ description: descriptionTemp }));
    return setIsShowEditDescription(false);
  };

  return (
    <div className="profile__header">
      <div className="profile__header__cover">
        <div className="profile__header__cover-wrapper">
          <img src="/images/default-cover.jpg" alt="cover" />
        </div>
        <div className="profile__header__cover-avatar">
          <img src={URL_BASE + avatar} alt="avatar" />
        </div>
        <div className="profile__header__cover-upload" />
      </div>
      <div className="profile__header__content">
        <h1 className="profile-name">
          {userName}
        </h1>
        {
          !isShowEditDescription
            ? (
              <div className="profile-description">
                <span className="description">
                  {description}
                </span>
                <button
                  type="button"
                  className="change-description"
                  onClick={() => toggleDescriptionForm(true)}
                >
                  <AiFillEdit size="14px" />
                </button>
              </div>
            )
            : (
              <Form className="description-form">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control 
                    as="textarea" 
                    placeholder="Mô tả về bạn ..." 
                    className="description-input"
                    value={descriptionTemp}
                    onChange={(event) => setDescriptionTemp(event.target.value)}
                  />
                  <Form.Text className="text-right helper-discription">
                    Tối đa 100 ký tự
                  </Form.Text>
                </Form.Group>
                <div className="group-button">
                  <Button 
                    variant="success" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => saveDescription()}
                  >
                    Lưu thay đổi
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => toggleDescriptionForm(false)}
                  >
                    Hủy
                  </Button>
                </div>
              </Form>
            )
        }
      </div>
      <div className="profile__header__nav">
        <Nav>
          <Nav.Item>
            <Link 
              to={`/${_id}/profile`} 
              className={`nav-link ${url.search('profile') > 0 ? 'active' : ''}`}
            >
              Giới thiệu
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link 
              to={`/${_id}/friends`} 
              className={`nav-link ${url.search('friends') > 0 ? 'active' : ''}`}
            >
              Bạn bè
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
};

export default HeaderProfile;