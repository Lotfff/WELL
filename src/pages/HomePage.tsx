import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Users, Star, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';
import CategoryCard from '../components/Home/CategoryCard';
import FeaturedProjects from '../components/Home/FeaturedProjects';
import StatsSection from '../components/Home/StatsSection';

const HomePage: React.FC = () => {
  const { state } = useData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Tech Resource
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                Platform
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover cutting-edge tools, frameworks, and resources across cybersecurity, 
              system administration, AI, and web development. Built by experts, for experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/category/cybersecurity"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
              >
                <span>Explore Resources</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-blue-400 text-blue-400 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-400 hover:text-white transition-all"
              >
                Admin Access
              </Link>
            </div>

            <StatsSection />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully curated categories of professional-grade tools and resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {state.categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked projects that showcase the best in each category.
            </p>
          </div>

          <FeaturedProjects />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers and professionals who trust our platform for their projects.
          </p>
          <Link
            to="/category/webdev"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;