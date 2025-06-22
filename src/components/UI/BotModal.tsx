import React, { useState } from 'react';
import { X, Download, Github, Star, Heart, ExternalLink, Send } from 'lucide-react';
import { Bot, Review } from '../../types';
import { useApp } from '../../context/AppContext';

interface BotModalProps {
  bot: Bot;
  onClose: () => void;
  onDownload: () => void;
}

const BotModal: React.FC<BotModalProps> = ({ bot, onClose, onDownload }) => {
  const { dispatch } = useApp();
  const [newReview, setNewReview] = useState({
    username: '',
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.username.trim() && newReview.comment.trim()) {
      const review: Omit<Review, 'id'> = {
        botId: bot.id,
        username: newReview.username.trim(),
        rating: newReview.rating,
        comment: newReview.comment.trim(),
        createdAt: new Date(),
        reported: false
      };
      
      dispatch({ type: 'ADD_REVIEW', payload: { botId: bot.id, review } });
      setNewReview({ username: '', rating: 5, comment: '' });
      alert('Review submitted successfully!');
    }
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => onChange?.(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={bot.imageUrl}
            alt={bot.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{bot.name}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {renderStars(Math.round(bot.rating))}
                <span className="ml-2 text-sm">({bot.reviews.length} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 max-h-[calc(90vh-16rem)] overflow-y-auto">
          {/* Bot Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{bot.description}</p>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {bot.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Downloads:</span>
                    <span className="font-medium">{bot.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Likes:</span>
                    <span className="font-medium">{bot.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">{bot.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium capitalize">{bot.category}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={onDownload}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Bot</span>
                </button>
                
                {bot.githubLink && (
                  <button
                    onClick={() => window.open(bot.githubLink, '_blank')}
                    className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Source</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Reviews ({bot.reviews.length})</h3>
            
            {/* Add Review Form */}
            <form onSubmit={handleSubmitReview} className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium mb-3">Leave a Review</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your username"
                  value={newReview.username}
                  onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Rating:</span>
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview({ ...newReview, rating })
                  )}
                </div>
              </div>
              <textarea
                placeholder="Write your review..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                required
              />
              <button
                type="submit"
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>
            </form>

            {/* Reviews List */}
            <div className="space-y-4">
              {bot.reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
              ) : (
                bot.reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium">{review.username}</h5>
                        <div className="flex items-center space-x-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">
                            {review.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotModal;