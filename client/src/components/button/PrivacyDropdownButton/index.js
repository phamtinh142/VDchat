import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineGlobal, AiFillLock } from 'react-icons/ai';

const PrivacyDropdownButton = ({
  value, onChangeStatus,
}) => {
  const setValuePrivacy = () => {
    if (value === 0) {
      return (
        <div className="d-flex align-items-center">
          <AiOutlineGlobal style={{ marginRight: 3 }} />
          Công khai
        </div>
      );
    }
    if (value === 1) {
      return (
        <div className="d-flex align-items-center">
          <FaUserFriends style={{ marginRight: 3 }} />
          Bạn bè
        </div>
      );
    }
    if (value === 2) {
      return (
        <div className="d-flex align-items-center">
          <AiFillLock style={{ marginRight: 3 }} />
          Chỉ mình tôi
        </div>
      );
    }
    return null;
  };

  return (
    <div className="d-flex align-items-center pb-3">
      Chia sẻ:
      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="d-flex align-items-center dropdown-status-button"
        >
          {setValuePrivacy()}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item 
            onClick={() => onChangeStatus(0)}
          >
            <AiOutlineGlobal style={{ marginRight: 5 }} />
            Công khai
          </Dropdown.Item>
          <Dropdown.Item 
            onClick={() => onChangeStatus(1)}
          >
            <FaUserFriends style={{ marginRight: 5 }} />
            Bạn bè
          </Dropdown.Item>
          <Dropdown.Item 
            onClick={() => onChangeStatus(2)}
          >
            <AiFillLock style={{ marginRight: 5 }} />
            Chỉ mình tôi
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

PrivacyDropdownButton.propTypes = {
  value: PropTypes.number,
  onChangeStatus: PropTypes.func,
};

PrivacyDropdownButton.defaultProps = {
  value: 0,
  onChangeStatus: null,
};

export default PrivacyDropdownButton;