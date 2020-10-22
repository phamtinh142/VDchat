import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineCheck } from 'react-icons/ai';

import './style.scss';

const MyFriendButton = ({ ...props }) => (
  <Button
    size="sm" 
    block
    className="btn-my-friend"
    disabled
    {...props}
  >
    <AiOutlineCheck size="20px" />
    Bạn bè
  </Button>
);

export default MyFriendButton;