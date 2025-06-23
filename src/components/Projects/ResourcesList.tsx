import React from 'react';
import { ExternalLink, Book, Video, Tool, Package } from 'lucide-react';
import { Resource } from '../../types';

interface ResourcesListProps {
  resources: Resource[];
}

const ResourcesList: React.FC<ResourcesListProps> = ({ resources }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'documentation': return Book;
      case 'tutorial': return Video;
      case 'tool': return Tool;
      case 'library': return Package;
      default: return ExternalLink;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'documentation': return 'bg-blue-100 text-blue-800';
      case 'tutorial': return 'bg-green-100 text-green-800';
      case 'tool': return 'bg-purple-100 text-purple-800';
      case 'library': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
      
      {resources.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No resources available</p>
      ) : (
        <div className="space-y-4">
          {resources.map((resource) => {
            const Icon = getIcon(resource.type);
            return (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex-shrink-0 mr-4">
                  <Icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                    {resource.title}
                  </h3>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResourcesList;