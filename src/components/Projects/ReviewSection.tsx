import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Star, Send, MessageSquare } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Review } from '../../types';
import DOMPurify from 'dompurify';

interface ReviewSectionProps {
  projectId: string;
}

interface ReviewForm {
  username: string;
  email: string;
  rating: number;
  comment: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ projectId }) => {
  const { state, dispatch } = useData();
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<ReviewForm>({
    defaultValues: { rating: 5 }
  });

  const watchedRating = watch('rating');
  const reviews = state.reviews.filter(review => 
    review.projectId === projectId && review.status === 'approved'
  );

  const onSubmit = (data: ReviewForm) => {
    // Sanitize the comment to prevent XSS
    const sanitizedComment = DOMPurify.sanitize(data.comment);
    
    const newReview: Review = {
      id: Date.now().toString(),
      projectId,
      username: data.username,
      email: data.email,
      rating: data.rating,
      comment: sanitizedComment,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: 'ADD_REVIEW', payload: newReview });
    reset();
    setShowForm(false);
    alert('Review submitted successfully! It will be visible after moderation.');
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

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center mt-2">
              {renderStars(Math.round(averageRating))}
              <span className="ml-2 text-sm text-gray-600">
                {averageRating.toFixed(1)} out of 5 ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Write Review</span>
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Leave a Review</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                {...register('username', { required: 'Name is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex items-center space-x-2">
              {renderStars(watchedRating, true, (rating) => setValue('rating', rating))}
              <span className="text-sm text-gray-600">({watchedRating}/5)</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment *
            </label>
            <textarea
              {...register('comment', { required: 'Comment is required' })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Share your experience with this project..."
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Review</span>
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{review.username}</h4>
                  <div className="flex items-center mt-1">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-500">
                      {review.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: review.comment }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;