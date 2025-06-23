import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Eye, Clock, Tag, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { useData } from '../../context/DataContext';

interface ProjectListProps {
  project: Project;
}

const ProjectList: React.FC<ProjectListProps> = ({ project }) => {
  const { state } = useData();
  const category = state.categories.find(cat => cat.id === project.categoryId);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <Link
              to={`/project/${project.id}`}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {project.title}
            </Link>
            
            <div className="flex items-center space-x-2">
              {project.featured && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                {project.difficulty}
              </span>
              {category && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.name}
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {project.views.toLocaleString()} views
              </div>
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                {project.downloads.toLocaleString()} downloads
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {project.estimatedTime}
              </div>
              <div className="text-xs text-gray-400">
                Updated {project.updatedAt.toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              <Link
                to={`/project/${project.id}`}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>View Details</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;