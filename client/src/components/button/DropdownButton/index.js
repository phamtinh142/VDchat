import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import './style.scss';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const DropdownCustom = () => (
  <Dropdown>
    <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
      Bạn bè
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Hủy kết bạn</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownCustom;