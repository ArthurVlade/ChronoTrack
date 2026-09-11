import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  Mail,
  User as UserIcon,
  ShieldCheck,
  Key,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Ticket,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  Clock
} from 'lucide-react';
import { findInviteByCode } from '../services/storage';

interface LoginScreenProps {
  onBackToHome?: () => void;
  initialAccount?: { email: string; pass: string } | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBackToHome, initialAccount }) => {
  const {
    loginWithCredentials,
    loginWithGoogle,
    joinTeamWithCode,
    isDarkMode,
    toggleDarkMode
  } = useApp();

  const [authTab, setAuthTab] = useState<'login' | 'google' | 'invite'>('login');
  
  // Standard Login State
  const [loginEmail, setLoginEmail] = useState(initialAccount?.email || '');
  const [loginPassword, setLoginPassword] = useState(initialAccount?.pass || '');
  
  // Update if initialAccount changes
  useEffect(() => {
    if (initialAccount) {
      setLoginEmail(initialAccount.email);
      setLoginPassword(initialAccount.pass);
      setAuthTab('login');
    }
  }, [initialAccount]);
  
  // Gmail State
  const [googleEmail, setGoogleEmail] = useState('harismian21@gmail.com');
  const [googleName, setGoogleName] = useState('Google Workspace User');
  
  // Invite Code State
  const [inviteCode, setInviteCode] = useState('APOLLO-2026');
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePassword, setInvitePassword] = useState('');
  
  // Feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check URL query parameters for invite code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('invite') || params.get('code');
    if (codeParam) {
      setInviteCode(codeParam.toUpperCase());
      setAuthTab('invite');
    }
  }, []);

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const user = await loginWithCredentials(loginEmail, loginPassword);
      if (!user) {
        setErrorMessage('Invalid username or password. Check your credentials and try again.');
      }
    } catch {
      setErrorMessage('Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await loginWithGoogle(googleEmail, googleName);
    } catch {
      setErrorMessage('Could not connect with Google. Try entering your email again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinWithInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!inviteCode.trim()) {
      setErrorMessage('Please enter an invite code.');
      return;
    }

    const verifiedInvite = findInviteByCode(inviteCode);
    if (!verifiedInvite) {
      setErrorMessage(`Invite code "${inviteCode}" is invalid or expired. Try "APOLLO-2026".`);
      return;
    }

    setIsLoading(true);
    try {
      const user = await joinTeamWithCode(inviteCode, inviteName || 'New Contractor', inviteEmail, invitePassword || 'welcome123');
      if (!user) {
        setErrorMessage('Failed to join team with this invite code.');
      }
    } catch {
      setErrorMessage('Error creating account with invite code.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickFillCredentials = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setErrorMessage(null);
  };

  const currentInvitePreview = findInviteByCode(inviteCode);

  return (
    <div className="min-h-screen bg-[#F1F4F9] dark:bg-[#0D121D] text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white transition-colors duration-200">
      
      {/* Top Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="mr-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 shadow-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0071E3] to-[#409CFF] text-white flex items-center justify-center shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                  ChronoTrack
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Enterprise
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Secure Authentication Gateway
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            AES-256 Authenticated
          </span>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
          </button>
        </div>
      </header>

      {/* Main Center Auth Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full apple-card p-6 sm:p-8 shadow-xl rounded-3xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#182030] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Brand & Greeting */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
              Connect to ChronoTrack
            </h1>
            <p className="text-xs sm:text-sm text-[#86868B] dark:text-[#8E8E93] mt-1">
              Sign in with your workspace credentials, connect via Gmail, or join a team with an invite code.
            </p>
          </div>

          {/* Tab Selector (Apple Segmented Style) */}
          <div className="grid grid-cols-3 p-1 rounded-2xl bg-slate-100 dark:bg-[#111722] border border-slate-200 dark:border-slate-700/80 mb-6 text-xs font-medium">
            <button
              onClick={() => { setAuthTab('login'); setErrorMessage(null); }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                authTab === 'login'
                  ? 'bg-white dark:bg-[#1E2838] text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200 dark:border-slate-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthTab('google'); setErrorMessage(null); }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                authTab === 'google'
                  ? 'bg-white dark:bg-[#1E2838] text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200 dark:border-slate-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Gmail
            </button>
            <button
              onClick={() => { setAuthTab('invite'); setErrorMessage(null); }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                authTab === 'invite'
                  ? 'bg-white dark:bg-[#1E2838] text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200 dark:border-slate-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Invite Code
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-start gap-2 text-xs text-rose-600 dark:text-rose-400 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: Standard Credentials Login */}
          {authTab === 'login' && (
            <form onSubmit={handleStandardLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Email or Username
                </label>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#111722] border border-slate-300 dark:border-slate-700 focus-within:border-blue-600 dark:focus-within:border-blue-500 transition-colors">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="sarah.jenkins@company.com or alex.rivera@company.com"
                    className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Password
                  </label>
                  <span className="text-[10px] text-slate-400">Owners require password</span>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#111722] border border-slate-300 dark:border-slate-700 focus-within:border-blue-600 dark:focus-within:border-blue-500 transition-colors">
                  <Key className="w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Verifying Identity...' : 'Sign In to Workspace'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Demo Credentials Helper Chips */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  Quick Demo Accounts (Click to Fill):
                </span>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => quickFillCredentials('sarah.jenkins@company.com', 'admin123')}
                    className="w-full py-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-[#111722] hover:bg-slate-200 dark:hover:bg-[#1A2333] border border-slate-200 dark:border-slate-700/70 text-left text-[11px] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-blue-600 dark:text-blue-400">👑 Sarah Jenkins (Owner / Manager)</span>
                    <span className="text-slate-500 font-mono">admin123</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => quickFillCredentials('alex.rivera@company.com', 'alex123')}
                    className="w-full py-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-[#111722] hover:bg-slate-200 dark:hover:bg-[#1A2333] border border-slate-200 dark:border-slate-700/70 text-left text-[11px] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200">💻 Alex Rivera (Employee Tracker)</span>
                    <span className="text-slate-500 font-mono">alex123</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => quickFillCredentials('maya.patel@company.com', 'maya123')}
                    className="w-full py-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-[#111722] hover:bg-slate-200 dark:hover:bg-[#1A2333] border border-slate-200 dark:border-slate-700/70 text-left text-[11px] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200">🎨 Maya Patel (UI Designer)</span>
                    <span className="text-slate-500 font-mono">maya123</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: Gmail Connect */}
          {authTab === 'google' && (
            <form onSubmit={handleGoogleConnect} className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1C1C1E] shadow-sm flex items-center justify-center mx-auto border border-black/[0.06] dark:border-white/[0.1]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <h3 className="text-xs font-semibold text-[#1D1D1F] dark:text-white">
                  Connect with Gmail Account
                </h3>
                <p className="text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                  Secure Single Sign-On link to sync your time logs and desktop agent.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
                  Your Google / Gmail Address
                </label>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] focus-within:border-[#0071E3]">
                  <Mail className="w-4 h-4 text-[#86868B]" />
                  <input
                    type="email"
                    required
                    value={googleEmail}
                    onChange={e => setGoogleEmail(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#1D1D1F] dark:text-white focus:outline-hidden"
                    placeholder="you@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
                  Display Name
                </label>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] focus-within:border-[#0071E3]">
                  <UserIcon className="w-4 h-4 text-[#86868B]" />
                  <input
                    type="text"
                    required
                    value={googleName}
                    onChange={e => setGoogleName(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#1D1D1F] dark:text-white focus:outline-hidden"
                    placeholder="Your Name"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#1C1C1E] hover:bg-black/[0.04] dark:hover:bg-white/[0.08] text-[#1D1D1F] dark:text-white font-semibold text-xs flex items-center justify-center gap-2.5 border border-black/[0.1] dark:border-white/[0.15] shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{isLoading ? 'Connecting Google Identity...' : 'Connect with Gmail'}</span>
              </button>
            </form>
          )}

          {/* TAB 3: Join Team with Invite Code */}
          {authTab === 'invite' && (
            <form onSubmit={handleJoinWithInvite} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
                  Team Invite Code
                </label>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] focus-within:border-[#0071E3]">
                  <Ticket className="w-4 h-4 text-[#0071E3]" />
                  <input
                    type="text"
                    required
                    value={inviteCode}
                    onChange={e => setInviteCode(e.target.value.toUpperCase())}
                    placeholder="e.g. APOLLO-2026"
                    className="w-full bg-transparent text-xs font-mono font-semibold text-[#1D1D1F] dark:text-white focus:outline-hidden uppercase"
                  />
                </div>
              </div>

              {/* Verified Invite Banner */}
              {currentInvitePreview ? (
                <div className="p-3 rounded-xl bg-[#34C759]/10 border border-[#34C759]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#34C759] uppercase block">
                      ✓ Valid Workspace Invite
                    </span>
                    <span className="text-xs font-semibold text-[#1D1D1F] dark:text-white">
                      {currentInvitePreview.companyName}
                    </span>
                    <span className="text-[10px] text-[#86868B] block">
                      Project: {currentInvitePreview.projectName} • Rate: ${currentInvitePreview.hourlyRate}/hr
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-lg bg-[#34C759] text-white">
                    ${currentInvitePreview.hourlyRate}/hr
                  </span>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] text-[11px] text-[#86868B]">
                  Default sample code: <strong className="text-[#0071E3] font-mono">APOLLO-2026</strong>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteName}
                    onChange={e => setInviteName(e.target.value)}
                    placeholder="e.g. Jordan Lee"
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-xs text-[#1D1D1F] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder="jordan@work.io"
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-xs text-[#1D1D1F] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1">
                  Create Account Password
                </label>
                <input
                  type="password"
                  required
                  value={invitePassword}
                  onChange={e => setInvitePassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3 py-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono text-[#1D1D1F] dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#34C759] hover:bg-[#30B753] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Creating Contractor Account...' : 'Join Team & Start Tracking'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-[11px] text-[#86868B] dark:text-[#8E8E93] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#34C759]" />
            <span>Role-Based Access Control Active. Unauthorized role-hopping is blocked.</span>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-[#86868B] dark:text-[#8E8E93]">
        ChronoTrack Enterprise • Zero-Knowledge Display Telemetry & Work Diary Platform
      </footer>
    </div>
  );
};
