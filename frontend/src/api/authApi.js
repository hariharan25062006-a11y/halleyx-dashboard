import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/auth` : '/api/auth' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const signup = async (data) => {
  const res = await API.post('/signup', data);
  return res.data;
};

export const login = async (data) => {
  const res = await API.post('/login', data);
  return res.data;
};

export const getMe = async () => {
  const res = await API.get('/me');
  return res.data;
};
