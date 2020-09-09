import React from 'react';
import {
  Row,
  Col,
  Form,
  Button, Alert, Spinner,
} from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { submitLogin } from '../../redux/actions';
import InputAuth from '../../components/form/InputAuth';
import userInputText from '../../customHooks/userInputText';
import withAuthContainer from '../../hocs/AuthContainer';

const LoginForm = () => {
  const isLoading = useSelector((state) => state.login.isLoading);
  const isShowError = useSelector((state) => state.login.isShowError);
  const messageError = useSelector((state) => state.login.messageError);
  const isErrorEmail = useSelector((state) => state.login.isErrorEmail);
  const messageErrorEmail = useSelector((state) => state.login.messageErrorEmail);
  const isErrorPassword = useSelector((state) => state.login.isErrorPassword);
  const messageErrorPassword = useSelector((state) => state.login.messageErrorPassword);
  const loginDispatch = useDispatch();

  const useEmail = userInputText('');
  const usePassword = userInputText('');

  const onClickLogin = (event) => {
    event.preventDefault();
    loginDispatch(submitLogin({
      email: useEmail.value,
      password: usePassword.value,
    }));
  };
  return (
    <Col xl={10} lg={10} md={9} sm={8}>
      <Alert variant="danger" show={isShowError}>
        {messageError}
      </Alert>
      <Form onSubmit={onClickLogin}>
        <InputAuth
          isShowError={isErrorEmail}
          type="email"
          messageError={messageErrorEmail}
          placeholder="Email"
          {...useEmail}
        />
        <InputAuth
          isShowError={isErrorPassword}
          type="password"
          messageError={messageErrorPassword}
          placeholder="Password"
          {...usePassword}
        />
        <Form.Group className="text-center">
          <Button variant="primary" type="submit" size="lg" className="mb-2" block>
            {
              !isLoading
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