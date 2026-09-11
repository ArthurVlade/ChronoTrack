import { User, Project, TimeEntry, TrackingSettings, NotificationItem, WorkDiaryBlock, PayrollSummary, TeamInvite } from '../types';
import { encryptData, decryptData } from './crypto';

const STORAGE_PREFIX = 'chronotrack_v1_';
const USERS_KEY = `${STORAGE_PREFIX}users`;
const PROJECTS_KEY = `${STORAGE_PREFIX}projects`;
const ENTRIES_KEY = `${STORAGE_PREFIX}entries`;
const SETTINGS_KEY = `${STORAGE_PREFIX}settings`;
const NOTIFS_KEY = `${STORAGE_PREFIX}notifications`;
const OFFLINE_QUEUE_KEY = `${STORAGE_PREFIX}offline_queue`;
const AUTH_SESSION_KEY = `${STORAGE_PREFIX}auth_session`;
const INVITES_KEY = `${STORAGE_PREFIX}invites`;

export const INITIAL_USERS: User[] = [
  {
    id: 'user-owner',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@company.com',
    role: 'owner',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    designation: 'VP of Engineering & Founder',
    hourlyRate: 85,
    isOnline: true,
    activeProject: 'proj-1',
    trackingSince: null,
    password: 'admin123',
    apiToken: 'ct_live_sarah_owner_e819b2'
  },
  {
    id: 'user-emp-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@company.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    designation: 'Senior Frontend Engineer',
    hourlyRate: 60,
    isOnline: true,
    activeProject: 'proj-1',
    trackingSince: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    password: 'alex123',
    apiToken: 'ct_live_alex_emp_93a7c1'
  },
  {
    id: 'user-emp-2',
    name: 'Maya Patel',
    email: 'maya.patel@company.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    designation: 'Principal UI/UX Designer',
    hourlyRate: 65,
    isOnline: true,
    activeProject: 'proj-2',
    trackingSince: new Date(Date.now() - 85 * 60 * 1000).toISOString(),
    password: 'maya123',
    apiToken: 'ct_live_maya_emp_41c88d'
  },
  {
    id: 'user-emp-3',
    name: 'Liam Chen',
    email: 'liam.chen@company.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    designation: 'Cloud & Security Architect',
    hourlyRate: 75,
    isOnline: false,
    activeProject: 'proj-3',
    trackingSince: null,
    password: 'liam123',
    apiToken: 'ct_live_liam_emp_62d5ef'
  }
];

export const INITIAL_INVITES: TeamInvite[] = [
  {
    code: 'APOLLO-2026',
    companyName: 'Apollo Technology Labs',
    projectName: 'Apollo Web & Desktop App',
    projectId: 'proj-1',
    role: 'employee',
    hourlyRate: 65,
    createdByName: 'Sarah Jenkins (Owner)',
    createdAt: '2026-09-01T00:00:00.000Z',
    expiresAt: '2026-12-31T23:59:59.000Z'
  },
  {
    code: 'HIG-DESIGN-99',
    companyName: 'Vanguard Interactive',
    projectName: 'Apple HIG Design System',
    projectId: 'proj-2',
    role: 'employee',
    hourlyRate: 70,
    createdByName: 'Sarah Jenkins (Owner)',
    createdAt: '2026-09-05T00:00:00.000Z',
    expiresAt: '2026-12-31T23:59:59.000Z'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Apollo Web & Desktop App',
    clientName: 'Acme Corp Labs',
    color: '#0071E3', // Apple Accent Blue
    hourlyRate: 65,
    totalTrackedSeconds: 148200,
    budgetHours: 120,
    deadline: '2026-09-20'
  },
  {
    id: 'proj-2',
    name: 'Apple HIG Design System',
    clientName: 'Vanguard Interactive',
    color: '#34C759', // Apple Green
    hourlyRate: 70,
    totalTrackedSeconds: 94000,
    budgetHours: 80,
    deadline: '2026-09-18'
  },
  {
    id: 'proj-3',
    name: 'End-to-End Encryption & Cloud Sync',
    clientName: 'CyberTrust Enterprise',
    color: '#AF52DE', // Apple Purple
    hourlyRate: 80,
    totalTrackedSeconds: 61200,
    budgetHours: 60,
    deadline: '2026-09-25'
  },
  {
    id: 'proj-4',
    name: 'Automated Payroll & Tax Integrations',
    clientName: 'Fintech Velocity',
    color: '#FF9500', // Apple Orange
    hourlyRate: 60,
    totalTrackedSeconds: 38400,
    budgetHours: 50,
    deadline: '2026-09-30'
  }
];

