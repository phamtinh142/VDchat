import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Row,
  Col,
  Container,
} from 'react-bootstrap';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import './style.scss';
import withHomeContainer from '../../hocs/WithHomeContainer';
import { EverybodyItem } from '../../components/itemList';
import {
  getEverybody,
  addNewFriendRequest,
  acceptFriendRequest,
  cancelingFriendRequest,
} from '../../redux/actions';

const EverybodyPage = () => {
  const [searchText, setSearchText] = useState('');

  const users = useSelector((state) => state.everybody.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEverybody(searchText));
  }, []);

  const handleChangeSearchInput = (event) => {
    setSearchText(event.target.value);
    return dispatch(getEverybody(event.target.value));
  };

  const onclickAddnewFriend = (userID) => {
    dispatch(addNewFriendRequest(userID));
  };

  const onClickCancelFriendRequest = (userID) => {
    dispatch(cancelingFriendRequest(userID));
  };

  const onClickAcceptFriendRequest = (userID) => {
    dispatch(acceptFriendRequest(userID));
  };
  
  return (
    <div className="suggest-friend-content">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xl={6} lg={7} md={8} sm={12} className="p-0">
            <div className="header-suggest-friend">
              <h4 className="title">Những người bạn có thể biết</h4>
              <div className="search-friend">
                <FormControl 
                  type="text" 
                  placeholder="Tìm kiếm" 
                  className="input-search" 
                  value={searchText}
                  onChange={handleChangeSearchInput}
                />
              </div>
            </div>
            <Row className="friend-list">
              {
                users && users.map((element) => (
                  <EverybodyItem 
                    key={element._id} 
                    data={element} 
                    addFriendClick={() => onclickAddnewFriend(element._id)}
                    cancelFriendClick={() => onClickCancelFriendRequest(element._id)}
                    acceptFriendClick={() => onClickAcceptFriendRequest(element._id)}
                  />
                ))
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withHomeContainer({ Content: EverybodyPage });