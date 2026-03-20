import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/orders` : '/api/orders' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const fetchOrders = async () => {
  const res = await API.get('/');
  return res.data;
};

export const createOrder = async (data) => {
  const res = await API.post('/', data);
  return res.data;
};

export const updateOrder = async (id, data) => {
  const res = await API.put(`/${id}`, data);
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};
