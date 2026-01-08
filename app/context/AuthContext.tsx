'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';

// Define AuthContext type
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if token exists in localStorage
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
