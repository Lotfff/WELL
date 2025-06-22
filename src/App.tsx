import React from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import HomePage from './components/Pages/HomePage';
import BotsPage from './components/Pages/BotsPage';
import AdminPanel from './components/Admin/AdminPanel';

const AppContent: React.FC = () => {
  const { state } = useApp();

  if (state.isAdmin) {
    return <AdminPanel />;
  }

  if (state.currentPage === 'bots') {
    return <BotsPage />;
  }

  return <HomePage />;
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;