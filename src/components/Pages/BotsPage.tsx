import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Header from '../UI/Header';
import BotGrid from '../UI/BotGrid';
import Footer from '../UI/Footer';

const BotsPage: React.FC = () => {
  const { dispatch } = useApp();

  const goBack = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'home' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={goBack}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>العودة للرئيسية</span>
        </button>
      </div>
      
      <BotGrid />
      <Footer />
    </div>
  );
};

export default BotsPage;