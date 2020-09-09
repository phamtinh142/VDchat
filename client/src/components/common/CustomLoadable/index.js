import React from 'react';
import {
  Row,
} from 'react-bootstrap';
import Loadable from 'react-loadable';

const Spinner = () => (
  <Row className="justify-content-center mt-5">
    <div className="spinner-border text-primary" />
  </Row>
);

const CustomLoadable = (opt) => Loadable(
  {
    loading: Spinner,
    delay: 5000,
    timeOut: 10000,
    ...opt,
  },
);

export default CustomLoadable;