import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineUserAdd } from 'react-icons/ai';

import './style.scss';

const AddFriendButton = ({ ...props }) => (
  <Button
    size="sm" 
    block 
    variant="success"
    className="btn-add-friend"
    {...props}
    
  >
    <AiOutlineUserAdd size="20px" />
    Kết bạn
  </Button>
);

export default AddFriendButton;