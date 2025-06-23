import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import FloatingBot from '../3D/FloatingBot';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Welcome to the Future of Discord Bots</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Discover
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Amazing Bots
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Explore our curated collection of premium Discord bots. From moderation to music, 
              games to economy systems - find the perfect bot for your server.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => document.getElementById('bots')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Browse Bots
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all">
                Learn More
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-gray-600">Happy Servers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">50K+</div>
                <div className="text-gray-600">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
          
          {/* 3D Bot */}
          <div className="relative">
            <FloatingBot />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-center">
              <div className="animate-bounce">
                <ArrowDown className="w-6 h-6 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-500 mt-2">Interact with our bot!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;