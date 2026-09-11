import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { EmployeeTracker } from './components/EmployeeTracker';
import { ManagerDashboard } from './components/ManagerDashboard';
import { ManualTimeModal } from './components/ManualTimeModal';
import { ExportModal } from './components/ExportModal';
import { AuthModal } from './components/AuthModal';
import { PrintableReport } from './components/PrintableReport';

const MainContent: React.FC = () => {
  const { currentUser, activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-200">
      <div className="no-print flex flex-col flex-1">
        <Header />
        
        <main className="flex-1 pb-16">
          {activeView === 'tracker' ? (
            <EmployeeTracker />
          ) : (
            <ManagerDashboard />
          )}
        </main>
      </div>

      {/* Global Modals & Sheets */}
      <ManualTimeModal />
      <ExportModal />
      <AuthModal />
      
      {/* Hidden container formatted for clean vector PDF printing */}
      <PrintableReport />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
