import React, { useState } from 'react';
import { Bot, Plus, BarChart3, MessageSquare, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import BotManagement from './BotManagement';
import Statistics from './Statistics';
import ReviewManagement from './ReviewManagement';

const AdminPanel: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('bots');

  const tabs = [
    { id: 'bots', name: 'Bot Management', icon: Bot },
    { id: 'stats', name: 'Statistics', icon: BarChart3 },
    { id: 'reviews', name: 'Reviews', icon: MessageSquare }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'bots':
        return <BotManagement />;
      case 'stats':
        return <Statistics />;
      case 'reviews':
        return <ReviewManagement />;
      default:
        return <BotManagement />;
    }
  };

  if (!state.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your Discord bot platform</p>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
              <Settings className="w-5 h-5" />
              <span>Admin Mode</span>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;