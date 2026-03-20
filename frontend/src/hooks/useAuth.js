import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { login as loginApi, signup as signupApi } from '../api/authApi';

export const useAuth = () => {
  const { user, token, login: contextLogin, logout } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (action, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await (action === 'login' ? loginApi(data) : signupApi(data));
      if (action === 'login') {
        contextLogin(res.user, res.token);
      }
      return res;
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    token,
    isLoggedIn: !!token,
    loading,
    error,
    login: (data) => handleAuth('login', data),
    signup: (data) => handleAuth('signup', data),
    logout,
  };
};
