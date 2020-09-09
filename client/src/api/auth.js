import api from '../networking/axios';
import {
  URL_LOGIN,
  URL_SIGNUP,
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