import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const ItemContact = ({ }) => {
  return (
    <Link className="contact-item text-decoration-none">
      <span className="avatar" style={{ backgroundImage: "url(/images/avatar-test.jpeg)" }} />
      <span className="username">PhamTinh142</span>
    </Link>
  );
};

ItemContact.propTypes = {

}

ItemContact.defaultProps = {

}

export default ItemContact;