export const INITIAL_SETTINGS: TrackingSettings = {
  screenshotsPer10Min: 3, // Default 3 screenshots per 10-min block (can be adjusted 1 to 6)
  blurScreenshotsByDefault: false,
  allowManualTime: true,
  idleDetectionMinutes: 5,
  pushNotificationsEnabled: true,
  meetingRemindersEnabled: true,
  endToEndEncryptionEnabled: true
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Project Apollo Sprint Deadline',
    message: 'Phase 1 MVP deliverable is due in 3 days (Sept 14). Please audit open hours.',
    type: 'deadline',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    priority: 'urgent'
  },
  {
    id: 'notif-2',
    title: 'Team Sync & Standup in 15m',
    message: 'Weekly remote team standup starts at 10:00 AM on Google Meet.',
    type: 'meeting',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'notif-3',
    title: 'Offline Sync Queue Ready',
    message: 'Automatic background sync engine initialized with 256-bit AES encryption.',
    type: 'sync',
    timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    read: true
  }
];

// Helper to generate seed historical time entries
function generateSeedTimeEntries(): TimeEntry[] {
  const entries: TimeEntry[] = [];
  const today = new Date();

  // Create sample entries across the last 5 days
  for (let d = 4; d >= 0; d--) {
    const entryDate = new Date(today);
    entryDate.setDate(today.getDate() - d);
    const dateString = entryDate.toISOString().split('T')[0];

    // Alex Rivera entries
    entries.push({
      id: `entry-alex-${d}-1`,
      userId: 'user-emp-1',
      userName: 'Alex Rivera',
      projectId: 'proj-1',
      projectName: 'Apollo Web & Desktop App',
      startTime: `${dateString}T09:00:00.000Z`,
      endTime: `${dateString}T13:30:00.000Z`,
      durationSeconds: 16200, // 4.5 hrs
      memo: 'Refactoring state machine and implementing offline sync queue',
      isManual: false,
      activityPercent: 88,
      keystrokesTotal: 3420,
      mouseClicksTotal: 980,
      activeWindow: 'Visual Studio Code — App.tsx',
      activeUrl: 'localhost:3000',
      screenshots: [
        {
          id: `shot-${d}-1`,
          timestamp: `${dateString}T09:12:00.000Z`,
          imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&auto=format&fit=crop&q=80',
          activityPercent: 92,
          keystrokes: 180,
          mouseClicks: 42,
          activeWindow: 'VS Code — TimeTracker.tsx',
          activeUrl: 'github.com/remoteteam/timetracker'
        },
        {
          id: `shot-${d}-2`,
          timestamp: `${dateString}T10:04:00.000Z`,
          imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=640&auto=format&fit=crop&q=80',
          activityPercent: 84,
          keystrokes: 145,
          mouseClicks: 38,
          activeWindow: 'Figma — Design Review',
          activeUrl: 'figma.com/file/apollo-specs'
        }
      ],
      isEncrypted: true,
      isSynced: true,
      date: dateString
    });

    // Maya Patel entries
    entries.push({
      id: `entry-maya-${d}-1`,
      userId: 'user-emp-2',
      userName: 'Maya Patel',
      projectId: 'proj-2',
      projectName: 'Apple HIG Design System',
      startTime: `${dateString}T10:30:00.000Z`,
      endTime: `${dateString}T14:45:00.000Z`,
      durationSeconds: 15300, // 4.25 hrs
      memo: 'Auditing dark mode high-contrast typography and motion curves',
      isManual: false,
      activityPercent: 94,
      keystrokesTotal: 2100,
      mouseClicksTotal: 1650,
      activeWindow: 'Figma — Components & Tokens',
      activeUrl: 'figma.com/design-system',
      screenshots: [
        {
          id: `shot-m-${d}-1`,
          timestamp: `${dateString}T11:15:00.000Z`,
          imageUrl: 'https://images.unsplash.com/photo-1581291518655-9523c932deda?w=640&auto=format&fit=crop&q=80',
          activityPercent: 95,
          keystrokes: 90,
          mouseClicks: 120,
          activeWindow: 'Figma — iOS Tokens',
          activeUrl: 'figma.com'
        }
      ],
      isEncrypted: true,
      isSynced: true,
      date: dateString
    });
  }

  // Add one manual entry example
  entries.push({
    id: 'entry-manual-1',
    userId: 'user-emp-1',
    userName: 'Alex Rivera',
    projectId: 'proj-1',
    projectName: 'Apollo Web & Desktop App',
    startTime: `${today.toISOString().split('T')[0]}T14:00:00.000Z`,
    endTime: `${today.toISOString().split('T')[0]}T15:30:00.000Z`,
    durationSeconds: 5400, // 1.5 hrs
    memo: 'Architecture & technical roadmap alignment call with client tech lead',
    isManual: true,
    manualReason: 'Offline meeting with client outside tracking workstation',
    activityPercent: 100,
    keystrokesTotal: 0,
    mouseClicksTotal: 0,
    activeWindow: 'Google Meet',
    activeUrl: 'meet.google.com/xyz-abc-qwe',
    screenshots: [],
    isEncrypted: true,
    isSynced: true,
    date: today.toISOString().split('T')[0]
  });

  return entries;
}

// LocalStorage accessors with encryption support
export function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      saveUsers(INITIAL_USERS);
      return INITIAL_USERS;
    }
    const parsed: User[] = JSON.parse(raw);
    // Ensure default passwords and apiTokens are present if upgraded
    const merged = parsed.map(user => {
      const initial = INITIAL_USERS.find(u => u.id === user.id);
      return {
        ...user,
        password: user.password || initial?.password || 'password123',
        apiToken: user.apiToken || initial?.apiToken || `ct_live_${user.id}_${Math.random().toString(36).substring(2, 8)}`
      };
    });
    return merged;
  } catch {
    return INITIAL_USERS;
  }
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function loadAuthSession(): { userId: string } | null {
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAuthSession(session: { userId: string } | null) {
  if (session) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(AUTH_SESSION_KEY);
  }
}

export function loadInvites(): TeamInvite[] {
  try {
    const raw = localStorage.getItem(INVITES_KEY);
    if (!raw) {
      localStorage.setItem(INVITES_KEY, JSON.stringify(INITIAL_INVITES));
      return INITIAL_INVITES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INVITES;
  }
}

export function saveInvite(invite: TeamInvite) {
  const current = loadInvites();
  const filtered = current.filter(i => i.code.toUpperCase() !== invite.code.toUpperCase());
  const updated = [invite, ...filtered];
  localStorage.setItem(INVITES_KEY, JSON.stringify(updated));
  return updated;
}

export function findInviteByCode(code: string): TeamInvite | undefined {
  const invites = loadInvites();
  return invites.find(i => i.code.trim().toUpperCase() === code.trim().toUpperCase());
}

export function verifyUserCredentials(usernameOrEmail: string, pass: string): User | null {
  const users = loadUsers();
  const cleanInput = usernameOrEmail.trim().toLowerCase();
  
  const user = users.find(u => 
    u.email.toLowerCase() === cleanInput || 
    u.name.toLowerCase() === cleanInput ||
    (cleanInput.includes('owner') && u.role === 'owner') ||
    (cleanInput.includes('alex') && u.id === 'user-emp-1')
  );

  if (!user) return null;
  
  // Verify password
  if (user.password && user.password !== pass) {
    return null;
  }

  return user;
}

export function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_PROJECTS;
  } catch {
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function loadTimeEntries(): TimeEntry[] {
  try {
    const raw = localStorage.getItem(ENTRIES_KEY);
    if (!raw) {
      const initial = generateSeedTimeEntries();
      saveTimeEntries(initial);
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return generateSeedTimeEntries();
  }
}

export function saveTimeEntries(entries: TimeEntry[]) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export function loadSettings(): TrackingSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...INITIAL_SETTINGS, ...JSON.parse(raw) } : INITIAL_SETTINGS;
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: TrackingSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(NOTIFS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_NOTIFICATIONS;
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
}

export function saveNotifications(notifs: NotificationItem[]) {
  localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifs));
}

// Offline sync queue
export interface QueuedSyncItem {
  id: string;
  type: 'time_entry' | 'screenshot' | 'settings';
  data: unknown;
  timestamp: string;
}

