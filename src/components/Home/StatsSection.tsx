import React from 'react';
import { Download, Users, Star, TrendingUp } from 'lucide-react';
import { useData } from '../../context/DataContext';

const StatsSection: React.FC = () => {
  const { state } = useData();
  
  const totalDownloads = state.projects.reduce((sum, project) => sum + project.downloads, 0);
  const totalViews = state.projects.reduce((sum, project) => sum + project.views, 0);
  const totalProjects = state.projects.length;
  const avgRating = 4.8; // Mock average rating

  const stats = [
    {
      icon: Download,
      value: totalDownloads.toLocaleString(),
      label: 'Downloads',
      color: 'from-green-400 to-green-500',
    },
    {
      icon: Users,
      value: totalViews.toLocaleString(),
      label: 'Views',
      color: 'from-blue-400 to-blue-500',
    },
    {
      icon: TrendingUp,
      value: totalProjects.toString(),
      label: 'Projects',
      color: 'from-purple-400 to-purple-500',
    },
    {
      icon: Star,
      value: avgRating.toString(),
      label: 'Avg Rating',
      color: 'from-yellow-400 to-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-300 text-sm">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsSection;