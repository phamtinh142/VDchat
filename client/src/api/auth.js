import api from '../networking/axios';
import {
  URL_LOGIN,
  URL_SIGNUP,
  URL_PROFILE,
  URL_UPDATE_PROFILE,
} from '../networking/urls';

export const fetchLogin = async ({ 
  email, password,
}) => {
  try {
    const response = await api.post(URL_LOGIN, {
      email,
      password,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchSignup = async ({ 
  userName, email, password, confirmPassword, 
}) => {
  try {
    const response = await api.post(URL_SIGNUP, {
      userName,
      email,
      password,
      confirmPassword,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchProfile = async (userID) => {
  try {
    const response = await api.get(URL_PROFILE, {
      params: {
        userID,
      },
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchUpdateProfile = async ({
  avatar, description, userName, sex, birthDay, maritalStatus,
}) => {
  try {
    const response = await api.put(URL_UPDATE_PROFILE, {
      avatar,
      description,
      userName,
      sex,
      birthDay,
      maritalStatus,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};
