import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Github, Star, Eye, Clock, Tag, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import ReviewSection from '../components/Projects/ReviewSection';
import TechnicalSpecs from '../components/Projects/TechnicalSpecs';
import ImplementationGuide from '../components/Projects/ImplementationGuide';
import ResourcesList from '../components/Projects/ResourcesList';
import FilesList from '../components/Projects/FilesList';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { state, dispatch } = useData();
  const [activeTab, setActiveTab] = useState('overview');

  const project = state.projects.find(p => p.id === projectId);
  const category = project ? state.categories.find(c => c.id === project.categoryId) : null;

  useEffect(() => {
    if (project) {
      dispatch({ type: 'INCREMENT_VIEWS', payload: project.id });
    }
  }, [project, dispatch]);

  if (!project || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    dispatch({ type: 'INCREMENT_DOWNLOADS', payload: project.id });
    // In a real app, this would trigger the actual download
    window.open(project.files[0]?.url || project.githubUrl, '_blank');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'specs', name: 'Technical Specs' },
    { id: 'implementation', name: 'Implementation' },
    { id: 'resources', name: 'Resources' },
    { id: 'files', name: 'Files' },
    { id: 'reviews', name: 'Reviews' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to={`/category/${category.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to {category.name}
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
                {project.featured && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
              <p className="text-gray-600 text-lg mb-6">{project.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
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
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:w-80">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <div className="space-y-4">
                  <button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2 font-medium"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Project</span>
                  </button>
                  
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2 font-medium"
                    >
                      <Github className="w-5 h-5" />
                      <span>View on GitHub</span>
                    </a>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Project Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-medium">{project.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Time:</span>
                      <span className="font-medium">{project.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{project.updatedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="prose max-w-none">
            <h2>Project Overview</h2>
            <p>{project.description}</p>
            <h3>Key Features</h3>
            <ul>
              {project.tags.map((tag) => (
                <li key={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)} functionality</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'specs' && <TechnicalSpecs specs={project.technicalSpecs} />}
        {activeTab === 'implementation' && <ImplementationGuide guide={project.implementationGuide} />}
        {activeTab === 'resources' && <ResourcesList resources={project.resources} />}
        {activeTab === 'files' && <FilesList files={project.files} onDownload={handleDownload} />}
        {activeTab === 'reviews' && <ReviewSection projectId={project.id} />}
      </div>
    </div>
  );
};

export default ProjectDetailPage;