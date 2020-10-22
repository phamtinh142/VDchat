import React, { useState } from 'react';
import {
  Nav,
  Form,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';

const HeaderProfile = () => {
  const [isShowDescriptionForm, setIsShowDescriptionForm] = useState(false);

  const toggleDescriptionForm = (status) => {
    setIsShowDescriptionForm(status);
  };
  return (
    <div className="profile__header">
      <div className="profile__header__cover">
        <div className="profile__header__cover-wrapper">
          <img src="/images/default-cover.jpg" alt="cover" />
        </div>
        <div className="profile__header__cover-avatar">
          <img src="/images/avatar-test.jpeg" alt="avatar" />
        </div>
        <div className="profile__header__cover-upload" />
      </div>
      <div className="profile__header__content">
        <h1 className="profile-name">User Name</h1>
        {
          !isShowDescriptionForm
            ? (
              <div className="profile-description">
                <span className="description">Mô tả ngắn về bản thân</span>
                <button
                  type="button"
                  className="change-description"
                  onClick={() => toggleDescriptionForm(true)}
                >
                  Thêm mô tả
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
                  />
                  <Form.Text className="text-right helper-discription">
                    Tối đa 100 ký tự
                  </Form.Text>
                </Form.Group>
                <div className="group-button">
                  <Button variant="success" size="sm" className="mr-2">
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
            <Link to="/" className="nav-link active">Dòng thời gian</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/" className="nav-link">Giới thiệu</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/" className="nav-link">Bạn bè</Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
};

export default HeaderProfile;