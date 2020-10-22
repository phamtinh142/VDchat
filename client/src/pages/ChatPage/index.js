import React from 'react';

import './style.scss';
import LeftBarChat from '../../components/layout/LeftBarChat';
import RightBarChat from '../../components/layout/RightBarChat';
import withHomeContainer from '../../hocs/WithHomeContainer';

const ChatPage = () => (
  <div className="container-fruid chat-page" />
);

export default withHomeContainer({ Content: ChatPage, SidebarLeft: LeftBarChat, SidebarRight: RightBarChat });