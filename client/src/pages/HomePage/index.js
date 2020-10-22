import React from 'react';

import './style.scss';
import LeftBarHome from '../../components/layout/LeftBarHome';
import RightBarHome from '../../components/layout/RightBarHome';
import withHomeContainer from '../../hocs/WithHomeContainer';

const HomePage = () => (
  <div className="container-fruid home-page" />
);

export default withHomeContainer({ Content: HomePage, SidebarLeft: LeftBarHome, SidebarRight: RightBarHome });