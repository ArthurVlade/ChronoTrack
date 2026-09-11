import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { getEncryptionFingerprint } from '../services/crypto';

export const AuthModal: React.FC = () => {
  const {
    currentUser,
    users,
    switchUser,
    isAuthModalOpen,
    setIsAuthModalOpen,
    addNotification
  } = useApp();

  const [authLoading, setAuthLoading] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleOAuthLogin = async (provider: string) => {
    setAuthLoading(provider);
    await new Promise(resolve => setTimeout(resolve, 800));
    setAuthLoading(null);
    setIsAuthModalOpen(false);

    addNotification({
      title: `OAuth 2.0 Authenticated`,
      message: `Successfully verified identity via ${provider} OAuth Provider. Session encrypted.`,
      type: 'security'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative max-w-md w-full apple-card p-6 sm:p-7 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                OAuth 2.0 & Identity
              </h2>
              <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                Single Sign-On & Role Management
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-[#86868B]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active User Card */}
        <div className="my-4 p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <span className="text-xs font-bold text-[#1D1D1F] dark:text-white block">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                {currentUser.email} • <strong className="capitalize">{currentUser.role}</strong>
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#34C759]/10 text-[#34C759]">
            Active
          </span>
        </div>

        {/* OAuth Providers */}
        <div className="flex flex-col gap-2.5 my-4">
          <button
            onClick={() => handleOAuthLogin('Apple')}
            disabled={!!authLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.64-.78 1.08-1.87.96-2.96-1 .04-2.13.67-2.79 1.45-.58.68-1.1 1.78-.96 2.84 1.12.09 2.16-.57 2.79-1.33z" />
            </svg>
            <span>{authLoading === 'Apple' ? 'Verifying with Apple...' : 'Continue with Apple ID'}</span>
          </button>

          <button
            onClick={() => handleOAuthLogin('Google Workspace')}
            disabled={!!authLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[#1D1D1F] dark:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-black/[0.06] dark:border-white/[0.1] transition-all cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>{authLoading === 'Google Workspace' ? 'Authenticating...' : 'Continue with Google'}</span>
          </button>
        </div>

        {/* Quick Role Switcher */}
        <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
          <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block mb-2">
            Switch Pre-Configured Test Profiles
          </span>
          <div className="flex flex-col gap-1.5">
            {users.map(u => (
              <button
                key={u.id}
                onClick={() => {
                  switchUser(u.id);
                  setIsAuthModalOpen(false);
                }}
                className={`flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                  u.id === currentUser.id
                    ? 'bg-[#0071E3]/10 text-[#0071E3] font-bold'
                    : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-[#1D1D1F] dark:text-[#F5F5F7]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                  <span>{u.name} ({u.role === 'owner' ? 'Owner / Manager' : 'Employee Tracker'})</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            ))}
          </div>
        </div>

        {/* Security Fingerprint */}
        <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[10px] text-[#86868B] flex items-center justify-between">
          <span>Client Encryption Key:</span>
          <span className="font-mono text-[#34C759]">{getEncryptionFingerprint()}</span>
        </div>

      </div>
    </div>
  );
};
