import React from 'react';
import PropTypes from 'prop-types';

import { withRowProfile } from '../../../hocs';

const MaritalStatusValue = ({ value }) => {
  const handleValue = () => {
    if (value === 0) {
      return 'Độc thân';
    }
    if (value === 1) {
      return 'Hẹn hò';
    }
    if (value === 2) {
      return 'Đã kết hôn';
    }
    return null;
  };
  return (
    <span className="value">{handleValue()}</span>
  );
};

MaritalStatusValue.propTypes = {
  value: PropTypes.number,
};

MaritalStatusValue.defaultProps = {
  value: 0,
};

const MaritalStatusEdit = ({ value, onChangeValue }) => (
   <div className="d-flex align-items-center pb-3">
    <select 
      name="Trạng thái" 
      style={{ height: 30 }}
      value={value}
      onChange={(event) => onChangeValue(parseInt(event.target.value, 10))}
    >
      <option value={0}>Độc thân</option>
      <option value={1}>Hẹn hò</option>
      <option value={2}>Đã kết hôn</option>
    </select>
   </div>
);

MaritalStatusEdit.propTypes = {
  value: PropTypes.number,
  onChangeValue: PropTypes.func,
};

MaritalStatusEdit.defaultProps = {
  value: 0,
  onChangeValue: null,
};

export default withRowProfile({
  Title: 'Tình trạng',
  Value: MaritalStatusValue,
  EditValue: MaritalStatusEdit,
});