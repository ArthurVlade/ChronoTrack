import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Clock, Calendar, FileText, AlertCircle } from 'lucide-react';

export const ManualTimeModal: React.FC = () => {
  const {
    projects,
    activeProjectId,
    addManualTimeEntry,
    isManualModalOpen,
    setIsManualModalOpen,
    settings
  } = useApp();

  const [projectId, setProjectId] = useState<string>(activeProjectId);
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>('09:30');
  const [endTime, setEndTime] = useState<string>('11:00');
  const [memo, setMemo] = useState<string>('');
  const [reason, setReason] = useState<string>('Client technical consultation outside workstation');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isManualModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memo.trim()) {
      alert('Please provide a memo describing what was accomplished during this manual time.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addManualTimeEntry({
        projectId,
        date,
        startTime,
        endTime,
        memo,
        reason
      });
      setIsManualModalOpen(false);
      setMemo('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative max-w-lg w-full apple-card p-6 sm:p-7 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                Log Manual Time
              </h2>
              <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                Record off-screen meetings or offline client activities.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsManualModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-[#86868B]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!settings.allowManualTime && (
          <div className="my-4 p-3 rounded-xl bg-[#FF3B30]/10 text-[#FF3B30] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Manual time is currently restricted by the team owner in Tracking Policies.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 text-xs">
          
          {/* Project */}
          <div>
            <label className="block text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">
              Project
            </label>
            <select
              value={projectId}
              onChange={e => setProjectId(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] text-xs font-semibold text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id} className="bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-white">
                  {p.name} (${p.hourlyRate}/hr)
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time Range */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">
              Reason for Manual Entry
            </label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
            >
              <option value="Client technical consultation outside workstation">Client technical consultation outside workstation</option>
              <option value="Offline system architecture & design brainstorm">Offline system architecture & design brainstorm</option>
              <option value="Local internet outage (offline productivity)">Local internet outage (offline productivity)</option>
              <option value="External hardware & mobile device testing">External hardware & mobile device testing</option>
              <option value="Forgot to activate desktop tracker">Forgot to activate desktop tracker</option>
            </select>
          </div>

          {/* Memo */}
          <div>
            <label className="block text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">
              Task Memo / Description
            </label>
            <textarea
              rows={3}
              value={memo}
              onChange={e => setMemo(e.target.value)}
              placeholder="Detail the deliverable or discussion summary..."
              className="w-full p-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] text-xs text-[#1D1D1F] dark:text-white placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
              required
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsManualModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !settings.allowManualTime}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-xs disabled:opacity-40 transition-all cursor-pointer"
            >
              {isSubmitting ? 'Logging...' : 'Save Manual Time'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
