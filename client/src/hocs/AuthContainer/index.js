import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import './style.scss';

const withAuthContain = (WrappedComponent) => {
  const AuthContain = () => (
    <Container fluid>
      <Row className="h-100">
        <Col xl={4} lg={6} md={7} className="mb-5 auth-left">
          <Row className="justify-content-center mt-5">
            <img src="/logo-vdchat.png" width={200} alt="Logo" />
          </Row>
          <Row className="justify-content-center mt-5">
            <WrappedComponent />
          </Row>
        </Col>
        <Col xl={8} lg={6} md={5} className="d-none d-md-block auth-right" />
      </Row>
    </Container>
  );
  return AuthContain;
};

export default withAuthContain;