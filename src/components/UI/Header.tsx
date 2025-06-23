import React from 'react';
import { Search, Bot, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleAdminClick = () => {
    dispatch({ type: 'INCREMENT_ADMIN_CLICK' });
    
    if (state.adminClickCount >= 4) {
      const password = prompt('Enter admin password:');
      if (password === 'admin123') {
        dispatch({ type: 'TOGGLE_ADMIN', payload: true });
      } else {
        dispatch({ type: 'RESET_ADMIN_CLICK' });
        alert('Incorrect password!');
      }
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl cursor-pointer transform transition-transform hover:scale-105"
              onClick={handleAdminClick}
            >
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bolt.new
              </h1>
              <p className="text-xs text-gray-500">Discord Bot Hub</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Search for Discord bots..."
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#bots" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Browse Bots
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </a>
            {state.isAdmin && (
              <button
                onClick={() => dispatch({ type: 'TOGGLE_ADMIN', payload: false })}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Exit Admin
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;