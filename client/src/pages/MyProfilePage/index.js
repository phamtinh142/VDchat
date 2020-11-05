import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import './style.scss';
import { withProfileContainer } from '../../hocs';
import { 
  updateProfileRequest,
  toggleModalUpdateProfileFail,
} from '../../redux/actions';
import {
  ProfileUserName,
  ProfileSex,
  ProfileBirthday,
  ProfileMaritalStatus,
} from '../../components/profileAbout';
import { ErrorModal } from '../../components/modal';

const ProfilePage = () => {
  const { id } = useParams();
  const [isShowEditButton, setIsShowEdditButton] = useState(false);
  const userNameState = useSelector((state) => state.myProfile.userInfo.userName);
  const sexState = useSelector((state) => state.myProfile.userInfo.sex);
  const birthDayState = useSelector((state) => state.myProfile.userInfo.birthDay);
  const maritalStatusState = useSelector((state) => state.myProfile.userInfo.maritalStatus);
  const myID = useSelector((state) => state.myProfile.myProfile._id);

  const isShowModalError = useSelector((state) => state.myProfile.isShowModalError);
  const messageError = useSelector((state) => state.myProfile.messageError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== myID) {
      setIsShowEdditButton(true);
    }
  }, []);

  const saveProfile = (valueResult) => {
    dispatch(updateProfileRequest(valueResult));
  };

  const toggleModalError = (status) => {
    dispatch(toggleModalUpdateProfileFail(status));
  };

  return (
  <div className="about-layout">
    <h1 className="profile-title">Giới thiệu</h1>
    <div className="about-form-title">
      <FaRegUserCircle />
      <span className="title">Thông tin cá nhân</span>
    </div>
    <ProfileUserName
      type="username"
      value={userNameState}
      disablePrivacyStatus
      disableEdit={isShowEditButton}
      onClickSavse={(valueResult) => saveProfile(valueResult)}
    />
    <ProfileSex 
      type="sex"
      value={sexState.value}
      privacyStatus={sexState.status}
      disableEdit={isShowEditButton}
      onClickSavse={(valueResult) => saveProfile(valueResult)}
    />
    <ProfileBirthday
      type="birthday" 
      value={birthDayState.value}
      privacyStatus={birthDayState.status}
      disableEdit={isShowEditButton}
      onClickSavse={(valueResult) => saveProfile(valueResult)}
    />
    <ProfileMaritalStatus 
      type="marital"
      value={maritalStatusState.value}
      privacyStatus={maritalStatusState.status}
      disableEdit={isShowEditButton}
      onClickSavse={(valueResult) => saveProfile(valueResult)}
    />
    <ErrorModal 
      isShow={isShowModalError}
      message={messageError}
      onHide={() => toggleModalError(false)}
    />
  </div>
  );
};

export default withProfileContainer({ Content: ProfilePage });