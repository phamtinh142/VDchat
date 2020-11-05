import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

import { withRowProfile } from '../../../hocs';
import iconMale from '../../../assets/icons/male.svg';
import iconFemale from '../../../assets/icons/female.svg';
import iconLGBT from '../../../assets/icons/LGBT.svg';

const SexValue = ({ value }) => {
  const changeValue = () => {
    if (value === 2) {
      return (
        <div>
          <img src={iconFemale} alt="notification" style={{ marginRight: 4 }} />
          Nữ
        </div>
      );
    }
    if (value === 3) {
      return (
        <div>
          <img src={iconLGBT} alt="notification" style={{ marginRight: 4 }} />
          LGBT
        </div>
      );
    }
    return (
      <div className="d-flex align-items-center">
        <img src={iconMale} alt="notification" style={{ marginRight: 4 }} />
        Nam
      </div>
    );
  };
  return (
    <>
      {changeValue()}
    </>
  );
};

SexValue.propTypes = {
  value: PropTypes.number,
};

SexValue.defaultProps = {
  value: 0,
};

const EditSex = ({ value, onChangeValue }) => (
    <Form className="d-flex align-items-center pb-3">
      <Form.Check 
        inline 
        label="Nam" 
        checked={value === 1} 
        type="radio" 
        onChange={() => onChangeValue(1)}
      />
      <Form.Check 
        inline 
        label="Nữ" 
        type="radio" 
        checked={value === 2} 
        onChange={() => onChangeValue(2)}
      />
      <Form.Check 
        inline 
        label="LGBT" 
        type="radio" 
        checked={value === 3} 
        onChange={() => onChangeValue(3)}
      />
    </Form>
);

EditSex.propTypes = {
  value: PropTypes.number,
  onChangeValue: PropTypes.func,
};

EditSex.defaultProps = {
  value: 0,
  onChangeValue: null,
};

export default withRowProfile({
  Title: 'Giới tính',
  Value: SexValue,
  EditValue: EditSex,
});