import React from 'react';
import { Shield, Music, Gamepad2, DollarSign, Settings, Smile } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const categories = [
  { id: 'all', name: 'All Categories', icon: Settings, color: 'bg-gray-500' },
  { id: 'moderation', name: 'Moderation', icon: Shield, color: 'bg-red-500' },
  { id: 'music', name: 'Music', icon: Music, color: 'bg-purple-500' },
  { id: 'games', name: 'Games', icon: Gamepad2, color: 'bg-blue-500' },
  { id: 'economy', name: 'Economy', icon: DollarSign, color: 'bg-green-500' },
  { id: 'utility', name: 'Utility', icon: Settings, color: 'bg-orange-500' },
  { id: 'fun', name: 'Fun', icon: Smile, color: 'bg-pink-500' }
];

const CategoryFilter: React.FC = () => {
  const { state, dispatch } = useApp();

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = state.selectedCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category.id })}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
              isSelected
                ? `${category.color} text-white shadow-lg`
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;