import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import {
  FolderKanban,
  Plus,
  Search,
  Edit2,
  Trash2,
  Clock,
  DollarSign,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  X,
  Archive,
  BarChart3,
  Users,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ProjectManager: React.FC = () => {
  const {
    currentUser,
    projects,
    addProject,
    updateProject,
    deleteProject,
    timeEntries,
    setActiveView
  } = useApp();

  const isOwner = currentUser?.role === 'owner';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'archived'>('all');

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formClientName, setFormClientName] = useState('');
  const [formHourlyRate, setFormHourlyRate] = useState('65');
  const [formBudgetHours, setFormBudgetHours] = useState('');
  const [formStatus, setFormStatus] = useState<'active' | 'completed' | 'archived'>('active');
  const [formDescription, setFormDescription] = useState('');
  const [formColor, setFormColor] = useState('#0071E3');

  const colorOptions = [
    '#0071E3', // Apple Blue
    '#34C759', // Apple Green
    '#AF52DE', // Purple
    '#FF9500', // Orange
    '#FF2D55', // Pink
    '#5856D6', // Indigo
    '#00C7BE', // Teal
    '#8E8E93'  // Slate Gray
  ];

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setFormName('');
    setFormClientName('');
    setFormHourlyRate('65');
    setFormBudgetHours('');
    setFormStatus('active');
    setFormDescription('');
    setFormColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (proj: Project) => {
    setEditingProject(proj);
    setFormName(proj.name);
    setFormClientName(proj.clientName);
    setFormHourlyRate(String(proj.hourlyRate || 65));
    setFormBudgetHours(proj.budgetHours ? String(proj.budgetHours) : '');
    setFormStatus(proj.status || 'active');
    setFormDescription(proj.description || '');
    setFormColor(proj.color || '#0071E3');
    setIsEditModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formClientName.trim()) return;

    if (editingProject) {
      updateProject(editingProject.id, {
        name: formName.trim(),
        clientName: formClientName.trim(),
        hourlyRate: Number(formHourlyRate) || 65,
        budgetHours: formBudgetHours ? Number(formBudgetHours) : undefined,
        status: formStatus,
        description: formDescription.trim(),
        color: formColor
      });
    } else {
      addProject({
        name: formName.trim(),
        clientName: formClientName.trim(),
        hourlyRate: Number(formHourlyRate) || 65,
        budgetHours: formBudgetHours ? Number(formBudgetHours) : undefined,
        status: formStatus,
        description: formDescription.trim(),
        color: formColor
      });
    }

    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!deletingProject) return;
    setDeleteError(null);
    const result = deleteProject(deletingProject.id);
    if (!result.success) {
      setDeleteError(result.message);
    } else {
      setIsDeleteModalOpen(false);
      setDeletingProject(null);
    }
  };

  // If not owner, display security notice
  if (!isOwner) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <div className="apple-card p-8 border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Owner & Manager Access Restricted
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
            Project configuration, cost centers, and client rate controls are restricted to verified workspace owners.
          </p>
          <button
            onClick={() => setActiveView('tracker')}
            className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
          >
            Return to Work Tracker
          </button>
        </div>
      </div>
    );
  }

  // Filter projects
  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const currentStatus = p.status || 'active';
    const matchesStatus = statusFilter === 'all' || currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              Owner Cost Center
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {projects.length} Total Projects Configured
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Projects & Client Accounts
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Add, update, or remove projects, manage client billing rates, budget thresholds, and team assignments.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 apple-card p-3 border border-slate-200 dark:border-slate-700/80">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search projects or clients..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto p-0.5 bg-slate-100 dark:bg-[#111722] rounded-xl border border-slate-200 dark:border-slate-700/80">
          {(['all', 'active', 'completed', 'archived'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                statusFilter === tab
                  ? 'bg-white dark:bg-[#1E2838] text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200 dark:border-slate-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map(proj => {
          const trackedHours = Math.round((proj.totalTrackedSeconds / 3600) * 10) / 10;
          const budget = proj.budgetHours || 0;
          const percentUsed = budget > 0 ? Math.min(100, Math.round((trackedHours / budget) * 100)) : 0;
          const totalEarned = (proj.totalTrackedSeconds / 3600) * (proj.hourlyRate || 65);

          return (
            <div
              key={proj.id}
              className="apple-card p-5 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0"
                      style={{ backgroundColor: proj.color || '#0071E3' }}
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {proj.clientName}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      proj.status === 'completed'
                        ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        : proj.status === 'archived'
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
                        : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    {proj.status || 'active'}
                  </span>
                </div>

                {/* Description if present */}
                {proj.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 bg-slate-50 dark:bg-[#121824] p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                    {proj.description}
                  </p>
                )}

                {/* Metrics */}
                <div className="space-y-2 py-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Contractor Hourly Rate:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ${proj.hourlyRate || 65}.00 / hr
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Total Tracked Hours:</span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-white">
                      {trackedHours} hrs {budget > 0 && <span className="text-slate-400">/ {budget} hrs</span>}
                    </span>
                  </div>

                  {budget > 0 && (
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full transition-all ${
                          percentUsed > 90 ? 'bg-rose-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${percentUsed}%` }}
                      />
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1">
                    <span>Estimated Accrued Spend:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      ${totalEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenEditModal(proj)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#111722] hover:bg-slate-200 dark:hover:bg-[#1D2738] text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Edit Project</span>
                </button>

                <button
                  onClick={() => {
                    setDeletingProject(proj);
                    setDeleteError(null);
                    setIsDeleteModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 border border-transparent hover:border-rose-200 dark:hover:border-rose-900 transition-colors cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT / CREATE PROJECT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="apple-card max-w-lg w-full p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#182030] shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-blue-600" />
                <span>{editingProject ? 'Edit Project Details' : 'Add New Project'}</span>
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Apollo Cloud Platform v2"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#111722] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Client / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={formClientName}
                  onChange={e => setFormClientName(e.target.value)}
                  placeholder="e.g. Acme Corporation"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#111722] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Hourly Billing Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={formHourlyRate}
                    onChange={e => setFormHourlyRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#111722] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Budget Cap (Hours)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Optional (e.g. 150)"
                    value={formBudgetHours}
                    onChange={e => setFormBudgetHours(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#111722] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Status
                </label>
                <select
                  value={formStatus}
                  onChange={e => setFormStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#111722] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                >
                  <option value="active">Active (Tracking Permitted)</option>
                  <option value="completed">Completed (Milestones Delivered)</option>
                  <option value="archived">Archived (Read-Only Records)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Scope & Deliverable Notes
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Key deliverables, sprint objectives, Jira tags..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#111722] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Visual Identification Swatch
                </label>
                <div className="flex items-center gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormColor(color)}
                      className={`w-7 h-7 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                        formColor === color ? 'scale-115 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-[#182030]' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {formColor === color && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && deletingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="apple-card max-w-md w-full p-6 rounded-2xl border border-rose-200 dark:border-rose-900 bg-white dark:bg-[#182030] shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Remove Project "{deletingProject.name}"?
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Are you sure you want to delete this project from the workspace? All active team assignments will automatically transition to an existing fallback project.
            </p>

            {deleteError && (
              <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-300">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingProject(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
