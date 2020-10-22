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
import LeftBarHome from '../../components/layout/LeftBarHome';
import withHomeContainer from '../../hocs/WithHomeContainer';
import SuggestFriendItem from './SuggestFriendItem';
import {
  initialSuggestFriend,
  getSuggestFriends,
  addNewFriendRequest,
  acceptFriendRequest,
  cancelingFriendRequest,
} from '../../redux/actions';

const SuggestFriend = () => {
  const [searchText, setSearchText] = useState('');

  const users = useSelector((state) => state.suggestFriend.users);
  const suggestFriendDispatch = useDispatch();

  useEffect(() => {
    suggestFriendDispatch(getSuggestFriends(searchText));
    return () => {
      suggestFriendDispatch(initialSuggestFriend());
    };
  }, []);

  const handleChangeSearchInput = (event) => {
    setSearchText(event.target.value);
    return suggestFriendDispatch(getSuggestFriends(event.target.value));
  };

  const onclickAddnewFriend = (userID) => {
    suggestFriendDispatch(addNewFriendRequest(userID));
  };

  const onClickCancelFriendRequest = (userID) => {
    suggestFriendDispatch(cancelingFriendRequest(userID));
  };

  const onClickAcceptFriendRequest = (userID) => {
    suggestFriendDispatch(acceptFriendRequest(userID));
  };
  
  return (
    <div className="suggest-friend-content">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xl={9} lg={10} md={11} sm={12} className="p-0">
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
                  <SuggestFriendItem 
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

export default withHomeContainer({ 
  Content: SuggestFriend, 
  SidebarLeft: LeftBarHome, 
});