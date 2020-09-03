import React, { useState } from 'react';
import {
  Button,
  Row,
  Col,
  Form,
  Alert,
  Spinner,
} from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';

import userInputText from '../../customHooks/userInputText';
import InputAuth from '../../components/form/InputAuth';
import withAuthContainer from '../../hocs/AuthContainer';

const SignupForm = () => {
  const [toggleLoading, setToggleLoading] = useState(false);
  const useEmail = userInputText('');
  const useUsername = userInputText('');
  const usePassword = userInputText('');
  const useConfirmPassword = userInputText('');

  const submitSignup = (event) => {
    event.preventDefault();
    setToggleLoading(!toggleLoading);
    console.log({
      username: useUsername.value,
      email: useEmail.value,
      password: usePassword.value,
      confirmPassword: useConfirmPassword.value,
    });
  };

  return (
    <Col xl={10} lg={10} md={9} sm={8}>
      <Alert variant="danger" show={false}>
        Test alert
      </Alert>
      <Form onSubmit={submitSignup}>
        <InputAuth
          isShowError={true}
          type="text"
          messageError="We'll never share your email with anyone else"
          placeholder="User Name"
          {...useUsername}
        />
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
        <InputAuth
          isShowError={true}
          type="password"
          messageError="We'll never share your email with anyone else"
          placeholder="Confirm Password"
          {...useConfirmPassword}
        />
        <Form.Group>
          <Button variant="primary" type="submit" size="lg" block>
            {
              !toggleLoading
                ? 'Sign Up'
                : <Spinner animation="border" variant="light" size="sm" />
            }
          </Button>
        </Form.Group>
      </Form>
      <Row className="justify-content-sm-center border-top pt-3">
        <Link to="/login" className="text-decoration-none">
          <Button variant="success" size="lg">
            Login Now
          </Button>
        </Link>
      </Row>
    </Col>
  );
};

const SignupPage = withAuthContainer(SignupForm);

export default SignupPage;