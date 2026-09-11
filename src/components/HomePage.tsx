import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  ShieldCheck,
  Download,
  ArrowRight,
  Monitor,
  Activity,
  Calendar,
  DollarSign,
  Lock,
  Layers,
  CheckCircle2,
  Sparkles,
  Sun,
  Moon,
  Users,
  Eye,
  FileSpreadsheet,
  FolderKanban,
  Check,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onGoToLogin: (presetAccount?: { email: string; pass: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGoToLogin }) => {
  const {
    isDarkMode,
    toggleDarkMode,
    downloadDesktopAgent,
    projects
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F4F9] dark:bg-[#0D121D] text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-600 selection:text-white">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full apple-glass transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0071E3] to-[#409CFF] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                  ChronoTrack
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Enterprise
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:inline">
                Time & Work Intelligence Platform
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Hidden on small mobile) */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-slate-700/60 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#work-diary" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white transition-colors">
              10-Min Diary
            </a>
            <a href="#desktop-agent" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white transition-colors">
              Desktop Agent
            </a>
            <a href="#security" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white transition-colors">
              Security
            </a>
            <a href="#demo-accounts" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white transition-colors">
              Demo Access
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>

            <button
              id="home-login-btn"
              onClick={() => onGoToLogin()}
              className="px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
            >
              <span>Sign In to Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800/80">
        {/* Subtle decorative ambient backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Next-Generation Remote Team Intelligence & Payroll</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.15]">
            Remote Work & Time Tracking,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
              Engineered with Precision.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Verifiable 10-minute automated screenshots, native desktop .exe background companion, tamper-proof activity sensors, owner project cost controls, and automated payroll calculations.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => onGoToLogin()}
              className="px-6 py-3 rounded-2xl bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.98] text-white font-semibold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              <span>Launch Tracker & Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => downloadDesktopAgent('win')}
              className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base flex items-center gap-2 border border-slate-300 dark:border-slate-700 shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Download Agent .EXE (Windows)</span>
            </button>
          </div>

          {/* Security & Capability Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>AES-256 GCM Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Upwork 10-Minute Diary Standard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-purple-500" />
              <span>Native Windows & Web Dual-Mode</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-amber-500" />
              <span>Automated Contractor Payroll</span>
            </div>
          </div>

          {/* Interactive Live Workstation Preview Card */}
          <div className="mt-12 w-full max-w-4xl apple-card p-4 sm:p-6 text-left shadow-xl border border-slate-200 dark:border-slate-700/80 relative overflow-hidden">
            {/* Top Bar of Preview */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Live Workstation Active • Apollo Web & Desktop App
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono font-medium">
                  Rate: $65.00/hr
                </span>
                <span className="hidden sm:inline">Sensor: 92% Activity</span>
              </div>
            </div>

            {/* Content Columns of Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {/* Col 1: Current Session Metrics */}
              <div className="apple-subcard p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Session Elapsed
                  </span>
                  <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white mt-1">
                    03:42:19
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                    Today: $240.84 accrued
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Keyboard / Mouse:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">1,420 events</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>

              {/* Col 2: Simulated Live Screenshot Preview */}
              <div className="apple-subcard p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    <span>LATEST SCREENSHOT CAPTURE</span>
                    <span className="text-blue-600 dark:text-blue-400">2 min ago</span>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 aspect-video flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
                      alt="Workstation capture"
                      className="w-full h-full object-cover opacity-85"
                    />
                    <div className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white">
                      VS Code — authController.ts
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Capture Interval: 3 shots/10m</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified Valid</span>
                </div>
              </div>

              {/* Col 3: Quick Sign-in Callout inside Preview */}
              <div className="apple-subcard p-4 flex flex-col justify-between bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/80 dark:border-blue-900/60">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Protected Workstation</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    To start logging billable hours or inspect audit diaries, authenticate into your organization workspace.
                  </p>
                </div>
                <button
                  onClick={() => onGoToLogin()}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Sign In to Your Account</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Demo Accounts Quick-Select Section */}
      <section id="demo-accounts" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Instant Test Access & Demo Accounts
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Click any profile below to immediately launch the Login Page with pre-configured credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          {/* Account 1: Owner */}
          <div className="apple-card p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Manager & Owner Role
                </span>
                <span className="text-xs font-mono text-slate-500">Full Privileges</span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                  alt="Sarah Jenkins"
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Sarah Jenkins</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">VP of Engineering & Founder</p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 p-3 rounded-xl font-mono mb-4 border border-slate-200 dark:border-slate-700">
                <div><span className="text-slate-400">Email:</span> sarah.jenkins@company.com</div>
                <div><span className="text-slate-400">Password:</span> admin123</div>
                <div><span className="text-slate-400">Access:</span> Project Manager, Team Audit, Payroll, Policies</div>
              </div>
            </div>

            <button
              onClick={() => onGoToLogin({ email: 'sarah.jenkins@company.com', pass: 'admin123' })}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Log In as Sarah (Owner)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Account 2: Employee */}
          <div className="apple-card p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Employee / Contractor Role
                </span>
                <span className="text-xs font-mono text-slate-500">Tracker Session</span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Alex Rivera"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Alex Rivera</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Senior Frontend Engineer ($60/hr)</p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 p-3 rounded-xl font-mono mb-4 border border-slate-200 dark:border-slate-700">
                <div><span className="text-slate-400">Email:</span> alex.rivera@company.com</div>
                <div><span className="text-slate-400">Password:</span> alex123</div>
                <div><span className="text-slate-400">Access:</span> Work Tracker, Work Diary, Desktop Client</div>
              </div>
            </div>

            <button
              onClick={() => onGoToLogin({ email: 'alex.rivera@company.com', pass: 'alex123' })}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Log In as Alex (Employee)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Features Deep Dive */}
      <section id="features" className="py-16 bg-white dark:bg-[#111722] border-y border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
              Enterprise Grade Capabilities
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Engineered for Verifiable Remote Productivity
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Everything high-performance remote engineering teams, agencies, and owners need for accurate client billing and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div id="work-diary" className="apple-card p-6 border border-slate-200 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                10-Minute Screenshot Work Diary
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Upwork-compatible 6-block hourly matrix. Randomly triggered captures with keyboard/mouse event counts and privacy blur options.
              </p>
            </div>

            {/* Feature 2 */}
            <div id="desktop-agent" className="apple-card p-6 border border-slate-200 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                Native Desktop Companion (.EXE)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Overcomes browser tab throttling when minimized. Windows system tray integration hooks directly into user API tokens.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="apple-card p-6 border border-slate-200 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <FolderKanban className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                Owner Project Management
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Add, edit, and remove client projects with budgeted hours, custom hourly billing rates, deliverable milestones, and team assignments.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="apple-card p-6 border border-slate-200 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                Automated Payroll Calculations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Real-time earnings tracking calculated by second. Export audit timesheets as PDF or CSV with complete invoice breakdown.
              </p>
            </div>

            {/* Feature 5 */}
            <div id="security" className="apple-card p-6 border border-slate-200 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                AES-256 GCM Cryptography
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Zero-knowledge data encryption. Screenshot payloads, activity metrics, and time memos are securely signed before transmission.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="apple-card p-6 border border-slate-200 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                Offline-First Persistence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Track time without internet interruptions. Entries automatically queue locally and reconcile synchronously once reconnected.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="apple-card p-8 sm:p-12 text-center bg-gradient-to-tr from-blue-600 to-indigo-700 text-white rounded-3xl shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
            Ready to Track Time & Manage Team Projects?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of remote developers, designers, and managers relying on ChronoTrack for accurate, verifiable work logs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onGoToLogin()}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-blue-700 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Access Secure Login Screen
            </button>
            <button
              onClick={() => downloadDesktopAgent('win')}
              className="px-6 py-3 rounded-xl bg-blue-800/60 hover:bg-blue-800/80 border border-blue-400/40 text-white font-semibold text-sm transition-all"
            >
              Download Windows Agent
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">ChronoTrack Enterprise</span>
            <span>• v2.4 Multi-Platform Time Tracking</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onGoToLogin()} className="hover:text-blue-600 transition-colors">
              Employee Sign In
            </button>
            <span>•</span>
            <button onClick={() => onGoToLogin()} className="hover:text-blue-600 transition-colors">
              Owner Sign In
            </button>
            <span>•</span>
            <button onClick={() => downloadDesktopAgent('win')} className="hover:text-blue-600 transition-colors">
              Desktop Agent
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
