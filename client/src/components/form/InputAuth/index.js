import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputAuth = (props) => {
  const { isShowError, messageError, ...inputProps } = props;
  return (
    <Form.Group>
      <Form.Control size="lg" {...inputProps} />
      {
        isShowError
          ? (
            <Form.Text className="text-danger">
              {messageError}
            </Form.Text>
          )
          : null
      }
    </Form.Group>
  );
};

InputAuth.defaultProps = {
  isShowError: false,
  messageError: '',
};

InputAuth.propTypes = {
  isShowError: PropTypes.bool,
  messageError: PropTypes.string,
};

export default InputAuth;