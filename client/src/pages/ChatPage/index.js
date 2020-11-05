import React from 'react';
import { 
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import './style.scss';
import {
  LeftBarChat,
  RightBarChat,
} from '../../components/layout';
import { withHomeContainer } from '../../hocs';

const ChatPage = () => (
  <Container fluid className="main-container p-0">
      <Row className="m-0">
        <Col className="sidebar-left p-0">
          <LeftBarChat />
        </Col>
        <Col className="p-0">
          <div className="container-fruid chat-page" />
        </Col>
        <Col className="siderbar-right p-0">
          <RightBarChat />
        </Col>
      </Row>
  </Container>
);

export default withHomeContainer({ Content: ChatPage });