import React, { useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';

import { submitSignup, initialSignup } from '../../redux/actions';
import userInputText from '../../customHooks/userInputText';
import InputAuth from '../../components/form/InputAuth';
import withAuthContainer from '../../hocs/AuthContainer';

const SignupForm = () => {
  const isLoading = useSelector((state) => state.signup.isLoading);
  const isShowError = useSelector((state) => state.signup.isShowError);
  const errorMessage = useSelector((state) => state.signup.errorMessage);
  const isErrorUsername = useSelector((state) => state.signup.isErrorUsername);
  const errorMessageUsername = useSelector((state) => state.signup.errorMessageUsername);
  const isErrorEmail = useSelector((state) => state.signup.isErrorEmail);
  const errorMessageEmail = useSelector((state) => state.signup.errorMessageEmail);
  const isErrorPassword = useSelector((state) => state.signup.isErrorPassword);
  const errorMessagePassword = useSelector((state) => state.signup.errorMessagePassword);
  const isErrorConfirmPassword = useSelector((state) => state.signup.isErrorConfirmPassword);
  const errorMessageConfirmPassword = useSelector((state) => state.signup.errorMessageConfirmPassword);
  const signupDispatch = useDispatch();

  const useEmail = userInputText('');
  const useUsername = userInputText('');
  const usePassword = userInputText('');
  const useConfirmPassword = userInputText('');

  const onClickSignup = (event) => {
    event.preventDefault();

    signupDispatch(submitSignup({
      userName: useUsername.value,
      email: useEmail.value,
      password: usePassword.value,
      confirmPassword: useConfirmPassword.value,
    }));
  };

  useEffect(() => () => {
    signupDispatch(initialSignup());
  }, []);

  return (
    <Col xl={10} lg={10} md={9} sm={8}>
      <Alert variant="danger" show={isShowError}>
        {errorMessage}
      </Alert>
      <Form onSubmit={onClickSignup}>
        <InputAuth
          isShowError={isErrorUsername}
          type="text"
          messageError={errorMessageUsername}
          placeholder="User Name"
          {...useUsername}
        />
        <InputAuth
          isShowError={isErrorEmail}
          type="email"
          messageError={errorMessageEmail}
          placeholder="Email"
          {...useEmail}
        />
        <InputAuth
          isShowError={isErrorPassword}
          type="password"
          messageError={errorMessagePassword}
          placeholder="Password"
          {...usePassword}
        />
        <InputAuth
          isShowError={isErrorConfirmPassword}
          type="password"
          messageError={errorMessageConfirmPassword}
          placeholder="Confirm Password"
          {...useConfirmPassword}
        />
        <Form.Group>
          <Button variant="primary" type="submit" size="lg" block>
            {
              !isLoading
                ? 'Sign Up'
                : <Spinner animation="border" variant="light" size="md" />
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