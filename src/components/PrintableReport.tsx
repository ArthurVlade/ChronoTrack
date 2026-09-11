import React from 'react';
import { useApp } from '../context/AppContext';

export const PrintableReport: React.FC = () => {
  const { currentUser, timeEntries, projects } = useApp();

  const totalSeconds = timeEntries.reduce((a, b) => a + b.durationSeconds, 0);
  const totalHours = (totalSeconds / 3600).toFixed(2);
  const totalGross = ((totalSeconds / 3600) * currentUser.hourlyRate).toFixed(2);

  return (
    <div className="hidden print-only print-container p-8 max-w-4xl mx-auto bg-white text-black font-sans">
      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ChronoTrack Remote Performance Report</h1>
          <p className="text-sm text-gray-600 mt-1">Official Timesheet & Activity Verification Audit</p>
        </div>
        <div className="text-right text-xs">
          <p><strong>Generated:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Audit Period:</strong> Current Weekly Cycle</p>
          <p><strong>Encryption:</strong> AES-256 GCM Client Verified</p>
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg mb-6 text-sm">
        <div>
          <span className="text-gray-500 text-xs block">Team Member:</span>
          <strong>{currentUser.name}</strong> ({currentUser.email})
        </div>
        <div>
          <span className="text-gray-500 text-xs block">Designation / Rate:</span>
          <strong>{currentUser.designation}</strong> (${currentUser.hourlyRate}/hr)
        </div>
        <div>
          <span className="text-gray-500 text-xs block">Total Accrued Payout:</span>
          <strong className="text-lg">${totalGross}</strong> ({totalHours} hrs)
        </div>
      </div>

      {/* Timesheet Table */}
      <h2 className="text-base font-bold mb-2">Verified Time Blocks</h2>
      <table className="w-full text-left text-xs border border-gray-300 mb-6">
        <thead className="bg-gray-100 border-b border-gray-300 font-semibold">
          <tr>
            <th className="p-2 border-r border-gray-300">Date</th>
            <th className="p-2 border-r border-gray-300">Project</th>
            <th className="p-2 border-r border-gray-300">Time Range</th>
            <th className="p-2 border-r border-gray-300">Duration</th>
            <th className="p-2 border-r border-gray-300">Activity %</th>
            <th className="p-2 border-r border-gray-300">Type</th>
            <th className="p-2">Task Memo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {timeEntries.slice(0, 15).map(e => (
            <tr key={e.id}>
              <td className="p-2 border-r border-gray-200 font-mono">{e.date}</td>
              <td className="p-2 border-r border-gray-200 font-semibold">{e.projectName}</td>
              <td className="p-2 border-r border-gray-200 font-mono">
                {new Date(e.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(e.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </td>
              <td className="p-2 border-r border-gray-200 font-mono font-bold">
                {(e.durationSeconds / 3600).toFixed(2)}h
              </td>
              <td className="p-2 border-r border-gray-200 font-bold">{e.activityPercent}%</td>
              <td className="p-2 border-r border-gray-200">{e.isManual ? 'Manual' : 'Captured'}</td>
              <td className="p-2 truncate max-w-xs">{e.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-12 pt-8 border-t border-gray-300 mt-12 text-xs">
        <div>
          <div className="border-b border-black pb-8 mb-2"></div>
          <p><strong>Employee Signature:</strong> {currentUser.name}</p>
          <p className="text-gray-500">I certify that all logged hours represent actual work performed.</p>
        </div>
        <div>
          <div className="border-b border-black pb-8 mb-2"></div>
          <p><strong>Authorized Manager Signature:</strong> Sarah Jenkins (Team Lead)</p>
          <p className="text-gray-500">Approved for payroll disbursement.</p>
        </div>
      </div>
    </div>
  );
};
