import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { PrivacyDropdownButton } from '../../components/button';
import './style.scss';

const withRowProfile = (component) => {
  const _WithRowProfile = (props) => {
    const { 
      Title, 
      Value, 
      EditValue, 
    } = component;

    const {
      type,
      value,
      disablePrivacyStatus,
      disableEdit,
      privacyStatus,
      onClickSavse,
    } = props;

    const [isShowEdit, setIsShowEdit] = useState(false);
    const [valueDefault, setValueDefault] = useState(value);
    const [statusDefault, setStatusDefault] = useState(privacyStatus);

    const toggleShowEdit = (status) => {
      if (status === false) {
        setValueDefault(value);
        setStatusDefault(privacyStatus);
      }
      setIsShowEdit(status);
    };

    const toggleValue = (valueChange) => {
      setValueDefault(valueChange);
    };

    const toggleStatus = (status) => {
      setStatusDefault(status);
    };

    const saveValue = () => {
      const objUpdate = {};
      switch (type) {
        case 'username':
          objUpdate.userName = valueDefault;
          break;
        case 'sex':
          objUpdate.sex = { value: valueDefault, status: statusDefault };
          break;
        case 'birthday':
          objUpdate.birthDay = { value: valueDefault, status: statusDefault };
          break;
        case 'marital':
          objUpdate.maritalStatus = { value: valueDefault, status: statusDefault };
          break;
        default:
          break;
      }

      onClickSavse(objUpdate);
      
      return setIsShowEdit(false);
    };

    return (
    <Row className="profile-row">
      <Col sm={12} md={3} lg={4} className="row-left">
        <h6>{Title}</h6>
      </Col>
      <Col sm={12} md={9} lg={8} className="row-right">
        {
          !isShowEdit
            ? (
              <div className="info">
                <Value value={valueDefault} />
                {
                  !disableEdit
                    ? (
                    <button 
                      type="button" 
                      className="edit-value"
                      onClick={() => toggleShowEdit(true)}
                    >
                  <FaEdit style={{ marginRight: 5 }} />
                  Chỉnh sửa
                    </button>
                    )
                    : null
                }
              </div>
            )
            : (
              <div className="edit-info">
                <Row className="align-items-center justify-content-between m-0">
                  <EditValue 
                    value={valueDefault}
                    onChangeValue={(valueChange) => toggleValue(valueChange)}
                  />
                  {
                    !disablePrivacyStatus
                      ? (
                      <PrivacyDropdownButton 
                        value={statusDefault}
                        onChangeStatus={(statusChange) => toggleStatus(statusChange)}
                      />
                      )
                      : null
                  }
                </Row>
                <div className="d-flex align-items-center">
                  <Button 
                    variant="success" 
                    size="sm" 
                    className="save-button"
                    onClick={() => saveValue()}
                  >
                    Lưu thay đổi
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => toggleShowEdit(false)}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            )
        }
      </Col>
    </Row>
    );
  };

  _WithRowProfile.propTypes = {
    type: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    disablePrivacyStatus: PropTypes.bool,
    disableEdit: PropTypes.bool,
    privacyStatus: PropTypes.number,
    onClickSavse: PropTypes.func,
  };

  _WithRowProfile.defaultProps = {
    type: '',
    value: null,
    disablePrivacyStatus: false,
    disableEdit: false,
    privacyStatus: 0,
    onClickSavse: null,
  };

  return _WithRowProfile;
};

export default withRowProfile;