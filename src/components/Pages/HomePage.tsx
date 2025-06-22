import React from 'react';
import { Bot, ArrowRight, Download, Users, Star, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const HomePage: React.FC = () => {
  const { dispatch } = useApp();

  const navigateToBots = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'bots' });
  };

  const handleAdminClick = () => {
    dispatch({ type: 'INCREMENT_ADMIN_CLICK' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl cursor-pointer transform transition-transform hover:scale-105"
                onClick={handleAdminClick}
              >
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Bolt.new
                </h1>
                <p className="text-xs text-gray-500">Discord Bot Hub</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Shield className="w-4 h-4 mr-2" />
              <span>منصة البوتات الأكثر أماناً</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
              اكتشف أفضل
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block">
                بوتات ديسكورد
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              استكشف مجموعتنا المختارة بعناية من بوتات ديسكورد المتميزة. من الإدارة إلى الموسيقى، 
              من الألعاب إلى الأنظمة الاقتصادية - اعثر على البوت المثالي لخادمك.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button 
                onClick={navigateToBots}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
              >
                <span>تصفح البوتات</span>
                <ArrowRight className="w-6 h-6" />
              </button>
              <button className="border-2 border-emerald-500 text-emerald-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all">
                تعرف أكثر
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-emerald-100">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">خادم سعيد</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-teal-100">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 rounded-2xl">
                  <Download className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-teal-600 mb-2">50K+</div>
              <div className="text-gray-600 font-medium">تحميل</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-cyan-100">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">دعم فني</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-gradient-to-r from-red-400 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">بوتات الإدارة</h3>
              <p className="text-gray-600">أدوات قوية لإدارة وحماية خادمك</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-gradient-to-r from-purple-400 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">بوتات الموسيقى</h3>
              <p className="text-gray-600">استمتع بأفضل تجربة موسيقية</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">بوتات الألعاب</h3>
              <p className="text-gray-600">ألعاب تفاعلية ممتعة لأعضائك</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">بوتات الاقتصاد</h3>
              <p className="text-gray-600">أنظمة اقتصادية متكاملة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Bolt.new</h3>
              <p className="text-gray-400 text-sm">Discord Bot Hub</p>
            </div>
          </div>
          <p className="text-gray-400">
            © 2024 Bolt.new. صُنع بحب لمجتمع ديسكورد العربي.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;