export type UserRole = 'owner' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  designation: string;
  hourlyRate: number; // in USD
  isOnline: boolean;
  activeProject?: string;
  trackingSince?: string | null; // ISO timestamp if currently tracking
  password?: string; // Stored password for authentication
  apiToken?: string; // API token for desktop .exe tracker connection
}

export interface TeamInvite {
  code: string; // e.g. "APOLLO-2026"
  companyName: string;
  projectName: string;
  projectId: string;
  role: UserRole;
  hourlyRate: number;
  createdByName: string;
  createdAt: string;
  expiresAt: string;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  color: string;
  hourlyRate: number;
  totalTrackedSeconds: number;
  budgetHours?: number;
  deadline?: string;
  description?: string;
  status?: 'active' | 'completed' | 'archived';
}

export interface Screenshot {
  id: string;
  timestamp: string;
  imageUrl: string;
  activityPercent: number;
  keystrokes: number;
  mouseClicks: number;
  activeWindow: string;
  activeUrl: string;
  isBlurred?: boolean;
}

export interface TimeEntry {
  id: string;
  userId: string;
  userName: string;
  projectId: string;
  projectName: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  durationSeconds: number;
  memo: string;
  isManual: boolean;
  manualReason?: string;
  activityPercent: number; // 0 - 100
  keystrokesTotal: number;
  mouseClicksTotal: number;
  activeWindow: string;
  activeUrl: string;
  screenshots: Screenshot[];
  isEncrypted: boolean;
  isSynced: boolean;
  date: string; // YYYY-MM-DD
}

export interface WorkDiaryBlock {
  id: string;
  hour: number; // 0 - 23
  tenMinIndex: number; // 0 - 5 (e.g. 0 = 00-10m, 1 = 10-20m, etc.)
  timeRangeLabel: string; // e.g. "10:00 - 10:10"
  timeEntryId?: string;
  userId: string;
  projectId: string;
  activityPercent: number; // 0 - 100
  keystrokes: number;
  mouseClicks: number;
  screenshots: Screenshot[];
  memo: string;
  activeApp: string;
  activeUrl: string;
  isManual: boolean;
}

export interface PayrollSummary {
  userId: string;
  userName: string;
  userAvatar: string;
  designation: string;
  hourlyRate: number;
  totalSeconds: number;
  totalHoursFormatted: string;
  totalEarnings: number;
  status: 'pending' | 'approved' | 'paid';
  lastPaidDate?: string;
}

export interface TrackingSettings {
  screenshotsPer10Min: number; // 1 to 6
  blurScreenshotsByDefault: boolean;
  allowManualTime: boolean;
  idleDetectionMinutes: number;
  pushNotificationsEnabled: boolean;
  meetingRemindersEnabled: boolean;
  endToEndEncryptionEnabled: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'deadline' | 'meeting' | 'sync' | 'idle' | 'payroll' | 'security';
  timestamp: string;
  read: boolean;
  priority?: 'normal' | 'urgent';
}

export type NetworkStatus = 'online' | 'offline' | 'syncing';

export type ScreenCaptureMode = 'live_screen' | 'simulated';

export type AppView = 'tracker' | 'dashboard' | 'reports' | 'payroll' | 'projects' | 'settings' | 'docs';

export interface EmployeeInvite {
  email: string;
  name: string;
  role: 'employee' | 'owner';
  hourlyRate: number;
  projectId: string;
  inviteLink: string;
  createdAt: string;
}
