import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Mail,
  User,
  DollarSign,
  Briefcase,
  Shield,
  Copy,
  Check,
  Send,
  Link,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const InviteEmployeeModal: React.FC = () => {
  const {
    isInviteModalOpen,
    setIsInviteModalOpen,
    inviteEmployee,
    projects
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'employee' | 'owner'>('employee');
  const [hourlyRate, setHourlyRate] = useState<number>(55);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj-1');
  const [copiedLink, setCopiedLink] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [generatedInviteLink, setGeneratedInviteLink] = useState('');

  if (!isInviteModalOpen) return null;

  const handleGenerateAndInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    await inviteEmployee({
      name: name.trim(),
      email: email.trim(),
      role,
      hourlyRate: Number(hourlyRate) || 50,
      projectId: selectedProjectId
    });

    const mockToken = btoa(JSON.stringify({ email, name, role, org: 'Apollo Labs', exp: Date.now() + 7 * 86400000 }));
    const inviteUrl = `${window.location.origin}/invite?token=${mockToken.slice(0, 32)}`;
    setGeneratedInviteLink(inviteUrl);
    setInviteSuccess(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedInviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setInviteSuccess(false);
    setGeneratedInviteLink('');
    setIsInviteModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg apple-card shadow-2xl p-6 sm:p-7 relative border border-black/[0.08] dark:border-white/[0.1] animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-invite-modal"
          onClick={resetForm}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
              Invite Team Member
            </h2>
            <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
              Send secure onboarding credentials and tracking permissions.
            </p>
          </div>
        </div>

        {!inviteSuccess ? (
          <form onSubmit={handleGenerateAndInvite} className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-sm text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="jordan.miller@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-sm text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                />
              </div>
            </div>

            {/* Role & Hourly Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
                  Workspace Role
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3.5" />
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as 'employee' | 'owner')}
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-sm text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3] cursor-pointer"
                  >
                    <option value="employee">Employee (Tracker only)</option>
                    <option value="owner">Manager / Owner (Full Suite)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
                  Billable Rate ($/hr)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3.5" />
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={hourlyRate}
                    onChange={e => setHourlyRate(Number(e.target.value))}
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-sm text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>
              </div>
            </div>

            {/* Assigned Project */}
            <div>
              <label className="block text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
                Initial Assigned Project
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3.5" />
                <select
                  value={selectedProjectId}
                  onChange={e => setSelectedProjectId(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-sm text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3] cursor-pointer"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.clientName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Owner Note on Screen Capture */}
            <div className="p-3 rounded-xl bg-[#0071E3]/5 border border-[#0071E3]/15 text-xs text-[#86868B] dark:text-[#8E8E93] leading-relaxed">
              <span className="font-semibold text-[#0071E3]">Screen Tracking Policy:</span> New hires will be given the option to track through the web app (with Entire Screen permission) or download the <strong className="text-[#1D1D1F] dark:text-white">ChronoTrack Desktop .exe</strong> for zero-fuss background capture.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 w-full h-11 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Create Invitation & Generate Link</span>
            </button>
          </form>
        ) : (
          /* Success Screen */
          <div className="flex flex-col gap-4 py-2">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/20">
              <Check className="w-5 h-5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#1D1D1F] dark:text-white">
                  Invitation Created Successfully!
                </p>
                <p className="text-[11px] text-[#86868B] dark:text-[#8E8E93]">
                  {name} has been added to your workspace at ${hourlyRate}/hr.
                </p>
              </div>
            </div>

            {/* Shareable Link Box */}
            <div>
              <label className="block text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
                Shareable Onboarding Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedInviteLink}
                  className="flex-1 h-10 px-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono text-[#1D1D1F] dark:text-white select-all"
                />
                <button
                  onClick={copyToClipboard}
                  className="h-10 px-3.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium flex items-center gap-1.5 transition-all shrink-0"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Ready-to-send Message Template */}
            <div>
              <label className="block text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1.5">
                Email / Slack Invitation Preview
              </label>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono text-[#86868B] dark:text-[#8E8E93] leading-relaxed select-all">
                Hi {name},<br />
                You have been invited to join the remote team on ChronoTrack for <strong>{projects.find(p => p.id === selectedProjectId)?.name}</strong> at ${hourlyRate}/hr.<br /><br />
                1. Accept your invitation: {generatedInviteLink}<br />
                2. Select tracking mode: Web Tracker or download ChronoTrack-Agent.exe<br />
                3. Ensure "Entire Screen" permission is granted so your 10-minute work diary blocks are validated.<br /><br />
                Welcome aboard!
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                onClick={() => setInviteSuccess(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white"
              >
                Invite Another
              </button>
              <button
                onClick={resetForm}
                className="px-5 py-2 rounded-xl bg-[#0071E3] text-white text-xs font-medium hover:bg-[#0077ED] transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
