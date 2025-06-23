import { Category, Project, Review } from '../types';

export const mockCategories: Category[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Security tools, frameworks, and best practices for protecting digital assets',
    icon: 'Shield',
    color: 'from-red-500 to-red-600',
    projectCount: 12,
  },
  {
    id: 'sysadmin',
    name: 'System Administration',
    description: 'Tools and scripts for managing servers, networks, and infrastructure',
    icon: 'Server',
    color: 'from-blue-500 to-blue-600',
    projectCount: 8,
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Machine learning models, AI frameworks, and intelligent automation',
    icon: 'Brain',
    color: 'from-purple-500 to-purple-600',
    projectCount: 15,
  },
  {
    id: 'webdev',
    name: 'Web Development',
    description: 'Modern web applications, frameworks, and development tools',
    icon: 'Code',
    color: 'from-green-500 to-green-600',
    projectCount: 20,
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Advanced Network Scanner',
    description: 'A comprehensive network scanning tool with vulnerability detection capabilities. Features port scanning, service enumeration, and security assessment.',
    categoryId: 'cybersecurity',
    technicalSpecs: [
      {
        id: '1',
        category: 'System Requirements',
        requirements: ['Python 3.8+', 'Linux/Windows/macOS', '2GB RAM minimum', 'Network access'],
      },
      {
        id: '2',
        category: 'Dependencies',
        requirements: ['nmap', 'python-nmap', 'requests', 'beautifulsoup4'],
      },
    ],
    implementationGuide: `# Network Scanner Implementation Guide

## Installation
1. Clone the repository
2. Install dependencies: \`pip install -r requirements.txt\`
3. Configure network settings in config.json
4. Run: \`python scanner.py --target <IP_RANGE>\`

## Usage Examples
- Basic scan: \`python scanner.py -t 192.168.1.0/24\`
- Vulnerability scan: \`python scanner.py -t 192.168.1.1 --vuln\`
- Service detection: \`python scanner.py -t 192.168.1.1 --services\`

## Configuration
Edit config.json to customize scan parameters, timeout values, and output formats.`,
    resources: [
      {
        id: '1',
        title: 'Nmap Documentation',
        url: 'https://nmap.org/docs.html',
        type: 'documentation',
      },
      {
        id: '2',
        title: 'Python Network Programming',
        url: 'https://docs.python.org/3/library/socket.html',
        type: 'documentation',
      },
    ],
    files: [
      {
        id: '1',
        name: 'network-scanner-v2.1.zip',
        size: 2048576,
        type: 'application/zip',
        url: '/downloads/network-scanner-v2.1.zip',
        uploadedAt: new Date('2024-01-15'),
        version: '2.1',
      },
    ],
    githubUrl: 'https://github.com/example/network-scanner',
    tags: ['security', 'networking', 'python', 'vulnerability'],
    difficulty: 'Advanced',
    estimatedTime: '4-6 hours',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    featured: true,
    downloads: 1247,
    views: 3521,
  },
  {
    id: '2',
    title: 'Server Monitoring Dashboard',
    description: 'Real-time server monitoring solution with alerting, metrics collection, and performance analytics.',
    categoryId: 'sysadmin',
    technicalSpecs: [
      {
        id: '1',
        category: 'System Requirements',
        requirements: ['Node.js 16+', 'Docker (optional)', '4GB RAM', 'Linux/Windows Server'],
      },
      {
        id: '2',
        category: 'Technologies',
        requirements: ['React', 'Express.js', 'InfluxDB', 'Grafana'],
      },
    ],
    implementationGuide: `# Server Monitoring Setup

## Quick Start
1. Install Node.js and npm
2. Clone repository: \`git clone <repo-url>\`
3. Install dependencies: \`npm install\`
4. Configure environment: \`cp .env.example .env\`
5. Start services: \`npm run start\`

## Docker Deployment
\`\`\`bash
docker-compose up -d
\`\`\`

## Configuration
- Edit \`config/monitoring.json\` for custom metrics
- Set up alerts in \`config/alerts.json\`
- Configure data retention policies`,
    resources: [
      {
        id: '1',
        title: 'InfluxDB Documentation',
        url: 'https://docs.influxdata.com/',
        type: 'documentation',
      },
      {
        id: '2',
        title: 'Grafana Tutorials',
        url: 'https://grafana.com/tutorials/',
        type: 'tutorial',
      },
    ],
    files: [
      {
        id: '1',
        name: 'monitoring-dashboard-v1.5.tar.gz',
        size: 15728640,
        type: 'application/gzip',
        url: '/downloads/monitoring-dashboard-v1.5.tar.gz',
        uploadedAt: new Date('2024-01-20'),
        version: '1.5',
      },
    ],
    githubUrl: 'https://github.com/example/server-monitoring',
    tags: ['monitoring', 'dashboard', 'nodejs', 'docker'],
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-20'),
    featured: true,
    downloads: 892,
    views: 2134,
  },
  {
    id: '3',
    title: 'ML Model Deployment Pipeline',
    description: 'Automated pipeline for deploying machine learning models with CI/CD integration and monitoring.',
    categoryId: 'ai',
    technicalSpecs: [
      {
        id: '1',
        category: 'System Requirements',
        requirements: ['Python 3.9+', 'Docker', 'Kubernetes (optional)', '8GB RAM'],
      },
      {
        id: '2',
        category: 'ML Frameworks',
        requirements: ['TensorFlow 2.x', 'PyTorch', 'Scikit-learn', 'MLflow'],
      },
    ],
    implementationGuide: `# ML Deployment Pipeline

## Setup
1. Install Python dependencies: \`pip install -r requirements.txt\`
2. Configure MLflow tracking server
3. Set up model registry
4. Deploy using Docker: \`docker build -t ml-pipeline .\`

## Model Training
\`\`\`python
python train_model.py --config config/model_config.yaml
\`\`\`

## Deployment
\`\`\`bash
python deploy.py --model-name my-model --version 1.0
\`\`\`

## Monitoring
Access monitoring dashboard at http://localhost:8080/monitoring`,
    resources: [
      {
        id: '1',
        title: 'MLflow Documentation',
        url: 'https://mlflow.org/docs/latest/index.html',
        type: 'documentation',
      },
      {
        id: '2',
        title: 'Model Deployment Best Practices',
        url: 'https://ml-ops.org/',
        type: 'tutorial',
      },
    ],
    files: [
      {
        id: '1',
        name: 'ml-pipeline-v3.0.zip',
        size: 52428800,
        type: 'application/zip',
        url: '/downloads/ml-pipeline-v3.0.zip',
        uploadedAt: new Date('2024-01-25'),
        version: '3.0',
      },
    ],
    githubUrl: 'https://github.com/example/ml-deployment',
    tags: ['machine-learning', 'deployment', 'mlops', 'python'],
    difficulty: 'Advanced',
    estimatedTime: '6-8 hours',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-25'),
    featured: true,
    downloads: 1543,
    views: 4102,
  },
  {
    id: '4',
    title: 'React E-commerce Platform',
    description: 'Full-featured e-commerce platform built with React, Node.js, and modern web technologies.',
    categoryId: 'webdev',
    technicalSpecs: [
      {
        id: '1',
        category: 'Frontend',
        requirements: ['React 18+', 'TypeScript', 'Tailwind CSS', 'Vite'],
      },
      {
        id: '2',
        category: 'Backend',
        requirements: ['Node.js 18+', 'Express.js', 'MongoDB', 'JWT Authentication'],
      },
    ],
    implementationGuide: `# E-commerce Platform Setup

## Frontend Setup
1. Navigate to frontend directory: \`cd frontend\`
2. Install dependencies: \`npm install\`
3. Start development server: \`npm run dev\`

## Backend Setup
1. Navigate to backend directory: \`cd backend\`
2. Install dependencies: \`npm install\`
3. Configure environment variables
4. Start server: \`npm run start\`

## Database Setup
1. Install MongoDB
2. Create database: \`ecommerce_db\`
3. Run migrations: \`npm run migrate\`

## Features
- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart and checkout process
- Order management and tracking
- Admin dashboard for inventory management`,
    resources: [
      {
        id: '1',
        title: 'React Documentation',
        url: 'https://react.dev/',
        type: 'documentation',
      },
      {
        id: '2',
        title: 'E-commerce Best Practices',
        url: 'https://web.dev/ecommerce/',
        type: 'tutorial',
      },
    ],
    files: [
      {
        id: '1',
        name: 'ecommerce-platform-v2.3.zip',
        size: 31457280,
        type: 'application/zip',
        url: '/downloads/ecommerce-platform-v2.3.zip',
        uploadedAt: new Date('2024-01-28'),
        version: '2.3',
      },
    ],
    githubUrl: 'https://github.com/example/react-ecommerce',
    tags: ['react', 'ecommerce', 'nodejs', 'mongodb'],
    difficulty: 'Intermediate',
    estimatedTime: '8-12 hours',
    createdAt: new Date('2024-01-26'),
    updatedAt: new Date('2024-01-28'),
    featured: false,
    downloads: 743,
    views: 1876,
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    projectId: '1',
    username: 'SecurityExpert',
    email: 'expert@security.com',
    rating: 5,
    comment: 'Excellent network scanner! Very comprehensive and easy to use. The vulnerability detection feature is particularly impressive.',
    status: 'approved',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '2',
    projectId: '1',
    username: 'NetworkAdmin',
    email: 'admin@network.com',
    rating: 4,
    comment: 'Great tool for network assessment. Documentation could be more detailed, but overall very useful.',
    status: 'approved',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '3',
    projectId: '2',
    username: 'DevOpsEngineer',
    email: 'devops@company.com',
    rating: 5,
    comment: 'Perfect monitoring solution! Easy to deploy and provides excellent insights into server performance.',
    status: 'pending',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21'),
  },
];