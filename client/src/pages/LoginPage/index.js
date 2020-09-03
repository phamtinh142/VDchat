import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button, Alert, Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';
import InputAuth from '../../components/form/InputAuth';
import userInputText from '../../customHooks/userInputText';
import withAuthContainer from '../../hocs/AuthContainer';

const LoginForm = () => {
  const [toggleLoading, setToggleLoading] = useState(false);
  const useEmail = userInputText('');
  const usePassword = userInputText('');

  const submitLogin = (event) => {
    event.preventDefault();
    setToggleLoading(!toggleLoading);
    console.log({
      email: useEmail.value,
      password: usePassword.value,
    });
  };
  return (
    <Col xl={10} lg={10} md={9} sm={8}>
      <Alert variant="danger" show={false}>
        Test alert
      </Alert>
      <Form onSubmit={submitLogin}>
        <InputAuth
          isShowError={true}
          type="email"
          messageError="We'll never share your email with anyone else"
          placeholder="Email"
          {...useEmail}
        />
        <InputAuth
          isShowError={true}
          type="password"
          messageError="We'll never share your email with anyone else"
          placeholder="Password"
          {...usePassword}
        />
        <Form.Group className="text-center">
          <Button variant="primary" type="submit" size="lg" className="mb-2" block>
            {
              !toggleLoading
                ? 'Login'
                : <Spinner animation="border" variant="light" size="sm" />
            }
          </Button>
          <Link to="/login" className="text-decoration-none">
            <span>Forgot password?</span>
          </Link>
        </Form.Group>
      </Form>
      <Row className="justify-content-sm-center border-top pt-3">
        <Link to="/signup" className="text-decoration-none">
          <Button variant="success" size="lg">
            Create account
          </Button>
        </Link>
      </Row>
    </Col>
  );
};

const LoginPage = withAuthContainer(LoginForm);

export default LoginPage;