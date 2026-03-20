import { useState, useEffect, useCallback } from 'react';
import { fetchOrders as apiFetchOrders, createOrder as apiCreateOrder, updateOrder as apiUpdateOrder, deleteOrder as apiDeleteOrder } from '../api/ordersApi';
import { useAuth } from './useAuth';

export const useOrders = () => {
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const data = await apiFetchOrders();
      setOrders(data.orders || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const addOrder = async (data) => {
    const res = await apiCreateOrder(data);
    await loadOrders();
    return res;
  };

  const editOrder = async (id, data) => {
    const res = await apiUpdateOrder(id, data);
    await loadOrders();
    return res;
  };

  const removeOrder = async (id) => {
    await apiDeleteOrder(id);
    await loadOrders();
  };

  return {
    orders,
    loading,
    error,
    loadOrders,
    addOrder,
    editOrder,
    removeOrder,
  };
};
