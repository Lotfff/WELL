import React from 'react';
import { BarChart3, Users, Download, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminDashboard: React.FC = () => {
  const { getAdminStats } = useData();
  const stats = getAdminStats();

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: BarChart3,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Total Downloads',
      value: stats.totalDownloads.toLocaleString(),
      icon: Download,
      color: 'bg-green-500',
      change: '+23%',
    },
    {
      title: 'Total Reviews',
      value: stats.totalReviews,
      icon: MessageSquare,
      color: 'bg-purple-500',
      change: '+8%',
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews,
      icon: Clock,
      color: 'bg-orange-500',
      change: stats.pendingReviews > 0 ? 'Needs attention' : 'All clear',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.change.includes('+') ? 'text-green-600' : 
                    stat.change.includes('attention') ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Stats */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Projects by Category</h2>
          <div className="space-y-4">
            {stats.categoryStats.map((category) => (
              <div key={category.categoryId} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.downloads.toLocaleString()} downloads</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{category.projectCount}</p>
                  <p className="text-sm text-gray-600">projects</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <BarChart3 className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="font-medium text-gray-900">Add New Project</h3>
            <p className="text-sm text-gray-600">Create a new project entry</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <MessageSquare className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="font-medium text-gray-900">Review Comments</h3>
            <p className="text-sm text-gray-600">Moderate pending reviews</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Download className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="font-medium text-gray-900">Upload Files</h3>
            <p className="text-sm text-gray-600">Add project files</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;