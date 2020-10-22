import React from 'react';
import { Container } from 'react-bootstrap';

import TopBar from '../../components/layout/TopBar';

const withPageContainer = (WrappedComponent) => {
  const PageContainer = () => (
    <Container fluid className="p-0">
      <TopBar />
      <WrappedComponent />
    </Container>
  );  
  return PageContainer;
};

export default withPageContainer;