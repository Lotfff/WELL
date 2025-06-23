import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Category, Project, Review, AdminStats } from '../types';
import { mockCategories, mockProjects, mockReviews } from '../data/mockData';

interface DataState {
  categories: Category[];
  projects: Project[];
  reviews: Review[];
}

type DataAction =
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'UPDATE_REVIEW'; payload: Review }
  | { type: 'DELETE_REVIEW'; payload: string }
  | { type: 'APPROVE_REVIEW'; payload: string }
  | { type: 'REJECT_REVIEW'; payload: string }
  | { type: 'INCREMENT_DOWNLOADS'; payload: string }
  | { type: 'INCREMENT_VIEWS'; payload: string };

const initialState: DataState = {
  categories: mockCategories,
  projects: mockProjects,
  reviews: mockReviews,
};

const dataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
        categories: state.categories.map(cat =>
          cat.id === action.payload.categoryId
            ? { ...cat, projectCount: cat.projectCount + 1 }
            : cat
        ),
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? action.payload : project
        ),
      };

    case 'DELETE_PROJECT':
      const projectToDelete = state.projects.find(p => p.id === action.payload);
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        categories: projectToDelete
          ? state.categories.map(cat =>
              cat.id === projectToDelete.categoryId
                ? { ...cat, projectCount: Math.max(0, cat.projectCount - 1) }
                : cat
            )
          : state.categories,
      };

    case 'ADD_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case 'UPDATE_REVIEW':
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.id === action.payload.id ? action.payload : review
        ),
      };

    case 'DELETE_REVIEW':
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.payload),
      };

    case 'APPROVE_REVIEW':
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.id === action.payload
            ? { ...review, status: 'approved' as const }
            : review
        ),
      };

    case 'REJECT_REVIEW':
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.id === action.payload
            ? { ...review, status: 'rejected' as const }
            : review
        ),
      };

    case 'INCREMENT_DOWNLOADS':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload
            ? { ...project, downloads: project.downloads + 1 }
            : project
        ),
      };

    case 'INCREMENT_VIEWS':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload
            ? { ...project, views: project.views + 1 }
            : project
        ),
      };

    default:
      return state;
  }
};

const DataContext = createContext<{
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
  getAdminStats: () => AdminStats;
} | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const getAdminStats = (): AdminStats => {
    const totalProjects = state.projects.length;
    const totalDownloads = state.projects.reduce((sum, project) => sum + project.downloads, 0);
    const totalReviews = state.reviews.length;
    const pendingReviews = state.reviews.filter(review => review.status === 'pending').length;

    const categoryStats = state.categories.map(category => ({
      categoryId: category.id,
      name: category.name,
      projectCount: state.projects.filter(p => p.categoryId === category.id).length,
      downloads: state.projects
        .filter(p => p.categoryId === category.id)
        .reduce((sum, p) => sum + p.downloads, 0),
    }));

    const recentActivity = [
      ...state.projects.slice(-3).map(project => ({
        type: 'project_added' as const,
        description: `New project "${project.title}" added`,
        timestamp: project.createdAt,
      })),
      ...state.reviews.slice(-3).map(review => ({
        type: 'review_submitted' as const,
        description: `New review submitted by ${review.username}`,
        timestamp: review.createdAt,
      })),
    ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5);

    return {
      totalProjects,
      totalDownloads,
      totalReviews,
      pendingReviews,
      categoryStats,
      recentActivity,
    };
  };

  return (
    <DataContext.Provider value={{ state, dispatch, getAdminStats }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};