import React, { createContext, useContext, useState } from 'react';
import { AuthResponse } from '../types';

interface AuthContextType {
  user: AuthResponse | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronous initial state initialization to prevent refresh redirect race-conditions
  const [user, setUser] = useState<AuthResponse | null>(() => {
    try {
      const token = localStorage.getItem('prabhatech_token');
      const storedUser = localStorage.getItem('prabhatech_user');
      if (token && storedUser) {
        return JSON.parse(storedUser);
      }
    } catch (e) {
      localStorage.removeItem('prabhatech_token');
      localStorage.removeItem('prabhatech_user');
    }
    return null;
  });

  const login = (data: AuthResponse) => {
    localStorage.setItem('prabhatech_token', data.token);
    localStorage.setItem('prabhatech_user', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('prabhatech_token');
    localStorage.removeItem('prabhatech_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
