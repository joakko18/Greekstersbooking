'use client';

import { useState, useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import LoginModal from './LoginBox';
import { AuthContext } from '@/app/context/AuthContext';

const LoginButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // We pull the auth state and functions from our Context "Brain"
  const context = useContext(AuthContext);

  // Safety check: if context is undefined, don't render yet
  if (!context) return null;
  const { isLoggedIn, login, logout } = context;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout(); 
    alert('Logged out successfully!');
  };

  return (
    <>
      <button
        onClick={isLoggedIn ? handleLogout : toggleModal}
        className={`fixed top-4 right-4 flex items-center px-4 py-2 rounded-full text-white font-semibold transition-colors duration-300 shadow-md z-50 ${
          isLoggedIn ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        <FaUser className="mr-2" />
        {isLoggedIn ? 'LOG OUT' : 'LOG IN'}
      </button>

      {/* The Modal now has two distinct paths:
          1. onClose: Just hides the window (User clicked Close/Cancel).
          2. onLoginSuccess: Updates the global state (User actually logged in).
      */}
      <LoginModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)} 
        onLoginSuccess={(token: string) => {
          // This only runs if handleLogin in the Modal was successful!
          login(token); 
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default LoginButton;

