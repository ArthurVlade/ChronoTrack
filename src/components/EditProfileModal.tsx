import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, User as UserIcon, Mail, Briefcase, DollarSign, Camera, Check, Key, ShieldCheck, RefreshCw, Copy } from 'lucide-react';
import { User } from '../types';

const CURATED_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
];

interface EditProfileModalProps {
  targetUser?: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  targetUser,
  isOpen,
  onClose
}) => {
  const { currentUser, updateUserProfile, projects, addNotification } = useApp();

  const userToEdit = targetUser || currentUser;

  const [name, setName] = useState(userToEdit.name);
  const [email, setEmail] = useState(userToEdit.email);
  const [avatar, setAvatar] = useState(userToEdit.avatar);
  const [designation, setDesignation] = useState(userToEdit.designation);
  const [hourlyRate, setHourlyRate] = useState<number>(userToEdit.hourlyRate);
  const [activeProject, setActiveProject] = useState<string>(userToEdit.activeProject || projects[0]?.id || 'proj-1');
  const [newPassword, setNewPassword] = useState('');
  const [apiToken, setApiToken] = useState(userToEdit.apiToken || `ct_live_${userToEdit.id}_${Math.random().toString(36).substring(2, 7)}`);
  const [copiedToken, setCopiedToken] = useState(false);

  useEffect(() => {
    setName(userToEdit.name);
    setEmail(userToEdit.email);
    setAvatar(userToEdit.avatar);
    setDesignation(userToEdit.designation);
    setHourlyRate(userToEdit.hourlyRate);
    setActiveProject(userToEdit.activeProject || projects[0]?.id || 'proj-1');
    setApiToken(userToEdit.apiToken || `ct_live_${userToEdit.id}_${Math.random().toString(36).substring(2, 7)}`);
    setNewPassword('');
  }, [userToEdit, isOpen, projects]);

  if (!isOpen) return null;

  const isOwnerEditing = currentUser.role === 'owner';

  const handleCopyToken = () => {
    navigator.clipboard.writeText(apiToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleRegenerateToken = () => {
    const newToken = `ct_live_${userToEdit.id.replace(/[^a-zA-Z0-9]/g, '')}_${Math.random().toString(36).substring(2, 10)}`;
    setApiToken(newToken);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const updates: Partial<User> = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      avatar: avatar.trim(),
      designation: designation.trim(),
      apiToken
    };

    if (isOwnerEditing) {
      updates.hourlyRate = Number(hourlyRate);
      updates.activeProject = activeProject;
    }

    if (newPassword.trim()) {
      updates.password = newPassword.trim();
    }

    updateUserProfile(userToEdit.id, updates);

    addNotification({
      title: 'Profile Updated',
      message: `Successfully saved profile changes for ${name.trim()}.`,
      type: 'sync'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative max-w-lg w-full apple-card p-6 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center">
              <UserIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                Edit Member Details
              </h2>
              <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                {userToEdit.id === currentUser.id ? 'Your Profile & Account Settings' : `Managing ${userToEdit.name}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-[#86868B] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Avatar Selection & Preview */}
          <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={avatar}
                alt="Profile Preview"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#0071E3]/20 shadow-sm"
              />
              <div className="flex-1">
                <span className="text-xs font-semibold text-[#1D1D1F] dark:text-white block">
                  Profile Picture
                </span>
                <span className="text-[11px] text-[#86868B] dark:text-[#8E8E93] block">
                  Choose a preset or paste a custom image URL below
                </span>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {CURATED_AVATARS.map((url, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setAvatar(url)}
                  className={`relative w-8 h-8 rounded-full overflow-hidden shrink-0 transition-transform ${
                    avatar === url ? 'ring-2 ring-[#0071E3] scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                  {avatar === url && (
                    <div className="absolute inset-0 bg-[#0071E3]/40 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-[#86868B]" />
              <input
                type="url"
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="flex-1 px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.1] text-[#1D1D1F] dark:text-white"
              />
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] focus-within:border-[#0071E3]">
                <UserIcon className="w-4 h-4 text-[#86868B]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1D1D1F] dark:text-white focus:outline-hidden"
                  placeholder="e.g. Alex Rivera"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1">
                Work Email
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] focus-within:border-[#0071E3]">
                <Mail className="w-4 h-4 text-[#86868B]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1D1D1F] dark:text-white focus:outline-hidden"
                  placeholder="name@company.com"
                />
              </div>
            </div>
          </div>

          {/* Designation / Title */}
          <div>
            <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1">
              Job Title / Designation
            </label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] focus-within:border-[#0071E3]">
              <Briefcase className="w-4 h-4 text-[#86868B]" />
              <input
                type="text"
                value={designation}
                onChange={e => setDesignation(e.target.value)}
                className="w-full bg-transparent text-xs text-[#1D1D1F] dark:text-white focus:outline-hidden"
                placeholder="e.g. Senior Frontend Engineer"
              />
            </div>
          </div>

          {/* Owner Only Fields: Rate & Assigned Project */}
          {isOwnerEditing && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-[#0071E3]/5 border border-[#0071E3]/15">
              <div>
                <label className="block text-[11px] font-semibold text-[#0071E3] uppercase tracking-wider mb-1">
                  Billable Rate ($/hr)
                </label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-[#1C1C1E] border border-[#0071E3]/20">
                  <DollarSign className="w-4 h-4 text-[#0071E3]" />
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={hourlyRate}
                    onChange={e => setHourlyRate(Number(e.target.value))}
                    className="w-full bg-transparent text-xs font-semibold text-[#1D1D1F] dark:text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#0071E3] uppercase tracking-wider mb-1">
                  Assigned Project
                </label>
                <select
                  value={activeProject}
                  onChange={e => setActiveProject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1C1C1E] border border-[#0071E3]/20 text-xs text-[#1D1D1F] dark:text-white focus:outline-hidden"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Change Password */}
          <div>
            <label className="block text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider mb-1">
              New Password <span className="font-normal lowercase">(leave blank to keep current)</span>
            </label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] focus-within:border-[#0071E3]">
              <Key className="w-4 h-4 text-[#86868B]" />
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-[#1D1D1F] dark:text-white focus:outline-hidden font-mono"
              />
            </div>
          </div>

          {/* Desktop Companion API Token */}
          <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#86868B] dark:text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34C759]" />
                Desktop Agent API Token
              </span>
              <button
                type="button"
                onClick={handleRegenerateToken}
                className="text-[10px] text-[#0071E3] hover:underline flex items-center gap-1"
                title="Regenerate unique connection token"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Regenerate</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <code className="flex-1 px-2.5 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] text-[11px] font-mono text-[#1D1D1F] dark:text-[#F5F5F7] truncate select-all">
                {apiToken}
              </code>
              <button
                type="button"
                onClick={handleCopyToken}
                className="px-2.5 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-xs font-medium text-[#1D1D1F] dark:text-white flex items-center gap-1 transition-all"
              >
                {copiedToken ? <Check className="w-3 h-3 text-[#34C759]" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">{copiedToken ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[10px] text-[#86868B] dark:text-[#8E8E93]">
              Used by the `.exe` desktop companion to authenticate full-screen background screen captures.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-sm transition-all cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
