import React from 'react';
import {
  FormControl,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';
import ContactHomeItem from '../../itemList/ContactHomeItem';

const RightBarHome = () => {
  return (
    <div className="right-bar">
      <div className="contact">
        <h3 className="header-contact">Danh bạ</h3>
        <div className="search-contact">
          <FormControl type="text" placeholder="Tìm kiếm" className="input-search" />
        </div>
        <div className="contact-list">
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
          <ContactHomeItem />
        </div>
      </div>
    </div>
  )
}

export default RightBarHome;