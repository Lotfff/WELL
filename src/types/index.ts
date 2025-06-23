export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  projectCount: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  technicalSpecs: TechnicalSpec[];
  implementationGuide: string;
  resources: Resource[];
  files: ProjectFile[];
  githubUrl?: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  downloads: number;
  views: number;
}

export interface TechnicalSpec {
  id: string;
  category: string;
  requirements: string[];
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'tool' | 'library';
}

export interface ProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
  version: string;
}

export interface Review {
  id: string;
  projectId: string;
  username: string;
  email: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface AdminStats {
  totalProjects: number;
  totalDownloads: number;
  totalReviews: number;
  pendingReviews: number;
  categoryStats: {
    categoryId: string;
    name: string;
    projectCount: number;
    downloads: number;
  }[];
  recentActivity: {
    type: 'project_added' | 'review_submitted' | 'file_uploaded';
    description: string;
    timestamp: Date;
  }[];
}