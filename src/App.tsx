import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/UI/Header';
import Hero from './components/UI/Hero';
import BotGrid from './components/UI/BotGrid';
import Footer from './components/UI/Footer';
import AdminPanel from './components/Admin/AdminPanel';
import { useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const { state } = useApp();

  if (state.isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <BotGrid />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;