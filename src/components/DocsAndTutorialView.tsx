import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  GraduationCap,
  Monitor,
  ShieldCheck,
  CheckCircle2,
  Users,
  Camera,
  Clock,
  DollarSign,
  Lock,
  Download,
  Terminal,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Play,
  FileText,
  Copy,
  Check,
  Laptop,
  Apple,
  HelpCircle,
  Eye,
  Wifi,
  Sparkles
} from 'lucide-react';

export const DocsAndTutorialView: React.FC = () => {
  const {
    currentUser,
    projects,
    settings,
    setIsInviteModalOpen,
    setIsDesktopModalOpen,
    setActiveView,
    downloadDesktopAgent,
    enableLiveScreenCapture,
    screenCaptureMode,
    isDarkMode
  } = useApp();

  const [activeTab, setActiveTab] = useState<'owner_guide' | 'employee_tutorial' | 'desktop_agent' | 'checklist'>('owner_guide');
  const [copiedScript, setCopiedScript] = useState(false);
  const [checkedList, setCheckedList] = useState<Record<string, boolean>>({
    'check-1': true,
    'check-2': true,
    'check-3': false,
    'check-4': false,
    'check-5': false
  });

  const toggleCheck = (id: string) => {
    setCheckedList(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyQuickScript = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0071E3] to-[#409CFF] flex items-center justify-center text-white shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
              Documentation & Knowledge Base
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#86868B] dark:text-[#8E8E93] mt-1">
            Complete setup guides for owners, remote employee onboarding tutorials, screen capture permissions, and desktop companion architecture.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2">
          {currentUser.role === 'owner' && (
            <button
              id="docs-btn-invite-employee"
              onClick={() => setIsInviteModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Invite Employee</span>
            </button>
          )}
          <button
            id="docs-btn-download-agent"
            onClick={() => setIsDesktopModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-xs font-semibold text-[#1D1D1F] dark:text-white flex items-center gap-1.5 transition-all border border-black/[0.04] dark:border-white/[0.06]"
          >
            <Download className="w-3.5 h-3.5 text-[#34C759]" />
            <span>Download .EXE Agent</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Apple Segmented Style) */}
      <div className="flex items-center p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] self-start overflow-x-auto max-w-full">
        <button
          onClick={() => setActiveTab('owner_guide')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'owner_guide'
              ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
              : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
          <span>Owner Setup & Management Guide</span>
        </button>
        <button
          onClick={() => setActiveTab('employee_tutorial')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'employee_tutorial'
              ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
              : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#34C759]" />
          <span>Employee Tracking Tutorial</span>
        </button>
        <button
          onClick={() => setActiveTab('desktop_agent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'desktop_agent'
              ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
              : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5 text-[#AF52DE]" />
          <span>Desktop Companion (.EXE / .DMG)</span>
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'checklist'
              ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
              : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9500]" />
          <span>Launch Readiness Checklist</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OWNER SETUP & MANAGEMENT GUIDE */}
      {/* ========================================================================= */}
      {activeTab === 'owner_guide' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          
          {/* Executive Overview Card */}
          <div className="apple-card p-6 sm:p-7 bg-gradient-to-br from-[#0071E3]/5 to-transparent border border-[#0071E3]/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#0071E3] uppercase tracking-wider bg-[#0071E3]/10 px-2.5 py-1 rounded-full">
                  Step-by-Step Blueprint
                </span>
                <h2 className="text-xl font-bold text-[#1D1D1F] dark:text-white mt-2">
                  Owner & Manager Workspace Setup
                </h2>
                <p className="text-xs sm:text-sm text-[#86868B] dark:text-[#8E8E93] mt-1 max-w-2xl leading-relaxed">
                  Learn how to configure your organization, establish billable client projects, securely invite remote contractors, enforce full-screen screenshot policies, audit 10-minute work diaries, and disburse verified payroll.
                </p>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold flex items-center justify-center gap-2 shrink-0 shadow-sm"
              >
                <Users className="w-4 h-4" />
                <span>Invite First Team Member</span>
              </button>
            </div>
          </div>

          {/* Core Workflow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Step 1: Workspace & Projects */}
            <div className="apple-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0071E3] uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-[10px]">1</span>
                  Project & Client Setup
                </div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white mb-2">
                  Organizing Billable Contracts
                </h3>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed mb-3">
                  Each tracked session is tied to a specific project. Define weekly hourly caps, billing rates (e.g. $65/hr), and milestone deadlines to prevent budget overruns.
                </p>
                <ul className="text-xs text-[#1D1D1F] dark:text-[#E5E5EA] space-y-1.5 list-disc list-inside">
                  <li>Navigate to <strong>Team Live &gt; Projects</strong></li>
                  <li>Set contract budgets and hourly target caps</li>
                  <li>Assign authorized employees to each project</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                💡 Tip: Projects can be customized with distinctive Apple HIG colors for instant visual identification.
              </div>
            </div>

            {/* Step 2: Inviting Remote Employees */}
            <div className="apple-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0071E3] uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-[10px]">2</span>
                  Inviting Remote Employees
                </div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white mb-2">
                  Secure Onboarding & Rates
                </h3>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed mb-3">
                  Invite your developers, designers, and contractors with assigned billable rates. The platform generates an encrypted invitation token ready for Slack, Email, or Discord.
                </p>
                <ul className="text-xs text-[#1D1D1F] dark:text-[#E5E5EA] space-y-1.5 list-disc list-inside">
                  <li>Click <strong>Invite Employee</strong> in the header or dashboard</li>
                  <li>Enter their legal name, corporate email, and $/hr rate</li>
                  <li>Copy the unique onboarding link or send email invite</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-[#86868B] dark:text-[#8E8E93]">Try it now:</span>
                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="text-xs font-semibold text-[#0071E3] hover:underline"
                >
                  Open Invite Modal &rarr;
                </button>
              </div>
            </div>

            {/* Step 3: Upwork-Style 10-Minute Capture Policy */}
            <div className="apple-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0071E3] uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-[10px]">3</span>
                  Screenshot Policy Tuning
                </div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white mb-2">
                  1 to 6 Captures Per 10 Minutes
                </h3>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed mb-3">
                  Just like Upwork, time is tracked in 10-minute blocks (6 blocks per hour). The scheduler randomly fires a capture inside each block window to ensure genuine active work.
                </p>
                <ul className="text-xs text-[#1D1D1F] dark:text-[#E5E5EA] space-y-1.5 list-disc list-inside">
                  <li><strong>Standard (3 shots / 10m):</strong> Balanced for engineering & design</li>
                  <li><strong>Intensive (6 shots / 10m):</strong> High-audit customer support & finance</li>
                  <li><strong>Privacy Blur:</strong> Automatically blurs sensitive client data</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                Adjust anytime via <strong>Manager Suite &gt; Settings</strong> tab.
              </div>
            </div>

            {/* Step 4: Web vs Desktop .EXE Strategy */}
            <div className="apple-card p-5 sm:p-6 flex flex-col justify-between border-2 border-[#0071E3]/20">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0071E3] uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-[10px]">4</span>
                  Web vs Desktop .EXE Strategy
                </div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white mb-2">
                  Guaranteed Full-Screen Auditing
                </h3>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed mb-3">
                  Browser security isolates background tabs and may pause screen sharing when minimized. <strong>For 100% full-screen compliance</strong>, owners can instruct employees to download the Desktop Companion Agent.
                </p>
                <div className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] text-[11px] space-y-1 text-[#1D1D1F] dark:text-[#F5F5F7]">
                  <p>• <strong>Owner:</strong> Uses this Web Dashboard exclusively</p>
                  <p>• <strong>Employee (Web):</strong> Fast start; requires granting "Entire Screen" stream</p>
                  <p>• <strong>Employee (.EXE):</strong> Zero prompts; silent multi-monitor capture</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-[#86868B] dark:text-[#8E8E93]">Get Desktop Agent:</span>
                <button
                  onClick={() => setIsDesktopModalOpen(true)}
                  className="text-xs font-semibold text-[#0071E3] hover:underline"
                >
                  Download .EXE Package &rarr;
                </button>
              </div>
            </div>

            {/* Step 5: Auditing Work Diaries */}
            <div className="apple-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0071E3] uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-[10px]">5</span>
                  Auditing Work Diaries
                </div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white mb-2">
                  Inspecting Telemetry & Screenshots
                </h3>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed mb-3">
                  The <strong>Screenshots & Audit</strong> tab renders a visual calendar matrix of all 10-minute blocks for any day. Click any block to view full-res images, active application name, and keystroke/mouse velocity.
                </p>
                <ul className="text-xs text-[#1D1D1F] dark:text-[#E5E5EA] space-y-1.5 list-disc list-inside">
                  <li><strong>Green blocks:</strong> High activity (&gt;70% keystrokes/mouse)</li>
                  <li><strong>Yellow blocks:</strong> Moderate activity (review screenshots)</li>
                  <li><strong>Discard Block:</strong> Owner can invalidate suspicious blocks</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                Discarded blocks are automatically deducted from the weekly billable total.
              </div>
            </div>

            {/* Step 6: Payroll & PDF Export */}
            <div className="apple-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0071E3] uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-[10px]">6</span>
                  Payroll Approval & Exports
                </div>
                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white mb-2">
                  One-Click Financial Settlement
                </h3>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed mb-3">
                  At the end of the billing cycle (every Monday), navigate to the <strong>Payroll</strong> tab. Inspect each employee's tracked hours, billable amounts, and status.
                </p>
                <ul className="text-xs text-[#1D1D1F] dark:text-[#E5E5EA] space-y-1.5 list-disc list-inside">
                  <li>Mark payments as <strong>Approved</strong> or <strong>Paid</strong></li>
                  <li>Export client-ready vector <strong>PDF Reports</strong> with graphs</li>
                  <li>Download structured <strong>CSV / JSON</strong> for payroll processors (Gusto, Deel, Wise)</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                Print-ready stylesheet includes full time logs and executive signatures.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: EMPLOYEE TRACKING TUTORIAL */}
      {/* ========================================================================= */}
      {activeTab === 'employee_tutorial' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          
          {/* Welcome Card for Employees */}
          <div className="apple-card p-6 sm:p-7 bg-gradient-to-br from-[#34C759]/5 to-transparent border border-[#34C759]/15">
            <span className="text-[10px] font-bold text-[#34C759] uppercase tracking-wider bg-[#34C759]/10 px-2.5 py-1 rounded-full">
              Employee Onboarding & Tutorial
            </span>
            <h2 className="text-xl font-bold text-[#1D1D1F] dark:text-white mt-2">
              How to Track Time & Ensure Screen Capture Works
            </h2>
            <p className="text-xs sm:text-sm text-[#86868B] dark:text-[#8E8E93] mt-1 max-w-2xl leading-relaxed">
              Follow this tutorial to set up screen permissions, understand how 10-minute screenshot blocks are validated, log manual entries, and handle offline network interruptions.
            </p>
          </div>

          {/* Critical: Screen Capture Permission Callout */}
          <div className="apple-card p-6 border-2 border-[#0071E3] bg-[#0071E3]/5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0071E3] text-white flex items-center justify-center shrink-0 shadow-md">
                <Camera className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                    Critical Requirement: Selecting "Entire Screen"
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0071E3] text-white uppercase">
                    Mandatory
                  </span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mt-1 leading-relaxed">
                  When you click <strong>"Start Live Screen Capture"</strong> in Chrome, Edge, or Firefox, the browser will display a permission prompt with three tabs: <em>"Chrome Tab"</em>, <em>"Window"</em>, and <em>"Entire Screen"</em>.
                </p>
                <div className="mt-3 p-3 rounded-xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.1] text-xs">
                  <div className="flex items-center gap-2 text-[#34C759] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Correct: Click "Entire Screen" &rarr; Select your primary monitor &rarr; Click Share</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#FF3B30] font-medium mt-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Incorrect: Do NOT select a single browser tab or window (blocks non-browser work)</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={enableLiveScreenCapture}
                    className="px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Test Browser Screen Permission Now</span>
                  </button>
                  <button
                    onClick={() => setIsDesktopModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.08] text-xs font-semibold text-[#1D1D1F] dark:text-white hover:bg-black/[0.1] transition-all"
                  >
                    Or Download Desktop Agent (.exe)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Employee Journey */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1 */}
            <div className="apple-card p-5 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-bold text-xs flex items-center justify-center mb-3">
                  1
                </span>
                <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white mb-1.5">
                  Select Project & Write Memo
                </h4>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed">
                  Before clicking Start, always select your assigned client project and enter a specific task memo (e.g. <em>"Developing authentication modal and unit tests"</em>). Clear memos protect your hours during manager review.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-[#0071E3] font-medium">
                Tip: You can update the memo anytime while tracking.
              </div>
            </div>

            {/* Step 2 */}
            <div className="apple-card p-5 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-bold text-xs flex items-center justify-center mb-3">
                  2
                </span>
                <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white mb-1.5">
                  The 10-Minute Audit Block
                </h4>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed">
                  ChronoTrack splits each hour into six 10-minute segments. An automated screenshot is taken at a random moment during every block. You will see a green activity meter confirming active keystrokes and mouse clicks.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-[#34C759] font-medium">
                Privacy: No raw keystrokes are recorded, only velocity count.
              </div>
            </div>

            {/* Step 3 */}
            <div className="apple-card p-5 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-bold text-xs flex items-center justify-center mb-3">
                  3
                </span>
                <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white mb-1.5">
                  Taking Breaks & Idle Timeouts
                </h4>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed">
                  When stepping away for lunch or coffee, click <strong>Stop Tracking</strong>. If you step away unexpectedly, the automated sensor detects 5 minutes of zero activity and pauses the timer so idle time is never billed.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                Resuming work will automatically start a fresh block.
              </div>
            </div>

            {/* Step 4 */}
            <div className="apple-card p-5 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-bold text-xs flex items-center justify-center mb-3">
                  4
                </span>
                <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white mb-1.5">
                  Logging Manual Time
                </h4>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed">
                  For offline tasks like client phone calls or whiteboarding, click the <strong>Manual Time</strong> button in the header. Provide the start/end time and a mandatory justification reason for owner approval.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                Manual entries are tagged and highlighted in the audit log.
              </div>
            </div>

            {/* Step 5 */}
            <div className="apple-card p-5 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-bold text-xs flex items-center justify-center mb-3">
                  5
                </span>
                <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white mb-1.5">
                  Offline Outage Protection
                </h4>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed">
                  If your internet drops, ChronoTrack continues tracking smoothly. Time entries and screenshots are encrypted with AES-256 and queued locally. The moment connectivity restores, all blocks sync automatically.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-[#FF9500] font-medium">
                Tested for Wi-Fi drops, travel, and mobile hotspots.
              </div>
            </div>

            {/* Step 6 */}
            <div className="apple-card p-5 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-bold text-xs flex items-center justify-center mb-3">
                  6
                </span>
                <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white mb-1.5">
                  Weekly Review & Payout
                </h4>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed">
                  Check the <strong>Work Diary</strong> tab anytime to inspect your own logged blocks, earnings, and screenshot records. Your manager reviews and finalizes payroll weekly every Monday.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-[#34C759] font-medium">
                Transparent: Employees can audit what was captured anytime.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DESKTOP COMPANION (.EXE) GUIDE */}
      {/* ========================================================================= */}
      {activeTab === 'desktop_agent' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          
          {/* Header Card */}
          <div className="apple-card p-6 sm:p-7 bg-gradient-to-br from-[#AF52DE]/5 to-transparent border border-[#AF52DE]/15">
            <span className="text-[10px] font-bold text-[#AF52DE] uppercase tracking-wider bg-[#AF52DE]/10 px-2.5 py-1 rounded-full">
              Desktop Native Architecture
            </span>
            <h2 className="text-xl font-bold text-[#1D1D1F] dark:text-white mt-2">
              ChronoTrack Desktop Agent (.EXE / .DMG)
            </h2>
            <p className="text-xs sm:text-sm text-[#86868B] dark:text-[#8E8E93] mt-1 max-w-2xl leading-relaxed">
              When full-screen auditing is critical and browser sandbox policies are restrictive, the native companion runs silently in the OS system tray with direct GPU display capture.
            </p>
          </div>

          {/* Architecture Comparison: Web vs Desktop */}
          <div className="apple-card overflow-hidden">
            <div className="p-5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-white">
                Technical Capabilities: Browser Tracker vs Desktop Agent (.EXE)
              </h3>
              <span className="text-xs text-[#86868B]">Comparison Matrix</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.06] dark:border-white/[0.08]">
                  <tr>
                    <th className="p-3.5 font-semibold text-[#86868B]">Capability</th>
                    <th className="p-3.5 font-semibold text-[#1D1D1F] dark:text-white">Web Browser Tracker</th>
                    <th className="p-3.5 font-semibold text-[#0071E3]">Desktop Native Agent (.EXE)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                  <tr>
                    <td className="p-3.5 font-medium text-[#1D1D1F] dark:text-white">Full Screen Capture</td>
                    <td className="p-3.5 text-[#86868B]">Requires user to manually pick "Entire Screen"</td>
                    <td className="p-3.5 text-[#34C759] font-medium">✓ Automatic across all active monitors</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-[#1D1D1F] dark:text-white">Background Capture</td>
                    <td className="p-3.5 text-[#86868B]">Browser throttles inactive background tabs</td>
                    <td className="p-3.5 text-[#34C759] font-medium">✓ 100% background daemon in system tray</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-[#1D1D1F] dark:text-white">Keystroke & Mouse Velocity</td>
                    <td className="p-3.5 text-[#86868B]">Monitored when focus is on tracking tab</td>
                    <td className="p-3.5 text-[#34C759] font-medium">✓ System-wide OS input hook (no keylogging)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-[#1D1D1F] dark:text-white">Active App & URL Title</td>
                    <td className="p-3.5 text-[#86868B]">Limited by browser cross-origin policy</td>
                    <td className="p-3.5 text-[#34C759] font-medium">✓ Reads active foreground window & title</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-[#1D1D1F] dark:text-white">Offline Resilience</td>
                    <td className="p-3.5 text-[#34C759] font-medium">✓ IndexedDB Encrypted Queue</td>
                    <td className="p-3.5 text-[#34C759] font-medium">✓ Local SQLite with AES-256 GCM</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-[#1D1D1F] dark:text-white">Installation Friction</td>
                    <td className="p-3.5 text-[#34C759] font-medium">Zero install; runs in browser instantly</td>
                    <td className="p-3.5 text-[#86868B]">Requires 1-time setup file download</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Download & Launch Package */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="apple-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#0071E3]">
                  <Laptop className="w-4 h-4" />
                  <span>Windows 10 / 11 (64-bit)</span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mb-4">
                  Includes DirectX / DesktopDuplication capture engine and Windows Taskbar Tray companion.
                </p>
              </div>
              <button
                onClick={() => downloadDesktopAgent('win')}
                className="w-full py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ChronoTrack.exe</span>
              </button>
            </div>

            <div className="apple-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#1D1D1F] dark:text-white">
                  <Apple className="w-4 h-4" />
                  <span>macOS (Apple Silicon & Intel)</span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mb-4">
                  Universal binary built with CoreGraphics display streaming and macOS Menu Bar icon.
                </p>
              </div>
              <button
                onClick={() => downloadDesktopAgent('mac')}
                className="w-full py-2.5 rounded-xl bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] text-[#1D1D1F] dark:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download macOS .DMG</span>
              </button>
            </div>

            <div className="apple-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#86868B]">
                  <Terminal className="w-4 h-4" />
                  <span>Linux (X11 / Wayland)</span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mb-4">
                  Standalone shell script and AppImage companion for Ubuntu, Debian, Fedora, and Arch.
                </p>
              </div>
              <button
                onClick={() => downloadDesktopAgent('linux')}
                className="w-full py-2.5 rounded-xl bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] text-[#1D1D1F] dark:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Linux Script</span>
              </button>
            </div>
          </div>

          {/* Quick CLI Run Code Block */}
          <div className="apple-card p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1D1D1F] dark:text-white">
                <Terminal className="w-4 h-4 text-[#0071E3]" />
                <span>CLI Quick Start (For Developers & Remote Engineers)</span>
              </div>
              <button
                onClick={() => copyQuickScript('npx chronotrack-agent --token=org_apollo_live --screen=primary')}
                className="flex items-center gap-1 text-[11px] text-[#0071E3] font-medium hover:underline"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-[#34C759]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? 'Copied command!' : 'Copy command'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-black/[0.04] dark:bg-black/60 font-mono text-xs text-[#1D1D1F] dark:text-[#34C759] overflow-x-auto">
              npx chronotrack-agent --token=org_apollo_live --screen=primary --sync={window.location.origin}
            </pre>
            <p className="text-[11px] text-[#86868B] dark:text-[#8E8E93] mt-2">
              The CLI daemon launches a silent background worker that continuously audits your screen and transmits encrypted telemetry to this dashboard.
            </p>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: LAUNCH READINESS CHECKLIST */}
      {/* ========================================================================= */}
      {activeTab === 'checklist' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          
          <div className="apple-card p-6 sm:p-7 bg-gradient-to-br from-[#FF9500]/5 to-transparent border border-[#FF9500]/15">
            <span className="text-[10px] font-bold text-[#FF9500] uppercase tracking-wider bg-[#FF9500]/10 px-2.5 py-1 rounded-full">
              Pre-Flight Audit
            </span>
            <h2 className="text-xl font-bold text-[#1D1D1F] dark:text-white mt-2">
              Workspace & Tracking Readiness Checklist
            </h2>
            <p className="text-xs sm:text-sm text-[#86868B] dark:text-[#8E8E93] mt-1 max-w-2xl leading-relaxed">
              Verify each prerequisite below before commencing formal client billing. Check each item as you confirm system readiness.
            </p>
          </div>

          <div className="apple-card divide-y divide-black/[0.06] dark:divide-white/[0.08]">
            
            {/* Item 1 */}
            <div
              onClick={() => toggleCheck('check-1')}
              className="p-4 sm:p-5 flex items-start gap-3.5 cursor-pointer hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors"
            >
              <input
                type="checkbox"
                checked={checkedList['check-1'] || false}
                onChange={() => {}}
                className="mt-1 w-4 h-4 rounded text-[#0071E3] focus:ring-[#0071E3] cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                    1. Workspace Organization & Projects Defined
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#34C759]/10 text-[#34C759]">
                    Configured ({projects.length} Projects)
                  </span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mt-0.5">
                  Client contracts, hourly billing rates, and milestone delivery targets are populated in local encrypted storage.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div
              onClick={() => toggleCheck('check-2')}
              className="p-4 sm:p-5 flex items-start gap-3.5 cursor-pointer hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors"
            >
              <input
                type="checkbox"
                checked={checkedList['check-2'] || false}
                onChange={() => {}}
                className="mt-1 w-4 h-4 rounded text-[#0071E3] focus:ring-[#0071E3] cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                    2. Remote Team Members & Roles Invited
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3]">
                    Ready
                  </span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mt-0.5">
                  Employees have received invitation links with assigned billable rates and designated projects.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div
              onClick={() => toggleCheck('check-3')}
              className="p-4 sm:p-5 flex items-start gap-3.5 cursor-pointer hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors"
            >
              <input
                type="checkbox"
                checked={checkedList['check-3'] || false}
                onChange={() => {}}
                className="mt-1 w-4 h-4 rounded text-[#0071E3] focus:ring-[#0071E3] cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                    3. Screen Capture Protocol Verified
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FF9500]/10 text-[#FF9500]">
                    Action Required
                  </span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mt-0.5">
                  Confirm that employees have either granted <strong>"Entire Screen"</strong> permission in browser or downloaded the <strong>ChronoTrack-Agent.exe</strong> desktop client.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div
              onClick={() => toggleCheck('check-4')}
              className="p-4 sm:p-5 flex items-start gap-3.5 cursor-pointer hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors"
            >
              <input
                type="checkbox"
                checked={checkedList['check-4'] || false}
                onChange={() => {}}
                className="mt-1 w-4 h-4 rounded text-[#0071E3] focus:ring-[#0071E3] cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                    4. Capture Frequency & Privacy Blur Policy Set
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#86868B]/10 text-[#86868B]">
                    Current: {settings.screenshotsPer10Min} shots / 10m
                  </span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mt-0.5">
                  Set to 3 shots / 10m by default. Enable Privacy Blur if your team handles HIPAA, confidential banking, or GDPR records.
                </p>
              </div>
            </div>

            {/* Item 5 */}
            <div
              onClick={() => toggleCheck('check-5')}
              className="p-4 sm:p-5 flex items-start gap-3.5 cursor-pointer hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors"
            >
              <input
                type="checkbox"
                checked={checkedList['check-5'] || false}
                onChange={() => {}}
                className="mt-1 w-4 h-4 rounded text-[#0071E3] focus:ring-[#0071E3] cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                    5. Offline Outage Simulation Tested
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#86868B]/10 text-[#86868B]">
                    Optional Test
                  </span>
                </div>
                <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mt-0.5">
                  Click the <strong>"Online"</strong> pill in the header to simulate a network disconnection. Confirm entries are queued in local encrypted storage and flush on reconnect.
                </p>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]">
            <span className="text-xs text-[#86868B] dark:text-[#8E8E93]">
              Readiness Score: {Object.values(checkedList).filter(Boolean).length} / 5 items confirmed
            </span>
            <button
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-2 rounded-xl bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0077ED] transition-all"
            >
              Return to Manager Dashboard
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
