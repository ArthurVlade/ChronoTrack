import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Play,
  Square,
  Camera,
  Eye,
  EyeOff,
  Activity,
  Keyboard,
  MousePointer,
  Clock,
  DollarSign,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Lock,
  Plus,
  Maximize2,
  X,
  Monitor,
  Download,
  HelpCircle,
  Sparkles,
  UserCog
} from 'lucide-react';
import { Screenshot } from '../types';

export const EmployeeTracker: React.FC = () => {
  const {
    currentUser,
    projects,
    activeProjectId,
    setActiveProjectId,
    trackingMemo,
    setTrackingMemo,
    isTracking,
    startTracking,
    stopTracking,
    elapsedSeconds,
    currentActivityScore,
    keystrokesCount,
    mouseClicksCount,
    currentBlockScreenshots,
    takeManualScreenshotNow,
    settings,
    timeEntries,
    setIsManualModalOpen,
    networkStatus,
    screenCaptureMode,
    realScreenStream,
    enableLiveScreenCapture,
    disableLiveScreenCapture,
    setIsDesktopModalOpen,
    setIsEditProfileModalOpen,
    setProfileModalTargetUser,
    setActiveView
  } = useApp();

  const [selectedScreenshot, setSelectedScreenshot] = useState<Screenshot | null>(null);
  const [blurPreview, setBlurPreview] = useState<boolean>(settings.blurScreenshotsByDefault);

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  // Calculate today's time for this user
  const todayStr = new Date().toISOString().split('T')[0];
  const userTodayEntries = timeEntries.filter(e => e.userId === currentUser.id && e.date === todayStr);
  const todayTotalSeconds = userTodayEntries.reduce((acc, curr) => acc + curr.durationSeconds, 0) + (isTracking ? elapsedSeconds : 0);
  const todayHours = Math.floor(todayTotalSeconds / 3600);
  const todayMins = Math.floor((todayTotalSeconds % 3600) / 60);
  const todayEarnings = Math.round((todayTotalSeconds / 3600) * currentUser.hourlyRate * 100) / 100;

  // Format elapsed time (hh:mm:ss)
  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 10-minute block minute indicator
  const currentMinute = new Date().getMinutes();
  const tenMinProgress = ((currentMinute % 10) / 10) * 100;

  const latestScreenshot = currentBlockScreenshots[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
      
      {/* Top Banner / Welcome with Apple Minimalist Style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-black/5 dark:ring-white/10"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
                Time Tracker
              </h1>
              <button
                onClick={() => {
                  setProfileModalTargetUser(currentUser);
                  setIsEditProfileModalOpen(true);
                }}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[#0071E3] transition-all cursor-pointer"
                title="Change your name, photo, email, or password"
              >
                <UserCog className="w-3 h-3" />
                <span>Edit Profile</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#86868B] dark:text-[#8E8E93] mt-0.5">
              Logged in as <span className="font-semibold text-[#1D1D1F] dark:text-white">{currentUser.name}</span> • ${currentUser.hourlyRate}/hr • {currentUser.designation}
            </p>
          </div>
        </div>

        {/* Network & Encryption status badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {networkStatus === 'offline' && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FF9500]/15 text-[#FF9500] border border-[#FF9500]/30">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Offline Mode Active • Auto-Sync on reconnect</span>
            </div>
          )}
          <button
            onClick={() => setIsDesktopModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/15 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Desktop .exe</span>
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/[0.04] dark:bg-white/[0.06] text-[#86868B] dark:text-[#8E8E93]">
            <Lock className="w-3.5 h-3.5 text-[#34C759]" />
            <span>End-to-End Encrypted</span>
          </div>
        </div>
      </div>

      {/* Primary Apple-style Tracking Card */}
      <div className="apple-card p-6 sm:p-8 shadow-sm">
        
        {/* Project Selector & Memo Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
          
          {/* Project Dropdown */}
          <div className="w-full md:w-72">
            <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
              Current Project
            </label>
            <div className="relative">
              <select
                id="project-selector"
                value={activeProjectId}
                onChange={e => setActiveProjectId(e.target.value)}
                disabled={isTracking}
                className="w-full h-11 px-3.5 pr-8 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] text-sm font-semibold text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all disabled:opacity-70 cursor-pointer"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id} className="bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-white">
                    {p.name} (${p.hourlyRate}/hr)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Memo / Task Description Input */}
          <div className="flex-1">
            <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
              Task Memo (What are you working on?)
            </label>
            <input
              id="tracker-memo-input"
              type="text"
              value={trackingMemo}
              onChange={e => setTrackingMemo(e.target.value)}
              placeholder="e.g., Implementing high-contrast components and offline sync..."
              className="w-full h-11 px-4 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] text-sm text-[#1D1D1F] dark:text-white placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
            />
          </div>
        </div>

        {/* Center: Hero Timer Display and Big Start/Stop Button */}
        <div className="py-8 flex flex-col items-center justify-center gap-6 text-center">
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#8E8E93]">
              {isTracking ? 'Active Tracking Session' : 'Ready to Track'}
            </span>
            <div className="font-mono text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white select-none">
              {formatTime(elapsedSeconds)}
            </div>
            {isTracking && (
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34C759] animate-ping"></span>
                <span className="text-xs font-medium text-[#34C759]">
                  Tracking actively on {activeProject.name}
                </span>
              </div>
            )}
          </div>

          {/* Big Action Button (Play / Stop) */}
          <div className="flex items-center gap-4">
            {!isTracking ? (
              <button
                id="btn-start-tracking"
                onClick={startTracking}
                className="flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.98] text-white font-semibold text-base shadow-lg shadow-[#0071E3]/25 transition-all cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Tracking</span>
              </button>
            ) : (
              <button
                id="btn-stop-tracking"
                onClick={stopTracking}
                className="flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#FF3B30] hover:bg-[#E02D23] active:scale-[0.98] text-white font-semibold text-base shadow-lg shadow-[#FF3B30]/25 transition-all cursor-pointer animate-pulse"
              >
                <Square className="w-5 h-5 fill-current" />
                <span>Stop Tracking</span>
              </button>
            )}

            {/* Manual time shortcut */}
            <button
              id="btn-manual-time-shortcut"
              onClick={() => setIsManualModalOpen(true)}
              className="p-4 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[#1D1D1F] dark:text-white transition-all"
              title="Add manual time entry"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Activity Sensor & Screenshot Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
          
          {/* Live Activity Sensor (Keystrokes, Mouse Clicks, Activity Level) */}
          <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0071E3]" />
                <span className="text-xs font-semibold text-[#1D1D1F] dark:text-white">Activity Sensor</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                currentActivityScore > 75
                  ? 'bg-[#34C759]/10 text-[#34C759]'
                  : currentActivityScore > 40
                  ? 'bg-[#FF9500]/10 text-[#FF9500]'
                  : 'bg-[#FF3B30]/10 text-[#FF3B30]'
              }`}>
                {isTracking ? `${currentActivityScore}% Active` : 'Inactive'}
              </span>
            </div>

            {/* Visual waveform/activity bar */}
            <div>
              <div className="w-full h-2.5 rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0071E3] to-[#34C759] transition-all duration-500"
                  style={{ width: isTracking ? `${currentActivityScore}%` : '0%' }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-[#86868B] dark:text-[#8E8E93] mt-1.5">
                <span>0% Idle</span>
                <span>Current 10-Min Block</span>
                <span>100% High Activity</span>
              </div>
            </div>

            {/* Keystroke and Mouse counters */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#2C2C2E] border border-black/[0.04] dark:border-white/[0.06]">
                <Keyboard className="w-4 h-4 text-[#86868B]" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1D1D1F] dark:text-white font-mono">
                    {keystrokesCount}
                  </span>
                  <span className="text-[10px] text-[#86868B] dark:text-[#8E8E93]">Keystrokes</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#2C2C2E] border border-black/[0.04] dark:border-white/[0.06]">
                <MousePointer className="w-4 h-4 text-[#86868B]" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1D1D1F] dark:text-white font-mono">
                    {mouseClicksCount}
                  </span>
                  <span className="text-[10px] text-[#86868B] dark:text-[#8E8E93]">Mouse Clicks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Screenshot & 10-Min Interval Preview */}
          <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#0071E3]" />
                <span className="text-xs font-semibold text-[#1D1D1F] dark:text-white">
                  Automated Screenshot
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBlurPreview(prev => !prev)}
                  className="p-1 rounded-md text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white text-xs flex items-center gap-1"
                  title="Toggle Privacy Blur"
                >
                  {blurPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span className="text-[10px] hidden sm:inline">{blurPreview ? 'Blurred' : 'Clear'}</span>
                </button>
                <button
                  id="btn-take-screenshot-now"
                  onClick={takeManualScreenshotNow}
                  disabled={!isTracking}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/20 disabled:opacity-40 transition-all cursor-pointer"
                >
                  Capture Now
                </button>
              </div>
            </div>

            {/* Thumbnail Preview or Placeholder */}
            {latestScreenshot ? (
              <div className="relative rounded-xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] aspect-video group">
                <img
                  src={latestScreenshot.imageUrl}
                  alt="Current Block Screenshot"
                  className={`w-full h-full object-cover transition-all duration-200 ${
                    blurPreview ? 'blur-md scale-105' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-2.5 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-sm">
                      {new Date(latestScreenshot.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button
                      onClick={() => setSelectedScreenshot(latestScreenshot)}
                      className="p-1 rounded-md bg-black/60 text-white hover:bg-black/90 backdrop-blur-sm"
                      title="Zoom full screen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-semibold text-white truncate drop-shadow-sm">
                      {latestScreenshot.activeWindow}
                    </p>
                    <p className="text-[9px] text-neutral-300 truncate">
                      {latestScreenshot.activeUrl}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-black/[0.1] dark:border-white/[0.1] p-6 flex flex-col items-center justify-center text-center aspect-video">
                <Camera className="w-6 h-6 text-[#86868B] mb-2" />
                <span className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                  {isTracking
                    ? `Next capture in ${Math.round(600 / settings.screenshotsPer10Min)}s (${settings.screenshotsPer10Min} shots per 10m)`
                    : 'Start tracking to capture screen audits'}
                </span>
              </div>
            )}

            {/* 10-Minute Block Frequency setting notice */}
            <div className="flex items-center justify-between text-[10px] text-[#86868B] dark:text-[#8E8E93]">
              <span>Frequency: <strong className="text-[#1D1D1F] dark:text-white">{settings.screenshotsPer10Min} screenshots</strong> / 10 mins</span>
              <span>10m Block Progress: {Math.round(tenMinProgress)}%</span>
            </div>

            {/* Screen Capture Mode & Full-Screen Controls */}
            <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span className="text-[#86868B] dark:text-[#8E8E93]">Capture Mode:</span>
                  <span className={`font-semibold px-2 py-0.5 rounded-md text-[10px] ${
                    screenCaptureMode === 'live_screen'
                      ? 'bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/20'
                      : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#86868B] dark:text-[#8E8E93]'
                  }`}>
                    {screenCaptureMode === 'live_screen' ? '● Entire Screen Live' : 'Simulated Test Mode'}
                  </span>
                </div>

                <button
                  onClick={() => setActiveView('docs')}
                  className="text-[10px] text-[#0071E3] hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Screen Tutorial</span>
                </button>
              </div>

              {/* Action Buttons: Live Stream vs Desktop .EXE */}
              <div className="grid grid-cols-2 gap-2">
                {screenCaptureMode === 'live_screen' ? (
                  <button
                    onClick={disableLiveScreenCapture}
                    className="py-1.5 px-2 rounded-lg bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 text-[#FF3B30] text-[11px] font-medium transition-all"
                  >
                    Disconnect Screen Stream
                  </button>
                ) : (
                  <button
                    onClick={enableLiveScreenCapture}
                    className="py-1.5 px-2 rounded-lg bg-[#0071E3]/10 hover:bg-[#0071E3]/20 text-[#0071E3] text-[11px] font-medium flex items-center justify-center gap-1 transition-all"
                    title="Prompts browser to share Entire Screen"
                  >
                    <Monitor className="w-3 h-3" />
                    <span>Share Entire Screen</span>
                  </button>
                )}

                <button
                  onClick={() => setIsDesktopModalOpen(true)}
                  className="py-1.5 px-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[#1D1D1F] dark:text-white text-[11px] font-medium flex items-center justify-center gap-1 transition-all"
                  title="Download native background desktop installer"
                >
                  <Download className="w-3 h-3 text-[#AF52DE]" />
                  <span>Desktop .EXE</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Today's Overview Stats (Apple Metric Bento) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="apple-card p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider">
              Today's Time
            </span>
            <div className="text-2xl font-bold text-[#1D1D1F] dark:text-white tracking-tight">
              {todayHours}h {todayMins}m
            </div>
          </div>
        </div>

        <div className="apple-card p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-[#34C759]/10 text-[#34C759] flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider">
              Estimated Earnings
            </span>
            <div className="text-2xl font-bold text-[#1D1D1F] dark:text-white tracking-tight">
              ${todayEarnings.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="apple-card p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-[#AF52DE]/10 text-[#AF52DE] flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider">
              Active Project
            </span>
            <div className="text-sm font-bold text-[#1D1D1F] dark:text-white tracking-tight truncate max-w-[170px]">
              {activeProject.name}
            </div>
          </div>
        </div>

      </div>

      {/* Recent Activity & Time Sessions */}
      <div className="apple-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08] mb-4">
          <h2 className="text-base font-semibold text-[#1D1D1F] dark:text-white">
            Today's Logged Sessions
          </h2>
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="text-xs font-semibold text-[#0071E3] hover:underline"
          >
            + Add Manual Entry
          </button>
        </div>

        {userTodayEntries.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#86868B] dark:text-[#8E8E93]">
            No sessions logged today yet. Press "Start Tracking" above to begin your workday!
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {userTodayEntries.map(entry => (
              <div key={entry.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#34C759] mt-1.5 flex-shrink-0"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1D1D1F] dark:text-white">
                        {entry.projectName}
                      </span>
                      {entry.isManual && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FF9500]/15 text-[#FF9500]">
                          Manual Time
                        </span>
                      )}
                      {entry.isEncrypted && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-[#86868B]">
                          E2E
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mt-0.5">
                      {entry.memo}
                    </p>
                    <span className="text-[11px] text-[#86868B] dark:text-[#8E8E93] font-mono">
                      {new Date(entry.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(entry.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-[#1D1D1F] dark:text-white">
                      {(entry.durationSeconds / 3600).toFixed(2)} hrs
                    </span>
                    <div className="text-[10px] text-[#34C759] font-medium">
                      ${((entry.durationSeconds / 3600) * currentUser.hourlyRate).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3]">
                      {entry.activityPercent}% act.
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Screenshot Zoom Modal */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full apple-card p-4 sm:p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08] mb-3">
              <div>
                <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                  Screenshot Audit Detail
                </h3>
                <span className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                  {new Date(selectedScreenshot.timestamp).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedScreenshot(null)}
                className="p-1.5 rounded-full hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-[#86868B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] aspect-video relative bg-black">
              <img
                src={selectedScreenshot.imageUrl}
                alt="Audit Zoom"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-xs">
              <div>
                <span className="text-[#86868B]">Active Window:</span>
                <p className="font-semibold truncate">{selectedScreenshot.activeWindow}</p>
              </div>
              <div>
                <span className="text-[#86868B]">Active URL:</span>
                <p className="font-semibold truncate font-mono">{selectedScreenshot.activeUrl}</p>
              </div>
              <div>
                <span className="text-[#86868B]">Activity Rate:</span>
                <p className="font-semibold text-[#34C759]">{selectedScreenshot.activityPercent}%</p>
              </div>
              <div>
                <span className="text-[#86868B]">Keystrokes / Clicks:</span>
                <p className="font-semibold">{selectedScreenshot.keystrokes} keys / {selectedScreenshot.mouseClicks} clicks</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
