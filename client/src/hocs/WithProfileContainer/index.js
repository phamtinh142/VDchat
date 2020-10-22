import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import './style.scss';
import {
  TopBar,
  HeaderProfile,
} from '../../components/layout';

const withProfileContainer = (component) => () => {
  const { Content } = component;

  return (
    <Container fluid className="main-container p-0">
      <TopBar />
      <Row className="m-0">
        <Col className="p-0">
          <div className="profile-page">
            <Container fluid className="d-flex justify-content-center">
              <Col xl={7} lg={10} md={11} sm={12}>
                <div className="profile">
                  <HeaderProfile />
                  <Content />
                </div>
              </Col>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withProfileContainer;