import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineUserAdd } from 'react-icons/ai';

import './style.scss';

const ConfirmFriendButton = ({ ...props }) => (
  <Button
    size="sm" 
    block
    variant="success"
    className="btn-confirm-friend"
    {...props}
  >
    <AiOutlineUserAdd size="20px" />
    Chấp nhận lời mời
  </Button>
);

export default ConfirmFriendButton;