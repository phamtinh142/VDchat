import React from 'react';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

import { withRowProfile } from '../../../hocs';

const UserNameValue = ({ value }) => (
  <span className="value">
    {value}
  </span>
);

UserNameValue.propTypes = {
  value: PropTypes.string,
};

UserNameValue.defaultProps = {
  value: 0,
};

const UserNameEdit = ({ value, onChangeValue }) => (
  <div className="d-flex align-items-center pb-3">
    <input 
      value={value} 
      placeholder="Tên của bạn" 
      onChange={(event) => onChangeValue(event.target.value)}
    />
  </div>
);

UserNameEdit.propTypes = {
  value: PropTypes.string,
  onChangeValue: PropTypes.func,
};

UserNameEdit.defaultProps = {
  value: 0,
  onChangeValue: null,
};

export default withRowProfile({
  Title: 'Tên tài khoản',
  Value: UserNameValue,
  EditValue: UserNameEdit,
});
