'use client';

import { useState } from 'react';

const NVPAlert: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in">
      <span className="text-lg font-semibold">This project will be ready soon.User: test Password:4793960</span>
      <button 
        onClick={() => setVisible(false)} 
        className="text-white text-xl font-bold px-2 hover:text-gray-200 transition duration-200"
      >
        ✕
      </button>
    </div>
  );
};

export default NVPAlert;
