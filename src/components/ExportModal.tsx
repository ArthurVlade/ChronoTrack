import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Download, FileText, Printer, CheckCircle, Database } from 'lucide-react';
import { exportToCSV } from '../services/storage';

export const ExportModal: React.FC = () => {
  const {
    timeEntries,
    users,
    projects,
    isExportModalOpen,
    setIsExportModalOpen,
    addNotification
  } = useApp();

  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'json'>('pdf');
  const [selectedUserFilter, setSelectedUserFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');

  if (!isExportModalOpen) return null;

  const filteredEntries = timeEntries.filter(e => {
    if (selectedUserFilter !== 'all' && e.userId !== selectedUserFilter) return false;
    return true;
  });

  const handleExport = () => {
    if (exportFormat === 'csv') {
      exportToCSV(filteredEntries, `chronotrack_report_${new Date().toISOString().split('T')[0]}.csv`);
      addNotification({
        title: 'CSV Export Generated',
        message: `Exported ${filteredEntries.length} timesheet records successfully.`,
        type: 'sync'
      });
      setIsExportModalOpen(false);
    } else if (exportFormat === 'json') {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredEntries, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `chronotrack_analytics_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      addNotification({
        title: 'JSON Analytics Exported',
        message: 'Raw performance dataset exported for external BI / analytics tools.',
        type: 'sync'
      });
      setIsExportModalOpen(false);
    } else if (exportFormat === 'pdf') {
      // Trigger formatted browser print dialog which produces clean vector PDF
      setIsExportModalOpen(false);
      setTimeout(() => {
        window.print();
      }, 200);
      addNotification({
        title: 'Print / PDF Report Triggered',
        message: 'Opening system print dialog with customized timesheet layout.',
        type: 'sync'
      });
    }
  };

  const totalFilteredSeconds = filteredEntries.reduce((acc, curr) => acc + curr.durationSeconds, 0);
  const totalFilteredHours = (totalFilteredSeconds / 3600).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150 no-print">
      <div className="relative max-w-lg w-full apple-card p-6 sm:p-7 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#34C759]/10 text-[#34C759] flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                Export Analytics & Reports
              </h2>
              <p className="text-xs text-[#86868B] dark:text-[#8E8E93]">
                Download official PDF timesheets or customized CSV datasets.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExportModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-[#86868B]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 mt-4 text-xs">
          
          {/* Format Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setExportFormat('pdf')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  exportFormat === 'pdf'
                    ? 'bg-[#0071E3]/10 border-[#0071E3] text-[#0071E3]'
                    : 'bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.06] dark:border-white/[0.08] text-[#1D1D1F] dark:text-white'
                }`}
              >
                <Printer className="w-5 h-5" />
                <span className="font-semibold">PDF Report</span>
              </button>

              <button
                type="button"
                onClick={() => setExportFormat('csv')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  exportFormat === 'csv'
                    ? 'bg-[#34C759]/10 border-[#34C759] text-[#34C759]'
                    : 'bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.06] dark:border-white/[0.08] text-[#1D1D1F] dark:text-white'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-semibold">CSV Spreadsheet</span>
              </button>

              <button
                type="button"
                onClick={() => setExportFormat('json')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  exportFormat === 'json'
                    ? 'bg-[#AF52DE]/10 border-[#AF52DE] text-[#AF52DE]'
                    : 'bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.06] dark:border-white/[0.08] text-[#1D1D1F] dark:text-white'
                }`}
              >
                <Database className="w-5 h-5" />
                <span className="font-semibold">JSON Raw</span>
              </button>
            </div>
          </div>

          {/* Member Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">
              Filter by Team Member
            </label>
            <select
              value={selectedUserFilter}
              onChange={e => setSelectedUserFilter(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] text-xs text-[#1D1D1F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
            >
              <option value="all">All Remote Team Members</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          {/* Summary Box */}
          <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs">
            <div>
              <span className="text-[#86868B]">Dataset Scope:</span>
              <p className="font-bold text-[#1D1D1F] dark:text-white">
                {filteredEntries.length} time entries ({totalFilteredHours} total hours)
              </p>
            </div>
            <span className="font-mono text-xs text-[#34C759] font-bold">
              Ready to generate
            </span>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsExportModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {exportFormat.toUpperCase()}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
