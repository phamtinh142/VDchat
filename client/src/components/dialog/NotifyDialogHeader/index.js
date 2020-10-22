import React from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  FormControl,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';
import NotifyItem from '../../itemList/NotifyItem';

const NotifyDialogHeader = React.forwardRef(({ isShow }, ref) => {
  return (
    <>
      {
        isShow && (
          <div className="dialog-header__notify" ref={ref}>
            <NotifyItem />
            <NotifyItem />
            <NotifyItem />
          </div>
        )
      }
    </>
  );
});

NotifyDialogHeader.propTypes = {
  isShow: PropTypes.bool,
}

NotifyDialogHeader.defaultProps = {
  isShow: false
}

export default NotifyDialogHeader;