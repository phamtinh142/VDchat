import axios from 'axios';
import { URL_BASE } from './urls';

const api = axios.create({
  baseURL: URL_BASE,
});

export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('token');
    if (token) {
      return token;
    }
  }
  return false;
};

api.interceptors.request.use(
  (config) => {
    if (isAuthenticated()) {
      config.headers.Authorization = `Bearer ${isAuthenticated()}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => Promise.resolve(response.data),
  (error) => Promise.reject(error.response),
);

export default api;