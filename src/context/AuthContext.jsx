import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setUser(data.user);
    navigate('/dashboard');
  };

  const register = async (payload) => {
    await api.post('/auth/register', payload);
    await login({ email: payload.email, password: payload.password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common.Authorization;
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
