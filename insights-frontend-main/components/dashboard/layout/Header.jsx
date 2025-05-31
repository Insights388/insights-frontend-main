import React from 'react';
import { Search, Settings, Bell, User, Home } from 'lucide-react';

const Header = ({ 
  currentPage = 'Calls',
  showSearch = false,
  showNotifications = true,
  showSettings = true,
  showSignIn = true 
}) => {
  return (
    <header className="text-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex flex-col space-y-2">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-gray-300" />
            <span className="text-gray-300">/</span>
            <span className="text-gray-300">{currentPage}</span>
          </div>
          
        </div>

        {/* Right side - Search and user controls */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Type here..."
                className="bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            {showNotifications && (
              <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-gray-300" />
              </button>
            )}
            
            {showSettings && (
              <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-300" />
              </button>
            )}
            
            {showSignIn && (
              <button className="flex items-center space-x-2 px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-300" />
                <span className="text-sm text-gray-300">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;