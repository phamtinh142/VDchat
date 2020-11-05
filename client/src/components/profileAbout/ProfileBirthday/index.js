import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withRowProfile } from '../../../hocs';
import { FormatDate } from '../../../helper/formatTime';

const BirthdayValue = ({ value }) => (
  <span className="value">
    {FormatDate(value)}
  </span>
);

BirthdayValue.propTypes = {
  value: PropTypes.string,
};

BirthdayValue.defaultProps = {
  value: '',
};

const BirthdayEdit = ({ value, onChangeValue }) => (
  <div className="d-flex align-items-center pb-3">
    <DatePicker 
      selected={new Date(value)}
      onChange={(event) => onChangeValue(new Date(event).toISOString())}
    />
  </div>
);

BirthdayEdit.propTypes = {
  value: PropTypes.string,
  onChangeValue: PropTypes.func,
};

BirthdayEdit.defaultProps = {
  value: '',
  onChangeValue: null,
};

export default withRowProfile({
  Title: 'Ngày sinh',
  Value: BirthdayValue,
  EditValue: BirthdayEdit,
});