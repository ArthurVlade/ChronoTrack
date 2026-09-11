import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { EmployeeTracker } from './components/EmployeeTracker';
import { ManagerDashboard } from './components/ManagerDashboard';
import { ProjectManager } from './components/ProjectManager';
import { DocsAndTutorialView } from './components/DocsAndTutorialView';
import { ManualTimeModal } from './components/ManualTimeModal';
import { ExportModal } from './components/ExportModal';
import { AuthModal } from './components/AuthModal';
import { InviteEmployeeModal } from './components/InviteEmployeeModal';
import { DesktopAgentModal } from './components/DesktopAgentModal';
import { EditProfileModal } from './components/EditProfileModal';
import { HomePage } from './components/HomePage';
import { LoginScreen } from './components/LoginScreen';
import { PrintableReport } from './components/PrintableReport';

const MainContent: React.FC = () => {
  const {
    isAuthenticated,
    currentUser,
    activeView,
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    profileModalTargetUser,
    setProfileModalTargetUser
  } = useApp();

  // Authentication staging: Home landing page -> Login screen -> Tracker screen
  const [unauthStage, setUnauthStage] = useState<'home' | 'login'>('home');
  const [presetAccount, setPresetAccount] = useState<{ email: string; pass: string } | null>(null);

  if (!isAuthenticated) {
    if (unauthStage === 'home') {
      return (
        <HomePage
          onGoToLogin={(account) => {
            setPresetAccount(account || null);
            setUnauthStage('login');
          }}
        />
      );
    }

    return (
      <LoginScreen
        onBackToHome={() => setUnauthStage('home')}
        initialAccount={presetAccount}
      />
    );
  }

  // Guard: if non-owner is somehow on an owner-only screen, redirect them
  const isOwner = currentUser.role === 'owner';
  const effectiveView = (!isOwner && (activeView === 'dashboard' || activeView === 'payroll' || activeView === 'projects'))
    ? 'tracker'
    : activeView;

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F4F9] dark:bg-[#0D121D] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="no-print flex flex-col flex-1">
        <Header />
        
        <main className="flex-1 pb-16">
          {effectiveView === 'docs' ? (
            <DocsAndTutorialView />
          ) : effectiveView === 'projects' ? (
            <ProjectManager />
          ) : effectiveView === 'tracker' ? (
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
      <InviteEmployeeModal />
      <DesktopAgentModal />
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        targetUser={profileModalTargetUser}
        onClose={() => {
          setIsEditProfileModalOpen(false);
          setProfileModalTargetUser(null);
        }}
      />
      
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
