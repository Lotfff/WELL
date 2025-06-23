import React from 'react';
import { Check, X, Trash2, Star, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ReviewManagement: React.FC = () => {
  const { state, dispatch } = useData();

  const allReviews = state.reviews.sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );

  const pendingReviews = allReviews.filter(review => review.status === 'pending');
  const approvedReviews = allReviews.filter(review => review.status === 'approved');
  const rejectedReviews = allReviews.filter(review => review.status === 'rejected');

  const handleApprove = (reviewId: string) => {
    dispatch({ type: 'APPROVE_REVIEW', payload: reviewId });
  };

  const handleReject = (reviewId: string) => {
    dispatch({ type: 'REJECT_REVIEW', payload: reviewId });
  };

  const handleDelete = (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      dispatch({ type: 'DELETE_REVIEW', payload: reviewId });
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

  const getProjectTitle = (projectId: string) => {
    const project = state.projects.find(p => p.id === projectId);
    return project?.title || 'Unknown Project';
  };

  const ReviewCard = ({ review, showActions = false }: { review: any; showActions?: boolean }) => (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h4 className="font-medium text-gray-900">{review.username}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              review.status === 'approved' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {review.status}
            </span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            {renderStars(review.rating)}
            <span className="text-sm text-gray-500">
              {review.createdAt.toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Project: <span className="font-medium">{getProjectTitle(review.projectId)}</span>
          </p>
        </div>
        
        {showActions && (
          <div className="flex items-center space-x-2">
            {review.status === 'pending' && (
              <>
                <button
                  onClick={() => handleApprove(review.id)}
                  className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded"
                  title="Approve Review"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleReject(review.id)}
                  className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                  title="Reject Review"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => handleDelete(review.id)}
              className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
              title="Delete Review"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: review.comment }} />
      
      <div className="mt-3 text-xs text-gray-500">
        Email: {review.email}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Review Management</h1>
        <p className="text-gray-600">Moderate user reviews and feedback</p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{pendingReviews.length}</p>
              <p className="text-sm text-gray-600">Pending Reviews</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{approvedReviews.length}</p>
              <p className="text-sm text-gray-600">Approved Reviews</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <X className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{rejectedReviews.length}</p>
              <p className="text-sm text-gray-600">Rejected Reviews</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {allReviews.length > 0 
                  ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
                  : '0'
                }
              </p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
            Pending Reviews ({pendingReviews.length})
          </h2>
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showActions={true} />
            ))}
          </div>
        </div>
      )}

      {/* All Reviews */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Reviews ({allReviews.length})</h2>
        </div>
        
        {allReviews.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No reviews yet</p>
          </div>
        ) : (
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {allReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showActions={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;