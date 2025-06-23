import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Server, Brain, Code } from 'lucide-react';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return Shield;
      case 'Server': return Server;
      case 'Brain': return Brain;
      case 'Code': return Code;
      default: return Code;
    }
  };

  const Icon = getIcon(category.icon);

  return (
    <Link
      to={`/category/${category.id}`}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
    >
      <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
        <Icon className="w-16 h-16 text-white" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {category.projectCount} project{category.projectCount !== 1 ? 's' : ''}
          </span>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            Explore
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;