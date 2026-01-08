'use client';

import { useState } from 'react';

const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
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
        localStorage.setItem('token', data.token); // Store token for future requests
        alert('Login successful!');
        console.log("token: ",data.token)
        onClose(); // Close modal on success
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong, please try again.');
      console.log(err)
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-center text-blue-800">Login</h2>

        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

        <div className="mt-4">
          <label className="block text-sm text-blue-700">Username</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded mt-1 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-blue-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded mt-1 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button
          className="w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

