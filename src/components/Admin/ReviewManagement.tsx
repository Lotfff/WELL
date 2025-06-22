import React from 'react';
import { Trash2, Flag, Star, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ReviewManagement: React.FC = () => {
  const { state, dispatch } = useApp();

  const allReviews = state.bots.flatMap(bot => 
    bot.reviews.map(review => ({
      ...review,
      botName: bot.name
    }))
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleDeleteReview = (botId: string, reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      dispatch({ type: 'DELETE_REVIEW', payload: { botId, reviewId } });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Review Management</h2>
          <p className="text-gray-600">Manage user reviews and feedback</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>{allReviews.length} Total Reviews</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900">{allReviews.length}</div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {allReviews.filter(r => r.rating >= 4).length}
          </div>
          <div className="text-sm text-gray-600">Positive Reviews</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600">
            {allReviews.filter(r => r.rating <= 2).length}
          </div>
          <div className="text-sm text-gray-600">Negative Reviews</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">
            {(allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length || 0).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {allReviews.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No reviews yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {allReviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="font-medium text-gray-900">{review.username}</h4>
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">
                          {review.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {review.botName}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Bot: {review.botName}</span>
                      <span>•</span>
                      <span>Rating: {review.rating}/5</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleDeleteReview(review.botId, review.id)}
                      className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;