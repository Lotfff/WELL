export interface Bot {
  id: string;
  name: string;
  description: string;
  category: 'moderation' | 'music' | 'games' | 'economy' | 'utility' | 'fun';
  downloadLink: string;
  githubLink?: string;
  likes: number;
  downloads: number;
  rating: number;
  reviews: Review[];
  imageUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
}

export interface Review {
  id: string;
  botId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: Date;
  reported: boolean;
}

export interface AdminStats {
  totalBots: number;
  totalDownloads: number;
  totalLikes: number;
  totalReviews: number;
  monthlyStats: {
    month: string;
    downloads: number;
    likes: number;
  }[];
  categoryDistribution: {
    category: string;
    count: number;
  }[];
}