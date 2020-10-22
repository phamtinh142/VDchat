import React from 'react';
import { 
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import './style.scss';
import { TopBar } from '../../components/layout';

const withHomeContainer = (component) => () => {
  const { Content, SidebarLeft, SidebarRight } = component;

  return (
    <Container fluid className="main-container p-0">
      <TopBar />
      <Row className="m-0">
        {
          SidebarLeft && (
            <Col className="sidebar-left p-0">
              <SidebarLeft />
            </Col>
          )
        }
        <Col className="p-0">
          <Content />
        </Col>
        {
          SidebarRight && (
            <Col className="siderbar-right p-0">
              <SidebarRight />
            </Col>
          )
        }
      </Row>
    </Container>
  );
};

export default withHomeContainer;