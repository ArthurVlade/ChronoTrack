import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Download,
  Monitor,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Terminal,
  HelpCircle,
  ExternalLink,
  Laptop,
  Apple,
  FileCode,
  Key,
  Copy,
  Check,
  FileJson
} from 'lucide-react';

export const DesktopAgentModal: React.FC = () => {
  const {
    currentUser,
    isDesktopModalOpen,
    setIsDesktopModalOpen,
    downloadDesktopAgent,
    downloadAgentConfig
  } = useApp();

  const [selectedOS, setSelectedOS] = useState<'win' | 'mac' | 'linux'>('win');
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isDesktopModalOpen) return null;

  const handleDownload = () => {
    downloadDesktopAgent(selectedOS);
    setHasDownloaded(true);
  };

  const handleCopyToken = () => {
    if (currentUser.apiToken) {
      navigator.clipboard.writeText(currentUser.apiToken);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl apple-card shadow-2xl p-6 sm:p-8 relative border border-black/[0.08] dark:border-white/[0.1] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-desktop-modal"
          onClick={() => setIsDesktopModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0071E3] to-[#409CFF] text-white flex items-center justify-center shadow-md shadow-[#0071E3]/20">
            <Monitor className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
                ChronoTrack Desktop Agent
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/20">
                v2.4 Production
              </span>
            </div>
            <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mt-0.5">
              Native background companion for remote employees with guaranteed full-screen capture.
            </p>
          </div>
        </div>

        {/* Why Desktop Agent Banner */}
        <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] mb-6">
          <h3 className="text-xs font-bold text-[#1D1D1F] dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0071E3]" />
            Why Remote Teams Require the Desktop Client
          </h3>
          <p className="text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed">
            Modern web browsers isolate tabs and block background screen captures whenever the browser window is minimized or inactive. The ChronoTrack Desktop Agent runs silently in the system tray, capturing the <strong className="text-[#1D1D1F] dark:text-white">entire screen across multiple displays</strong> and logging hardware activity velocity with 100% reliability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
            <div className="flex items-center gap-2 text-[11px] text-[#1D1D1F] dark:text-[#F5F5F7]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
              <span>Full Screen Multi-Monitor</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#1D1D1F] dark:text-[#F5F5F7]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
              <span>OS-Level Activity Hook</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#1D1D1F] dark:text-[#F5F5F7]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
              <span>AES-256 Cloud Sync</span>
            </div>
          </div>
        </div>

        {/* OS Platform Selector Tabs */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] mb-5">
          <button
            onClick={() => setSelectedOS('win')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedOS === 'win'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Windows (.exe / .bat)</span>
          </button>
          <button
            onClick={() => setSelectedOS('mac')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedOS === 'mac'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>macOS (.dmg)</span>
          </button>
          <button
            onClick={() => setSelectedOS('linux')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedOS === 'linux'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs'
                : 'text-[#86868B] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Linux (.AppImage)</span>
          </button>
        </div>

        {/* Selected OS Details & Download Action */}
        <div className="p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#1C1C1E] flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center text-[#1D1D1F] dark:text-white">
              {selectedOS === 'win' ? <Laptop className="w-5 h-5" /> : selectedOS === 'mac' ? <Apple className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                {selectedOS === 'win'
                  ? 'ChronoTrack-Agent-Setup-v2.4.exe'
                  : selectedOS === 'mac'
                  ? 'ChronoTrack-Agent-v2.4-Universal.dmg'
                  : 'ChronoTrack-Agent-v2.4.AppImage'}
              </p>
              <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                {selectedOS === 'win'
                  ? 'Windows 10 / 11 (64-bit) • 42.4 MB • Auto-Updating'
                  : selectedOS === 'mac'
                  ? 'macOS 12+ Monterey, Ventura, Sonoma (Apple Silicon & Intel)'
                  : 'Ubuntu 20.04+, Debian, Fedora, Arch Linux'}
              </p>
            </div>
          </div>

          <button
            id="btn-download-desktop-client"
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Agent</span>
          </button>
        </div>

        {hasDownloaded && (
          <div className="p-3 rounded-xl bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/20 text-xs mb-5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Installer downloaded with your API credentials embedded. Follow the setup steps below to start tracking.</span>
          </div>
        )}

        {/* Account API Connection Card (Solves: Downloadable connecting to account) */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0071E3]/5 to-[#AF52DE]/5 border border-[#0071E3]/20 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#0071E3]" />
              <h4 className="text-xs font-bold text-[#1D1D1F] dark:text-white uppercase tracking-wider">
                Your Account API Connection Key
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">
              Pre-linked to {currentUser.name}
            </span>
          </div>
          <p className="text-xs text-[#86868B] dark:text-[#8E8E93] mb-3 leading-relaxed">
            The downloadable .exe connects to your account (<strong className="text-[#1D1D1F] dark:text-white">{currentUser.email}</strong>). You can also manually provide this secret token in the desktop client or export the JSON configuration file below:
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                readOnly
                value={currentUser.apiToken || `ct_live_${currentUser.id}_token`}
                className="w-full h-10 px-3 pr-24 rounded-xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono text-[#1D1D1F] dark:text-white focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyToken}
                className="absolute right-1 top-1 h-8 px-2.5 rounded-lg bg-[#0071E3] text-white text-[11px] font-semibold flex items-center gap-1 hover:bg-[#0077ED] transition-colors cursor-pointer"
              >
                {copiedToken ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={downloadAgentConfig}
              className="h-10 px-3.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-xs font-semibold text-[#1D1D1F] dark:text-white flex items-center justify-center gap-1.5 transition-colors border border-black/[0.06] dark:border-white/[0.08] whitespace-nowrap cursor-pointer"
              title="Download chronotrack-agent-config.json"
            >
              <FileJson className="w-3.5 h-3.5 text-[#FF9500]" />
              <span>Export config.json</span>
            </button>
          </div>
        </div>

        {/* 3-Step Setup Instructions */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold text-[#1D1D1F] dark:text-white uppercase tracking-wider">
            Quick Installation & Tracking Setup
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
              <span className="inline-block w-5 h-5 rounded-full bg-[#0071E3] text-white text-[10px] font-bold text-center leading-5 mb-2">
                1
              </span>
              <p className="text-xs font-semibold text-[#1D1D1F] dark:text-white mb-1">
                Install & Run Agent
              </p>
              <p className="text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                Double-click the setup file. Grant Screen Recording permission if prompted by Windows Defender or macOS.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
              <span className="inline-block w-5 h-5 rounded-full bg-[#0071E3] text-white text-[10px] font-bold text-center leading-5 mb-2">
                2
              </span>
              <p className="text-xs font-semibold text-[#1D1D1F] dark:text-white mb-1">
                Sign In With Token
              </p>
              <p className="text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                Paste your invitation link or enter your employee work email to authenticate with the company workspace.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
              <span className="inline-block w-5 h-5 rounded-full bg-[#0071E3] text-white text-[10px] font-bold text-center leading-5 mb-2">
                3
              </span>
              <p className="text-xs font-semibold text-[#1D1D1F] dark:text-white mb-1">
                Silent Background Tracking
              </p>
              <p className="text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                The agent minimizes to the system tray. Your 10-minute full screen blocks sync seamlessly with the web dashboard!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
          <span className="text-[11px] text-[#86868B] dark:text-[#8E8E93]">
            Owner uses the Web Dashboard • Remote employees track via Desktop or Web
          </span>
          <button
            onClick={() => setIsDesktopModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#1D1D1F] dark:text-white bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
