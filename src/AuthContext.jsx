import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));
  const [userId, setUserId] = useState(Cookies.get('userId') || null);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('userId');
    setIsAuthenticated(!!token);
    setUserId(id || null);
  }, []);

  const login = (token, id) => {
    Cookies.set('token', token, { path: '/' });
    Cookies.set('userId', id, { path: '/' });
    setIsAuthenticated(true);
    setUserId(id);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
