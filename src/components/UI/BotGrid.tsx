import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import BotCard from './BotCard';
import CategoryFilter from './CategoryFilter';

const BotGrid: React.FC = () => {
  const { state } = useApp();

  const filteredBots = useMemo(() => {
    let filtered = state.bots;

    // Filter by category
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(bot => bot.category === state.selectedCategory);
    }

    // Filter by search query
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(bot =>
        bot.name.toLowerCase().includes(query) ||
        bot.description.toLowerCase().includes(query) ||
        bot.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort by featured first, then by rating
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }, [state.bots, state.selectedCategory, state.searchQuery]);

  return (
    <section id="bots" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Premium Discord Bots
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully curated collection of high-quality bots, 
            each designed to enhance your Discord server experience.
          </p>
        </div>

        <CategoryFilter />

        {filteredBots.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No bots found</h3>
            <p className="text-gray-600">
              Try adjusting your search or category filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-gray-600">
              Showing {filteredBots.length} bot{filteredBots.length !== 1 ? 's' : ''}
              {state.selectedCategory !== 'all' && (
                <span> in {state.selectedCategory}</span>
              )}
              {state.searchQuery && (
                <span> matching "{state.searchQuery}"</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBots.map((bot) => (
                <BotCard key={bot.id} bot={bot} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BotGrid;