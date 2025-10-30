
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#00A86B]">
          Assignment & Review Dashboard 
        </Link>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 hidden md:block">
            Hello, <span className="font-semibold text-[#1F2937]">{user.name}</span>
          </span>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-white bg-[#00A86B] rounded-lg
                       hover:bg-[#059669] focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}