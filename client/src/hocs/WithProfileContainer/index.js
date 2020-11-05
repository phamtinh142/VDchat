import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import './style.scss';
import {
  TopBar,
  HeaderProfile,
} from '../../components/layout';
import { getInfoUserRequest } from '../../redux/actions';
import { ProfileLoader } from '../../components/ContentLoader';

const withProfileContainer = (component) => () => {
  const { id } = useParams();
  const { Content } = component;
  const isLoading = useSelector((state) => state.myProfile.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoUserRequest(id));
  }, []);

  return (
    <Container fluid className="main-container p-0">
      <TopBar />
      {
        isLoading
          ? (
            <Row className="m-0">
              <Col className="p-0">
                <div className="profile-page">
                  <Container fluid className="d-flex justify-content-center">
                    <Col xl={8} lg={10} md={11} sm={12}>
                      <div className="profile">
                        <HeaderProfile />
                        <Content />
                      </div>
                    </Col>
                  </Container>
                </div>
              </Col>
            </Row>
          )
          : (
            <ProfileLoader />
          )
      }
    </Container>
  );
};

export default withProfileContainer;