import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';

const LoginPage = () => (
  <Container fluid>
    <Row className="justify-content-center login">
      <Col xl={3} lg={4} md={6} sm={10}>
        <Row className="justify-content-center">
          <img src="/logo-vdchat.png" width={200} alt="Logo" />
        </Row>
        <Form>
          <Form.Group>
            <Form.Control type="email" placeholder="Enter Email" />
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" id="remember-me" label="Remember me" />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" block>
              Login
            </Button>
          </Form.Group>
        </Form>
        <Col className="p-0 justify-content-sm-center">
          <span className="text-center ml-auto mr-auto">
            Don't have an account yet?
          </span>
          <Link to="/signup" className="text-decoration-none">
            <Button variant="primary" block>
              Create account
            </Button>
          </Link>
        </Col>
      </Col>
    </Row>
  </Container>
);

export default LoginPage;