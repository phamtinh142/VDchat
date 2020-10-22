import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  Form,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';
import { withProfileContainer } from '../../hocs';

const ProfilePage = () => (
  <div>
    content
  </div>
);

export default withProfileContainer({ Content: ProfilePage });