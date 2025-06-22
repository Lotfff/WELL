import React from 'react';
import { Bot, Github, Twitter, Disc as Discord, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Bolt.new</h3>
                <p className="text-gray-400 text-sm">Discord Bot Hub</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              وجهتك الأولى لاكتشاف وتحميل بوتات ديسكورد عالية الجودة.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Discord className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">الفئات</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">إدارة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">موسيقى</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ألعاب</a></li>
              <li><a href="#" className="hover:text-white transition-colors">اقتصاد</a></li>
              <li><a href="#" className="hover:text-white transition-colors">أدوات</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ترفيه</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">المصادر</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">التوثيق</a></li>
              <li><a href="#" className="hover:text-white transition-colors">مرجع API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">دروس تعليمية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">دليل Discord.js</a></li>
              <li><a href="#" className="hover:text-white transition-colors">أفضل الممارسات</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="hover:text-white transition-colors">تقارير الأخطاء</a></li>
              <li><a href="#" className="hover:text-white transition-colors">طلبات الميزات</a></li>
              <li><a href="#" className="hover:text-white transition-colors">المجتمع</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 Bolt.new. صُنع بـ <Heart className="w-4 h-4 inline text-red-500" /> لمجتمع ديسكورد العربي.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-white transition-colors">شروط الخدمة</a>
              <a href="#" className="hover:text-white transition-colors">ملفات تعريف الارتباط</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;