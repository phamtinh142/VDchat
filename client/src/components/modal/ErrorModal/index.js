import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import './style.scss';

const ErrorModal = ({ isShow, message, onHide }) => (
  <Modal
    size="sm"
    show={isShow}
    onHide={onHide}
    centered
  >
      <Modal.Header closeButton>
        <Modal.Title>
          Xảy ra lỗi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>{message}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="success"
          size="sm"
          onClick={onHide}
        >
          Close
        </Button>
      </Modal.Footer>
  </Modal>
);

ErrorModal.propTypes = {
  isShow: PropTypes.bool,
  message: PropTypes.string,
  onHide: PropTypes.func,
};

ErrorModal.defaultProps = {
  isShow: false,
  message: '',
  onHide: PropTypes.func,
};

export default ErrorModal;