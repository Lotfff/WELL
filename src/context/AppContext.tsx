import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Bot, Review, AdminStats } from '../types';
import { mockBots, profanityFilter } from '../data/mockData';

interface AppState {
  bots: Bot[];
  isAdmin: boolean;
  searchQuery: string;
  selectedCategory: string;
  adminClickCount: number;
  currentPage: 'home' | 'bots';
}

type AppAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_CURRENT_PAGE'; payload: 'home' | 'bots' }
  | { type: 'LIKE_BOT'; payload: string }
  | { type: 'ADD_REVIEW'; payload: { botId: string; review: Omit<Review, 'id'> } }
  | { type: 'ADD_BOT'; payload: Bot }
  | { type: 'UPDATE_BOT'; payload: Bot }
  | { type: 'DELETE_BOT'; payload: string }
  | { type: 'DELETE_REVIEW'; payload: { botId: string; reviewId: string } }
  | { type: 'TOGGLE_ADMIN'; payload: boolean }
  | { type: 'INCREMENT_ADMIN_CLICK' }
  | { type: 'RESET_ADMIN_CLICK' }
  | { type: 'DOWNLOAD_BOT'; payload: string };

const initialState: AppState = {
  bots: mockBots,
  isAdmin: false,
  searchQuery: '',
  selectedCategory: 'all',
  adminClickCount: 0,
  currentPage: 'home'
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'LIKE_BOT':
      return {
        ...state,
        bots: state.bots.map(bot =>
          bot.id === action.payload
            ? { ...bot, likes: bot.likes + 1 }
            : bot
        )
      };
    
    case 'ADD_REVIEW':
      if (profanityFilter(action.payload.review.comment)) {
        return state; // Don't add review if it contains profanity
      }
      return {
        ...state,
        bots: state.bots.map(bot =>
          bot.id === action.payload.botId
            ? {
                ...bot,
                reviews: [...bot.reviews, { ...action.payload.review, id: Date.now().toString() }],
                rating: calculateNewRating(bot.reviews, action.payload.review.rating)
              }
            : bot
        )
      };
    
    case 'ADD_BOT':
      return {
        ...state,
        bots: [...state.bots, action.payload]
      };
    
    case 'UPDATE_BOT':
      return {
        ...state,
        bots: state.bots.map(bot =>
          bot.id === action.payload.id ? action.payload : bot
        )
      };
    
    case 'DELETE_BOT':
      return {
        ...state,
        bots: state.bots.filter(bot => bot.id !== action.payload)
      };
    
    case 'DELETE_REVIEW':
      return {
        ...state,
        bots: state.bots.map(bot =>
          bot.id === action.payload.botId
            ? {
                ...bot,
                reviews: bot.reviews.filter(review => review.id !== action.payload.reviewId)
              }
            : bot
        )
      };
    
    case 'TOGGLE_ADMIN':
      return { ...state, isAdmin: action.payload, adminClickCount: 0 };
    
    case 'INCREMENT_ADMIN_CLICK':
      return { ...state, adminClickCount: state.adminClickCount + 1 };
    
    case 'RESET_ADMIN_CLICK':
      return { ...state, adminClickCount: 0 };
    
    case 'DOWNLOAD_BOT':
      return {
        ...state,
        bots: state.bots.map(bot =>
          bot.id === action.payload
            ? { ...bot, downloads: bot.downloads + 1 }
            : bot
        )
      };
    
    default:
      return state;
  }
};

const calculateNewRating = (existingReviews: Review[], newRating: number): number => {
  const totalRating = existingReviews.reduce((sum, review) => sum + review.rating, 0) + newRating;
  return Math.round((totalRating / (existingReviews.length + 1)) * 10) / 10;
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  getAdminStats: () => AdminStats;
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getAdminStats = (): AdminStats => {
    const totalBots = state.bots.length;
    const totalDownloads = state.bots.reduce((sum, bot) => sum + bot.downloads, 0);
    const totalLikes = state.bots.reduce((sum, bot) => sum + bot.likes, 0);
    const totalReviews = state.bots.reduce((sum, bot) => sum + bot.reviews.length, 0);

    const monthlyStats = [
      { month: 'Jan', downloads: Math.floor(totalDownloads * 0.2), likes: Math.floor(totalLikes * 0.2) },
      { month: 'Feb', downloads: Math.floor(totalDownloads * 0.3), likes: Math.floor(totalLikes * 0.3) },
      { month: 'Mar', downloads: Math.floor(totalDownloads * 0.5), likes: Math.floor(totalLikes * 0.5) }
    ];

    const categoryDistribution = [
      { category: 'Moderation', count: state.bots.filter(b => b.category === 'moderation').length },
      { category: 'Music', count: state.bots.filter(b => b.category === 'music').length },
      { category: 'Games', count: state.bots.filter(b => b.category === 'games').length },
      { category: 'Economy', count: state.bots.filter(b => b.category === 'economy').length },
      { category: 'Utility', count: state.bots.filter(b => b.category === 'utility').length },
      { category: 'Fun', count: state.bots.filter(b => b.category === 'fun').length }
    ];

    return {
      totalBots,
      totalDownloads,
      totalLikes,
      totalReviews,
      monthlyStats,
      categoryDistribution
    };
  };

  return (
    <AppContext.Provider value={{ state, dispatch, getAdminStats }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};