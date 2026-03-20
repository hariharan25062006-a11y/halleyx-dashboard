import { useState, useEffect, useCallback } from 'react';
import { fetchDashboard as apiFetchDashboard, saveDashboard as apiSaveDashboard } from '../api/dashboardApi';
import { useAuth } from './useAuth';

export const useDashboard = () => {
  const { isLoggedIn } = useAuth();
  const [config, setConfig] = useState([]);
  const [dateFilter, setDateFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadConfig = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const data = await apiFetchDashboard();
      if (data && data.config_json) {
        setConfig(typeof data.config_json === 'string' ? JSON.parse(data.config_json) : data.config_json);
      }
      if (data && data.date_filter) {
        setDateFilter(data.date_filter);
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch dashboard configs');
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const saveConfig = useCallback(async (widgets, filter) => {
    const data = await apiSaveDashboard(JSON.stringify(widgets), filter);
    setConfig(widgets);
    setDateFilter(filter);
    return data;
  }, []);

  return {
    config,
    setConfig,
    dateFilter,
    setDateFilter,
    loading,
    error,
    loadConfig,
    saveConfig,
  };
};
