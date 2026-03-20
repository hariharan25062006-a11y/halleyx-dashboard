import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/dashboard` : '/api/dashboard' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const fetchDashboard = async () => {
  const res = await API.get('/');
  return res.data;
};

export const saveDashboard = async (config_json, date_filter) => {
  const res = await API.put('/', { config_json, date_filter });
  return res.data;
};
