import React from 'react';
import { Shield, Music, Gamepad2, DollarSign, Settings, Smile } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const categories = [
  { id: 'all', name: 'جميع الفئات', icon: Settings, color: 'bg-gray-500' },
  { id: 'moderation', name: 'إدارة', icon: Shield, color: 'bg-red-500' },
  { id: 'music', name: 'موسيقى', icon: Music, color: 'bg-purple-500' },
  { id: 'games', name: 'ألعاب', icon: Gamepad2, color: 'bg-blue-500' },
  { id: 'economy', name: 'اقتصاد', icon: DollarSign, color: 'bg-emerald-500' },
  { id: 'utility', name: 'أدوات', icon: Settings, color: 'bg-orange-500' },
  { id: 'fun', name: 'ترفيه', icon: Smile, color: 'bg-pink-500' }
];

const CategoryFilter: React.FC = () => {
  const { state, dispatch } = useApp();

  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = state.selectedCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category.id })}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
              isSelected
                ? `${category.color} text-white shadow-lg`
                : 'bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;