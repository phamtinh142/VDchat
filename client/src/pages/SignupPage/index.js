import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Alert,
  Spinner,
} from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [toggleAlert, setToggleAlert] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const clickToggleAlert = () => {
    setToggleAlert(!toggleAlert);
  };

  return (
    <Container fluid>
      <Row className="justify-content-sm-center signup">
        <Col xl={3} lg={4} md={6} sm={10}>
          <Row className="justify-content-sm-center">
            <img src="/logo-vdchat.png" width={200} alt="Logo" />
          </Row>
          <Alert variant="danger" show={toggleAlert}>
            Test alert
          </Alert>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Enter User Name" />
              <Form.Text className="text-danger">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control type="email" placeholder="Enter Email" />
              <Form.Text className="text-danger">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Enter Password" />
              <Form.Text className="text-danger">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Confirm Password" />
              <Form.Text className="text-danger">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" block onClick={clickToggleAlert}>
                {
                  !toggleLoading
                    ? 'Sign Up'
                    : <Spinner animation="border" variant="light" size="sm" />
                }
              </Button>
            </Form.Group>
          </Form>
          <Col className="p-0 justify-content-sm-center">
          <span className="text-center ml-auto mr-auto">
            Already have an account?
          </span>
            <Link to="/login" className="text-decoration-none">
              <Button variant="primary" block>
                Login Now
              </Button>
            </Link>
          </Col>
        </Col>
      </Row>
    </Container>
  )
};

export default SignupPage;