'use client';

import { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

const AdminAccessMessage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center h-24">
      <div
        className={`p-3 rounded-md shadow-md text-center transition-all duration-300 text-sm max-w-xs ${
          isLoggedIn ? 'bg-green-100 text-green-700 border-green-500' : 'bg-red-100 text-red-700 border-red-500'
        } border-l-4`}
      >
        <h2 className="font-semibold animate-fade-in">
          {isLoggedIn ? '✅ You have Admin access' : '⛔ You don\'t have access to this information'}
        </h2>
      </div>
    </div>
  );
};

export default AdminAccessMessage;
