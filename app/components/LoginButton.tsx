'use client';

import { useState, useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import LoginModal from './LoginBox';
import { AuthContext } from '@/app/context/AuthContext'; // Import context

const LoginButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, login, logout } = useContext(AuthContext); // Use context

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout(); // Call logout from context
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

      <LoginModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          login(); // Update state after login
        }}
      />
    </>
  );
};

export default LoginButton;

