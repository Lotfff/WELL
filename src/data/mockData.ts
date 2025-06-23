import { Bot, Review } from '../types';

const botReviews: Review[] = [
  {
    id: '1',
    botId: '1',
    username: 'Discord User',
    rating: 5,
    comment: 'Amazing moderation bot! Works perfectly.',
    createdAt: new Date('2024-01-15'),
    reported: false
  },
  {
    id: '2',
    botId: '1',
    username: 'ServerOwner123',
    rating: 4,
    comment: 'Great features, easy to setup.',
    createdAt: new Date('2024-01-20'),
    reported: false
  },
  {
    id: '3',
    botId: '2',
    username: 'MusicLover',
    rating: 5,
    comment: 'Best music bot I\'ve used! Clear audio quality.',
    createdAt: new Date('2024-01-18'),
    reported: false
  }
];

export const mockBots: Bot[] = [
  {
    id: '1',
    name: 'ModGuard Pro',
    description: 'Advanced moderation bot with auto-moderation, warning system, and detailed logging. Perfect for large servers.',
    category: 'moderation',
    downloadLink: '/downloads/modguard-pro.js',
    githubLink: 'https://github.com/example/modguard-pro',
    likes: 1247,
    downloads: 3521,
    rating: 4.8,
    reviews: botReviews.filter(r => r.botId === '1'),
    imageUrl: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['moderation', 'auto-mod', 'logging', 'warnings'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-25'),
    featured: true
  },
  {
    id: '2',
    name: 'Harmony Music',
    description: 'High-quality music bot with playlist support, queue management, and premium audio filters.',
    category: 'music',
    downloadLink: '/downloads/harmony-music.js',
    githubLink: 'https://github.com/example/harmony-music',
    likes: 2156,
    downloads: 5643,
    rating: 4.9,
    reviews: botReviews.filter(r => r.botId === '2'),
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['music', 'playlists', 'filters', 'queue'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-28'),
    featured: true
  },
  {
    id: '3',
    name: 'GameMaster',
    description: 'Fun gaming bot with trivia, word games, and multiplayer challenges for your Discord server.',
    category: 'games',
    downloadLink: '/downloads/gamemaster.js',
    likes: 892,
    downloads: 2134,
    rating: 4.6,
    reviews: [],
    imageUrl: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['games', 'trivia', 'multiplayer', 'fun'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-30'),
    featured: false
  },
  {
    id: '4',
    name: 'EconoBot',
    description: 'Complete economy system with virtual currency, shop, gambling, and leaderboards.',
    category: 'economy',
    downloadLink: '/downloads/econobot.js',
    likes: 1543,
    downloads: 4102,
    rating: 4.7,
    reviews: [],
    imageUrl: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['economy', 'currency', 'shop', 'gambling'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-29'),
    featured: true
  },
  {
    id: '5',
    name: 'UtilityPro',
    description: 'Essential utility commands including weather, calculator, reminders, and server information.',
    category: 'utility',
    downloadLink: '/downloads/utilitypro.js',
    likes: 743,
    downloads: 1876,
    rating: 4.4,
    reviews: [],
    imageUrl: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['utility', 'weather', 'calculator', 'reminders'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-31'),
    featured: false
  },
  {
    id: '6',
    name: 'FunBot Supreme',
    description: 'Entertainment bot with memes, jokes, random facts, and interactive mini-games.',
    category: 'fun',
    downloadLink: '/downloads/funbot-supreme.js',
    likes: 1892,
    downloads: 3847,
    rating: 4.5,
    reviews: [],
    imageUrl: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['fun', 'memes', 'jokes', 'entertainment'],
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-26'),
    featured: false
  }
];

export const profanityFilter = (text: string): boolean => {
  const badWords = ['spam', 'hate', 'toxic', 'abuse', 'inappropriate'];
  return badWords.some(word => text.toLowerCase().includes(word));
};