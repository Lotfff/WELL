import React, { useState } from 'react';
import { Heart, Download, Star, ExternalLink, Github, Eye } from 'lucide-react';
import { Bot } from '../../types';
import { useApp } from '../../context/AppContext';
import BotModal from './BotModal';

interface BotCardProps {
  bot: Bot;
}

const BotCard: React.FC<BotCardProps> = ({ bot }) => {
  const { dispatch } = useApp();
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      dispatch({ type: 'LIKE_BOT', payload: bot.id });
      setIsLiked(true);
    }
  };

  const handleDownload = () => {
    dispatch({ type: 'DOWNLOAD_BOT', payload: bot.id });
    // In a real app, this would trigger the actual download
    alert('Download started! Check your downloads folder.');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      moderation: 'bg-red-100 text-red-800',
      music: 'bg-purple-100 text-purple-800',
      games: 'bg-blue-100 text-blue-800',
      economy: 'bg-green-100 text-green-800',
      utility: 'bg-orange-100 text-orange-800',
      fun: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        {/* Bot Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={bot.imageUrl}
            alt={bot.name}
            className="w-full h-full object-cover"
          />
          {bot.featured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Featured
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(bot.category)}`}>
              {bot.category.charAt(0).toUpperCase() + bot.category.slice(1)}
            </span>
          </div>
        </div>

        {/* Bot Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
              {bot.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">{bot.rating}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {bot.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {bot.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{bot.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>{bot.downloads.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              {bot.reviews.length} reviews
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
            
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-all ${
                isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            {bot.githubLink && (
              <button
                onClick={() => window.open(bot.githubLink, '_blank')}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Github className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <BotModal 
          bot={bot} 
          onClose={() => setShowModal(false)}
          onDownload={handleDownload}
        />
      )}
    </>
  );
};

export default BotCard;