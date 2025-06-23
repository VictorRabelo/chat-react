import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
        Chat App
      </Link>
      <nav className="flex items-center space-x-4">
        {user && <span className="text-gray-700 dark:text-gray-200">{user.name}</span>}
        <button
          onClick={logout}
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
