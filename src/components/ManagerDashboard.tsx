import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Clock,
  DollarSign,
  Activity,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  EyeOff,
  Maximize2,
  CheckCircle,
  AlertCircle,
  Download,
  Sliders,
  ShieldCheck,
  TrendingUp,
  Globe,
  Monitor,
  Check,
  X
} from 'lucide-react';
import { Screenshot, WorkDiaryBlock, User } from '../types';
import { buildWorkDiaryBlocks, calculatePayrollSummaries } from '../services/storage';

export const ManagerDashboard: React.FC = () => {
  const {
    currentUser,
    users,
    projects,
    timeEntries,
    settings,
    updateSettings,
    setIsExportModalOpen,
    activeView
  } = useApp();

  // Filters for Work Diary
  const [selectedUserId, setSelectedUserId] = useState<string>(users[1]?.id || users[0].id); // default Alex Rivera
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('all');
  const [selectedScreenshotModal, setSelectedScreenshotModal] = useState<Screenshot | null>(null);
  const [privacyBlur, setPrivacyBlur] = useState<boolean>(settings.blurScreenshotsByDefault);
  const [dashboardSubTab, setDashboardSubTab] = useState<'overview' | 'diary' | 'reports' | 'payroll' | 'settings'>('overview');

  // If user navigated directly via Header nav to 'reports' or 'payroll' or 'settings'
  React.useEffect(() => {
    if (activeView === 'reports') setDashboardSubTab('diary');
    else if (activeView === 'payroll') setDashboardSubTab('payroll');
    else if (activeView === 'settings') setDashboardSubTab('settings');
  }, [activeView]);

  // Aggregate stats across team
  const totalTeamSeconds = timeEntries.reduce((acc, curr) => acc + curr.durationSeconds, 0);
  const totalTeamHours = (totalTeamSeconds / 3600).toFixed(1);
  const activeNowCount = users.filter(u => u.trackingSince).length;
  const payrollSummaries = calculatePayrollSummaries(timeEntries, users);
  const totalAccruedPayroll = payrollSummaries.reduce((acc, curr) => acc + curr.totalEarnings, 0);

  // Build 10-minute work diary blocks for selected user and date
  const diaryBlocks = buildWorkDiaryBlocks(timeEntries, selectedDate, selectedUserId);

  // Handle previous / next day in work diary
  const shiftDate = (days: number) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  const selectedUserObj = users.find(u => u.id === selectedUserId) || users[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
      
      {/* Dashboard Header with Sub-tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
              Team Overview & Management
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3]">
              Manager Suite
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#86868B] dark:text-[#8E8E93] mt-0.5">
            Monitor real-time team activity, audit 10-minute screenshot diaries, review payroll, and tune capture settings.
          </p>
        </div>

        {/* Manager Sub-tabs (Apple Segmented Control) */}
        <div className="flex items-center p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setDashboardSubTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              dashboardSubTab === 'overview'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            Live Team
          </button>
          <button
            onClick={() => setDashboardSubTab('diary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              dashboardSubTab === 'diary'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            Work Diary & Screenshots
          </button>
          <button
            onClick={() => setDashboardSubTab('reports')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              dashboardSubTab === 'reports'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            Analytics & Reports
          </button>
          <button
            onClick={() => setDashboardSubTab('payroll')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              dashboardSubTab === 'payroll'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            Payroll (${totalAccruedPayroll.toFixed(0)})
          </button>
          <button
            onClick={() => setDashboardSubTab('settings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              dashboardSubTab === 'settings'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            Tracking Policies
          </button>
        </div>
      </div>

      {/* Hero Stats Bento */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="apple-card p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider">
              Total Logged
            </span>
            <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-white tracking-tight">
              {totalTeamHours} hrs
            </div>
          </div>
        </div>

        <div className="apple-card p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#34C759]/10 text-[#34C759] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider">
              Active Now
            </span>
            <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-white tracking-tight flex items-center gap-1.5">
              <span>{activeNowCount}</span>
              <span className="text-xs text-[#34C759] font-normal">of {users.length} members</span>
            </div>
          </div>
        </div>

        <div className="apple-card p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#AF52DE]/10 text-[#AF52DE] flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider">
              Accrued Payroll
            </span>
            <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-white tracking-tight">
              ${totalAccruedPayroll.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="apple-card p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#FF9500]/10 text-[#FF9500] flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider">
              Avg. Activity
            </span>
            <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-white tracking-tight">
              88%
            </div>
          </div>
        </div>

      </div>

      {/* TAB 1: LIVE TEAM OVERVIEW */}
      {dashboardSubTab === 'overview' && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1D1D1F] dark:text-white">
              Live Team Workstation Monitor
            </h2>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#0071E3] hover:underline"
            >
              <Download className="w-3.5 h-3.5" />
              Download Team Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {users.map(member => {
              const isMemberActive = !!member.trackingSince;
              const memberEntries = timeEntries.filter(e => e.userId === member.id && e.date === selectedDate);
              const daySecs = memberEntries.reduce((a, b) => a + b.durationSeconds, 0);
              const currentProj = projects.find(p => p.id === member.activeProject);

              return (
                <div key={member.id} className="apple-card p-5 flex flex-col justify-between gap-4">
                  <div>
                    {/* User Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-11 h-11 rounded-full object-cover ring-2 ring-black/5 dark:ring-white/10"
                          />
                          <span
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white dark:ring-[#1C1C1E] ${
                              isMemberActive ? 'bg-[#34C759] animate-pulse' : 'bg-[#86868B]'
                            }`}
                          ></span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-white">
                            {member.name}
                          </h3>
                          <p className="text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                            {member.designation}
                          </p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isMemberActive
                          ? 'bg-[#34C759]/10 text-[#34C759]'
                          : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#86868B]'
                      }`}>
                        {isMemberActive ? 'Tracking Now' : 'Idle / Offline'}
                      </span>
                    </div>

                    {/* Current Activity Box */}
                    <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] flex flex-col gap-1.5 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#86868B] dark:text-[#8E8E93]">Assigned Project:</span>
                        <span className="font-semibold text-[#1D1D1F] dark:text-white truncate max-w-[150px]">
                          {currentProj ? currentProj.name : 'General Task'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#86868B] dark:text-[#8E8E93]">Rate:</span>
                        <span className="font-semibold text-[#1D1D1F] dark:text-white">
                          ${member.hourlyRate}/hr
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#86868B] dark:text-[#8E8E93]">Hours Today:</span>
                        <span className="font-bold text-[#0071E3] font-mono">
                          {(daySecs / 3600).toFixed(1)} hrs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedUserId(member.id);
                        setDashboardSubTab('diary');
                      }}
                      className="text-xs font-semibold text-[#0071E3] hover:underline"
                    >
                      Audit Screenshots &rarr;
                    </button>
                    <span className="text-[11px] text-[#86868B] font-mono">
                      ${((daySecs / 3600) * member.hourlyRate).toFixed(2)} earned
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: WORK DIARY & SCREENSHOT MATRIX (Upwork Style) */}
      {dashboardSubTab === 'diary' && (
        <div className="flex flex-col gap-6">
          
          {/* Controls Bar: Employee, Date, Project Filter */}
          <div className="apple-card p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Employee Selector */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">
                Auditing:
              </label>
              <select
                id="diary-user-select"
                value={selectedUserId}
                onChange={e => setSelectedUserId(e.target.value)}
                className="h-9 px-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] text-xs font-bold text-[#1D1D1F] dark:text-white cursor-pointer"
              >
                {users.map(u => (
                  <option key={u.id} value={u.id} className="bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-white">
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker & Day navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => shiftDate(-1)}
                className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[#1D1D1F] dark:text-white"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] text-xs font-semibold text-[#1D1D1F] dark:text-white font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#0071E3]" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer"
                />
              </div>

              <button
                onClick={() => shiftDate(1)}
                className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[#1D1D1F] dark:text-white"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Project Filter & Privacy Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPrivacyBlur(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  privacyBlur
                    ? 'bg-[#0071E3]/10 text-[#0071E3] border-[#0071E3]/20'
                    : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#86868B] border-transparent'
                }`}
              >
                {privacyBlur ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>Privacy Blur {privacyBlur ? 'On' : 'Off'}</span>
              </button>

              <button
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Export Diary
              </button>
            </div>

          </div>

          {/* 10-Minute Diary Block Grid (Upwork Style) */}
          <div className="apple-card p-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08] mb-6">
              <div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                  10-Minute Work Diary Matrix
                </h3>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                  Showing audit records for <span className="font-semibold text-[#1D1D1F] dark:text-white">{selectedUserObj.name}</span> on {selectedDate}. Up to {settings.screenshotsPer10Min} screenshots per 10-min block.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#34C759]"></span>
                  <span className="text-[#86868B]">High Activity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#FF9500]"></span>
                  <span className="text-[#86868B]">Moderate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#FF3B30]"></span>
                  <span className="text-[#86868B]">Low / Idle</span>
                </div>
              </div>
            </div>

            {diaryBlocks.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-2">
                <Calendar className="w-8 h-8 text-[#86868B]" />
                <p className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                  No time logged for this date
                </p>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                  Select another date or employee from the filter bar above, or switch to Alex Rivera.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {diaryBlocks.map(block => {
                  const shot = block.screenshots[0];
                  return (
                    <div
                      key={block.id}
                      onClick={() => shot && setSelectedScreenshotModal(shot)}
                      className="group p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] hover:border-[#0071E3] dark:hover:border-[#0071E3] bg-black/[0.02] dark:bg-white/[0.03] transition-all flex flex-col justify-between gap-2 cursor-pointer shadow-2xs hover:shadow-md"
                    >
                      {/* Block Time header */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-semibold text-[#1D1D1F] dark:text-white">
                          {block.timeRangeLabel}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                          block.activityPercent > 75
                            ? 'bg-[#34C759]/15 text-[#34C759]'
                            : block.activityPercent > 40
                            ? 'bg-[#FF9500]/15 text-[#FF9500]'
                            : 'bg-[#FF3B30]/15 text-[#FF3B30]'
                        }`}>
                          {block.activityPercent}%
                        </span>
                      </div>

                      {/* Screenshot thumbnail */}
                      <div className="rounded-lg overflow-hidden border border-black/[0.06] dark:border-white/[0.08] aspect-video relative bg-black/40">
                        {shot ? (
                          <img
                            src={shot.imageUrl}
                            alt="Screenshot"
                            className={`w-full h-full object-cover transition-all ${
                              privacyBlur ? 'blur-xs scale-105' : ''
                            }`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#86868B]">
                            Manual Time
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                        </div>
                      </div>

                      {/* Activity Bar (10 segments) */}
                      <div>
                        <div className="w-full h-1.5 rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              block.activityPercent > 75
                                ? 'bg-[#34C759]'
                                : block.activityPercent > 40
                                ? 'bg-[#FF9500]'
                                : 'bg-[#FF3B30]'
                            }`}
                            style={{ width: `${block.activityPercent}%` }}
                          ></div>
                        </div>
                        <p className="text-[10px] text-[#86868B] dark:text-[#8E8E93] truncate mt-1">
                          {block.memo || 'General Task'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: WEEKLY PERFORMANCE REPORTS & ANALYTICS */}
      {dashboardSubTab === 'reports' && (
        <div className="flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                Weekly Performance & Productivity Analytics
              </h2>
              <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                Aggregated team hours, application usage breakdown, and billable ratio.
              </p>
            </div>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF / CSV
            </button>
          </div>

          {/* Productivity & Application Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Applications & URLs breakdown */}
            <div className="apple-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-[#0071E3]" />
                  <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-white">
                    Active Applications & URLs
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#34C759]">92% Productive</span>
              </div>

              <div className="flex flex-col gap-3.5">
                {[
                  { app: 'Visual Studio Code', share: '46%', hours: '34.2h', color: '#0071E3', tag: 'Productive' },
                  { app: 'Figma Design Tokens', share: '28%', hours: '20.8h', color: '#34C759', tag: 'Productive' },
                  { app: 'GitHub PR Reviews', share: '14%', hours: '10.4h', color: '#AF52DE', tag: 'Productive' },
                  { app: 'Terminal (zsh / pnpm)', share: '8%', hours: '5.9h', color: '#FF9500', tag: 'Productive' },
                  { app: 'Slack / Communication', share: '4%', hours: '3.0h', color: '#86868B', tag: 'Neutral' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1D1D1F] dark:text-white">{item.app}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#86868B]">{item.hours}</span>
                        <span className="font-bold text-[#1D1D1F] dark:text-white">{item.share}</span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: item.share, backgroundColor: item.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Hours Distribution */}
            <div className="apple-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#34C759]" />
                  <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-white">
                    Daily Team Volume (Mon - Sun)
                  </h3>
                </div>
                <span className="text-xs text-[#86868B] font-mono">Week Total: {totalTeamHours}h</span>
              </div>

              {/* Bar visualization */}
              <div className="grid grid-cols-7 gap-2 pt-4 items-end h-44">
                {[
                  { day: 'Mon', hours: 14.5, max: 20 },
                  { day: 'Tue', hours: 16.2, max: 20 },
                  { day: 'Wed', hours: 15.0, max: 20 },
                  { day: 'Thu', hours: 17.8, max: 20 },
                  { day: 'Fri', hours: 14.0, max: 20 },
                  { day: 'Sat', hours: 4.2, max: 20 },
                  { day: 'Sun', hours: 2.1, max: 20 }
                ].map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono text-[#86868B]">{d.hours}h</span>
                    <div className="w-full rounded-t-lg bg-black/[0.04] dark:bg-white/[0.06] flex items-end h-32 overflow-hidden">
                      <div
                        className="w-full bg-[#0071E3] rounded-t-lg transition-all duration-500"
                        style={{ height: `${(d.hours / d.max) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-[#1D1D1F] dark:text-white">{d.day}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs text-[#86868B]">
                <span>Billable: <strong className="text-[#34C759]">94.2%</strong></span>
                <span>Non-Billable / Overhead: <strong className="text-[#FF9500]">5.8%</strong></span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: PAYROLL INTEGRATION */}
      {dashboardSubTab === 'payroll' && (
        <div className="flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                Team Payroll & Compensation Engine
              </h2>
              <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                Automated wage calculation derived directly from tracked time blocks and individual hourly rates.
              </p>
            </div>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#34C759] hover:bg-[#2EB34F] text-white text-xs font-semibold shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Export Payroll CSV
            </button>
          </div>

          <div className="apple-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] text-[#86868B] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Team Member</th>
                    <th className="px-5 py-3.5">Designation</th>
                    <th className="px-5 py-3.5">Hourly Rate</th>
                    <th className="px-5 py-3.5">Total Hours</th>
                    <th className="px-5 py-3.5">Gross Pay</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                  {payrollSummaries.map(p => (
                    <tr key={p.userId} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.userAvatar} alt={p.userName} className="w-8 h-8 rounded-full object-cover" />
                          <span className="font-bold text-[#1D1D1F] dark:text-white">{p.userName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#86868B] dark:text-[#8E8E93]">{p.designation}</td>
                      <td className="px-5 py-4 font-mono font-semibold">${p.hourlyRate}/hr</td>
                      <td className="px-5 py-4 font-mono font-bold text-[#0071E3]">{p.totalHoursFormatted}</td>
                      <td className="px-5 py-4 font-mono font-bold text-[#34C759] text-sm">${p.totalEarnings.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#34C759]/10 text-[#34C759]">
                          {p.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => alert(`Payroll payout of $${p.totalEarnings.toFixed(2)} processed for ${p.userName} via integrated gateway.`)}
                          className="px-3 py-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-xs font-semibold text-[#1D1D1F] dark:text-white transition-all"
                        >
                          Disburse
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-black/[0.02] dark:bg-white/[0.03] border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs">
              <span className="text-[#86868B]">Cycle Period: Sept 01 - Sept 15, 2026</span>
              <span className="font-bold text-sm text-[#1D1D1F] dark:text-white">
                Total Accrued: <span className="text-[#34C759]">${totalAccruedPayroll.toFixed(2)}</span>
              </span>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: TEAM TRACKING POLICIES & SCREENSHOT FREQUENCY SETTINGS */}
      {dashboardSubTab === 'settings' && (
        <div className="flex flex-col gap-6 max-w-4xl">
          
          <div>
            <h2 className="text-base font-bold text-[#1D1D1F] dark:text-white">
              Team Tracking Policies & Screenshot Frequency
            </h2>
            <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
              Configure screenshot intervals, privacy blurring, and manual time permissions across all remote workstations.
            </p>
          </div>

          <div className="apple-card p-6 flex flex-col gap-6">
            
            {/* Screenshot Frequency per 10 minutes - specifically requested! */}
            <div className="pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-white">
                    Screenshots Taken per 10 Minutes
                  </h3>
                  <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                    Controls how frequently the background agent captures screen audits for remote team members.
                  </p>
                </div>
                <span className="text-sm font-bold text-[#0071E3] font-mono px-3 py-1 rounded-lg bg-[#0071E3]/10">
                  {settings.screenshotsPer10Min} per 10m
                </span>
              </div>

              {/* Segmented Selector for 1 to 6 screenshots per 10 min */}
              <div className="grid grid-cols-6 gap-2 mt-4">
                {[1, 2, 3, 4, 5, 6].map(count => (
                  <button
                    key={count}
                    onClick={() => updateSettings({ screenshotsPer10Min: count })}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      settings.screenshotsPer10Min === count
                        ? 'bg-[#0071E3] text-white border-[#0071E3] shadow-xs'
                        : 'bg-black/[0.02] dark:bg-white/[0.04] text-[#1D1D1F] dark:text-white border-black/[0.04] dark:border-white/[0.06] hover:bg-black/[0.06]'
                    }`}
                  >
                    {count}x / 10m
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#86868B] mt-2">
                Current rate: 1 screenshot taken every ~{Math.round(600 / settings.screenshotsPer10Min)} seconds during active sessions.
              </p>
            </div>

            {/* Privacy Blur by default */}
            <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div>
                <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-white">
                  Automatic Privacy Blurring
                </h3>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                  Blur sensitive text and passwords in captured screenshots to uphold employee privacy.
                </p>
              </div>
              <button
                onClick={() => updateSettings({ blurScreenshotsByDefault: !settings.blurScreenshotsByDefault })}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.blurScreenshotsByDefault ? 'bg-[#34C759]' : 'bg-black/[0.15] dark:bg-white/[0.2]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs absolute top-0.5 transition-transform ${
                    settings.blurScreenshotsByDefault ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
            </div>

            {/* Allow Manual Time Entries */}
            <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div>
                <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-white">
                  Allow Manual Time Logging
                </h3>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                  Permit team members to record off-screen client meetings and offline work.
                </p>
              </div>
              <button
                onClick={() => updateSettings({ allowManualTime: !settings.allowManualTime })}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.allowManualTime ? 'bg-[#34C759]' : 'bg-black/[0.15] dark:bg-white/[0.2]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs absolute top-0.5 transition-transform ${
                    settings.allowManualTime ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
            </div>

            {/* End to End Encryption */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-white">
                    End-to-End Zero Knowledge Encryption
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#34C759]/10 text-[#34C759]">
                    AES-256 GCM
                  </span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                  All memos, URLs, and keystroke logs are encrypted on the client device before persistence.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#34C759]">
                <ShieldCheck className="w-4 h-4" />
                <span>Enforced</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Screenshot Modal for Audit Inspection */}
      {selectedScreenshotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full apple-card p-4 sm:p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08] mb-3">
              <div>
                <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                  Auditing 10-Minute Block Screenshot
                </h3>
                <span className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                  Captured at {new Date(selectedScreenshotModal.timestamp).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedScreenshotModal(null)}
                className="p-1.5 rounded-full hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-[#86868B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] aspect-video relative bg-black">
              <img
                src={selectedScreenshotModal.imageUrl}
                alt="Audit Zoom"
                className={`w-full h-full object-contain ${privacyBlur ? 'blur-sm' : ''}`}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-xs">
              <div>
                <span className="text-[#86868B]">Active Window:</span>
                <p className="font-semibold truncate">{selectedScreenshotModal.activeWindow}</p>
              </div>
              <div>
                <span className="text-[#86868B]">Active URL:</span>
                <p className="font-semibold truncate font-mono">{selectedScreenshotModal.activeUrl}</p>
              </div>
              <div>
                <span className="text-[#86868B]">Activity Rate:</span>
                <p className="font-semibold text-[#34C759]">{selectedScreenshotModal.activityPercent}%</p>
              </div>
              <div>
                <span className="text-[#86868B]">Keystrokes / Clicks:</span>
                <p className="font-semibold">{selectedScreenshotModal.keystrokes} keys / {selectedScreenshotModal.mouseClicks} clicks</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
