import React from 'react';
import { Container } from 'react-bootstrap';

import './style.scss';
import { TopBar } from '../../components/layout';

const withHomeContainer = (component) => () => {
  const { Content } = component;

  return (
    <Container fluid className="main-container p-0">
      <TopBar />
      <Container fluid className="content-container">
        <Content />
      </Container>
    </Container>
  );
};

export default withHomeContainer;