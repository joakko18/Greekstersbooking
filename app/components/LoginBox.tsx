'use client';

import { useState } from 'react';

// 1. Added onLoginSuccess to the interface so the Modal can talk back to the parent
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string) => void; 
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. We still store it in sessionStorage for persistence
        sessionStorage.setItem('token', data.token); 
        
        // 3. CRITICAL: Only call this if the login actually worked!
        // This sends the token to the AuthContext to update the UI
        onLoginSuccess(data.token); 
        
        onClose(); 
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong, please try again.');
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-center text-blue-800">Login</h2>

        {error && <p className="text-red-600 text-center mt-2 text-sm font-bold">{error}</p>}

        <div className="mt-4">
          <label className="block text-sm text-blue-700">Username</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded mt-1 focus:outline-none focus:ring focus:ring-green-500 text-black"
            placeholder="Enter your username"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-blue-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded mt-1 focus:outline-none focus:ring focus:ring-green-500 text-black"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full text-white py-2 mt-4 rounded transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button
          className="w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-600 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

