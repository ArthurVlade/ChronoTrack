import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  LayoutDashboard,
  Calendar,
  DollarSign,
  Settings,
  Bell,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  RefreshCw,
  ShieldCheck,
  PlusCircle,
  Download,
  UserCheck,
  ChevronDown,
  Lock
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    users,
    switchUser,
    activeView,
    setActiveView,
    networkStatus,
    setNetworkStatus,
    syncOfflineData,
    offlineQueueCount,
    isDarkMode,
    toggleDarkMode,
    notifications,
    setIsManualModalOpen,
    setIsExportModalOpen,
    setIsAuthModalOpen
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full apple-glass transition-colors duration-200 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveView(currentUser.role === 'owner' ? 'dashboard' : 'tracker')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0071E3] to-[#409CFF] flex items-center justify-center text-white shadow-sm shadow-[#0071E3]/20">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-none">
                ChronoTrack
              </span>
              <span className="text-[11px] text-[#86868B] dark:text-[#8E8E93] font-medium tracking-normal mt-0.5">
                {currentUser.role === 'owner' ? 'Owner Suite' : 'Employee Tracker'}
              </span>
            </div>
          </div>

          {/* Segmented Navigation (macOS style) */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06]">
            {currentUser.role === 'employee' ? (
              <>
                <button
                  id="nav-tracker"
                  onClick={() => setActiveView('tracker')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeView === 'tracker'
                      ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                      : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  My Tracker
                </button>
                <button
                  id="nav-reports"
                  onClick={() => setActiveView('reports')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeView === 'reports'
                      ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                      : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Work Diary
                </button>
              </>
            ) : (
              <>
                <button
                  id="nav-dashboard"
                  onClick={() => setActiveView('dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeView === 'dashboard'
                      ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                      : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Team Live
                </button>
                <button
                  id="nav-reports-manager"
                  onClick={() => setActiveView('reports')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeView === 'reports'
                      ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                      : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Screenshots & Audit
                </button>
                <button
                  id="nav-payroll"
                  onClick={() => setActiveView('payroll')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeView === 'payroll'
                      ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                      : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  Payroll
                </button>
                <button
                  id="nav-tracker-owner"
                  onClick={() => setActiveView('tracker')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeView === 'tracker'
                      ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                      : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Owner Tracker
                </button>
              </>
            )}

            <button
              id="nav-settings"
              onClick={() => setActiveView('settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'settings'
                  ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                  : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              Settings
            </button>
          </nav>
        </div>

        {/* Right: Quick Actions, Network Simulator, Security Badge, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Add Manual Time shortcut */}
          <button
            id="btn-add-manual-time"
            onClick={() => setIsManualModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] transition-all"
            title="Add manual time entry"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Manual Time</span>
          </button>

          {/* Export Reports shortcut */}
          <button
            id="btn-export-reports"
            onClick={() => setIsExportModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] transition-all"
            title="Download PDF or CSV report"
          >
            <Download className="w-3.5 h-3.5 text-[#34C759]" />
            <span>Export</span>
          </button>

          {/* Network Simulator & Offline Sync Indicator */}
          <div className="flex items-center">
            {networkStatus === 'online' ? (
              <button
                id="network-status-online"
                onClick={() => setNetworkStatus('offline')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/20 hover:bg-[#34C759]/20 transition-all cursor-pointer"
                title="Click to simulate offline mode (network outage)"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse"></span>
                <Wifi className="w-3 h-3" />
                <span className="hidden lg:inline">Online</span>
              </button>
            ) : networkStatus === 'syncing' ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/20">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Syncing...</span>
              </div>
            ) : (
              <button
                id="network-status-offline"
                onClick={() => setNetworkStatus('online')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FF9500]/15 text-[#FF9500] border border-[#FF9500]/30 hover:bg-[#FF9500]/25 transition-all cursor-pointer"
                title="Click to restore connection and sync offline queue"
              >
                <WifiOff className="w-3 h-3" />
                <span>Offline {offlineQueueCount > 0 && `(${offlineQueueCount} queued)`}</span>
              </button>
            )}
          </div>

          {/* E2E Encryption Badge */}
          <div
            className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/[0.04] dark:bg-white/[0.06] text-[#86868B] dark:text-[#8E8E93]"
            title="End-to-End Encrypted with AES-256 GCM client key"
          >
            <Lock className="w-3 h-3 text-[#34C759]" />
            <span>E2E AES-256</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="theme-toggle"
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notification Center Bell */}
          <div className="relative">
            <button
              id="notif-bell-btn"
              onClick={() => setShowNotifDropdown(prev => !prev)}
              className="relative p-2 rounded-xl text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF3B30] ring-2 ring-white dark:ring-[#1C1C1E]"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl apple-card shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#0071E3]" />
                    <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white">Notification Center</span>
                  </div>
                  <span className="text-xs text-[#86868B] dark:text-[#8E8E93] font-medium">{notifications.length} updates</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-black/[0.04] dark:divide-white/[0.04] my-2">
                  {notifications.slice(0, 6).map(n => (
                    <div key={n.id} className="py-2.5 px-1 flex flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#1D1D1F] dark:text-white">{n.title}</span>
                        <span className="text-[10px] text-[#86868B] dark:text-[#8E8E93]">
                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#86868B] dark:text-[#8E8E93] line-clamp-2">{n.message}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex justify-between">
                  <button
                    onClick={() => {
                      setShowNotifDropdown(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="text-xs text-[#0071E3] hover:underline font-medium"
                  >
                    Manage Push Settings
                  </button>
                  <button
                    onClick={() => setShowNotifDropdown(false)}
                    className="text-xs text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              id="user-profile-menu-btn"
              onClick={() => setShowUserDropdown(prev => !prev)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition-all border border-black/[0.04] dark:border-white/[0.06]"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/20"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#1D1D1F] dark:text-white leading-tight">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-[#86868B] dark:text-[#8E8E93] leading-none uppercase tracking-wider font-semibold">
                  {currentUser.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#86868B] dark:text-[#8E8E93]" />
            </button>

            {/* Switch User Dropdown */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl apple-card shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1.5 border-b border-black/[0.06] dark:border-white/[0.08] mb-2">
                  <div className="text-[10px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider">
                    Switch Workspace Role
                  </div>
                  <p className="text-xs text-[#1D1D1F] dark:text-white font-medium mt-0.5">
                    Select team member profile
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchUser(u.id);
                        setShowUserDropdown(false);
                      }}
                      className={`flex items-center gap-3 w-full p-2 rounded-xl text-left transition-all ${
                        u.id === currentUser.id
                          ? 'bg-[#0071E3]/10 text-[#0071E3]'
                          : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-[#1D1D1F] dark:text-[#F5F5F7]'
                      }`}
                    >
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-xs font-semibold truncate">{u.name}</span>
                        <span className="text-[10px] text-[#86868B] dark:text-[#8E8E93] truncate">
                          {u.role === 'owner' ? 'Owner / Manager' : 'Employee (Tracker only)'}
                        </span>
                      </div>
                      {u.id === currentUser.id && <UserCheck className="w-4 h-4 text-[#0071E3]" />}
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full text-center py-1.5 rounded-lg text-xs font-medium text-[#0071E3] hover:bg-[#0071E3]/10 transition-all"
                  >
                    OAuth / Account Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