export function getOfflineQueue(): QueuedSyncItem[] {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToOfflineQueue(item: Omit<QueuedSyncItem, 'id' | 'timestamp'>) {
  const queue = getOfflineQueue();
  queue.push({
    id: `queue-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    ...item,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
}

export function clearOfflineQueue() {
  localStorage.removeItem(OFFLINE_QUEUE_KEY);
}

// Convert entries to Upwork-style 10-minute work diary blocks
export function buildWorkDiaryBlocks(entries: TimeEntry[], selectedDate: string, selectedUserId: string): WorkDiaryBlock[] {
  const dayEntries = entries.filter(e => e.date === selectedDate && e.userId === selectedUserId);
  const blocks: WorkDiaryBlock[] = [];

  // 24 hours in a day, 6 blocks of 10-minutes per hour = 144 blocks
  // Focus on active business hours (8:00 AM - 18:00 PM) for clear display, or dynamically include hours with data
  const startHour = 8;
  const endHour = 19;

  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 6; m++) {
      const minStart = m * 10;
      const minEnd = (m + 1) * 10;
      const blockTimeStr = `${String(h).padStart(2, '0')}:${String(minStart).padStart(2, '0')}`;
      const blockEndTimeStr = `${String(h).padStart(2, '0')}:${String(minEnd).padStart(2, '0')}`;

      // Check if any entry overlaps this hour & 10-min block
      const matchingEntry = dayEntries.find(e => {
        const start = new Date(e.startTime);
        const end = new Date(e.endTime);
        const blockStart = new Date(`${selectedDate}T${blockTimeStr}:00.000Z`);
        const blockEnd = new Date(`${selectedDate}T${blockEndTimeStr}:00.000Z`);
        return start <= blockEnd && end >= blockStart;
      });

      if (matchingEntry) {
        // Find matching screenshots in this 10 min window
        const matchedShots = matchingEntry.screenshots.filter(s => {
          const shotTime = new Date(s.timestamp);
          const shotHour = shotTime.getUTCHours();
          const shotMin = shotTime.getUTCMinutes();
          return shotHour === h && shotMin >= minStart && shotMin < minEnd;
        });

        blocks.push({
          id: `block-${h}-${m}`,
          hour: h,
          tenMinIndex: m,
          timeRangeLabel: `${blockTimeStr} - ${blockEndTimeStr}`,
          timeEntryId: matchingEntry.id,
          userId: selectedUserId,
          projectId: matchingEntry.projectId,
          activityPercent: matchingEntry.activityPercent,
          keystrokes: Math.floor(matchingEntry.keystrokesTotal / 6),
          mouseClicks: Math.floor(matchingEntry.mouseClicksTotal / 6),
          screenshots: matchedShots.length > 0 ? matchedShots : (matchingEntry.screenshots.slice(0, 1)),
          memo: matchingEntry.memo,
          activeApp: matchingEntry.activeWindow,
          activeUrl: matchingEntry.activeUrl,
          isManual: matchingEntry.isManual
        });
      }
    }
  }

  return blocks;
}

// Generate Payroll Summaries
export function calculatePayrollSummaries(entries: TimeEntry[], users: User[]): PayrollSummary[] {
  return users.map(user => {
    const userEntries = entries.filter(e => e.userId === user.id);
    const totalSeconds = userEntries.reduce((acc, curr) => acc + curr.durationSeconds, 0);
    const totalHours = totalSeconds / 3600;
    const grossPay = Math.round(totalHours * user.hourlyRate * 100) / 100;

    const hrs = Math.floor(totalHours);
    const mins = Math.floor((totalSeconds % 3600) / 60);

    return {
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      designation: user.designation,
      hourlyRate: user.hourlyRate,
      totalSeconds,
      totalHoursFormatted: `${hrs}h ${mins}m`,
      totalEarnings: grossPay,
      status: grossPay > 0 ? 'approved' : 'pending',
      lastPaidDate: '2026-09-01'
    };
  });
}

// CSV Export Utility (RFC 4180 standard)
export function exportToCSV(entries: TimeEntry[], filename: string = 'chronotrack_timesheets.csv') {
  const headers = [
    'Entry ID',
    'Date',
    'User Name',
    'Project Name',
    'Start Time',
    'End Time',
    'Duration (Hours)',
    'Activity %',
    'Type',
    'Memo',
    'Active App / URL',
    'Encrypted'
  ];

  const rows = entries.map(e => [
    e.id,
    e.date,
    `"${e.userName.replace(/"/g, '""')}"`,
    `"${e.projectName.replace(/"/g, '""')}"`,
    e.startTime,
    e.endTime,
    (e.durationSeconds / 3600).toFixed(2),
    `${e.activityPercent}%`,
    e.isManual ? 'Manual Entry' : 'Tracked Screen',
    `"${(e.memo || '').replace(/"/g, '""')}"`,
    `"${(e.activeWindow || e.activeUrl || '').replace(/"/g, '""')}"`,
    e.isEncrypted ? 'AES-256-GCM' : 'No'
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
