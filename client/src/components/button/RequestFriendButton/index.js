import React from 'react';
import { 
  Button,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';

import './style.scss';

const RequestFriendButton = ({ ...props }) => (
  <Dropdown className="dropdown-wrapper">
    <Dropdown.Toggle 
      variant="success" 
      id="dropdown-basic"
      className="button-dropdown"
    >
      Đã gửi lời mời
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu-wrapper">
      <Dropdown.Item {...props}>
        Hủy lời mời
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default RequestFriendButton;