import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  User,
  Project,
  TimeEntry,
  TrackingSettings,
  NotificationItem,
  NetworkStatus,
  Screenshot,
  ScreenCaptureMode,
  AppView
} from '../types';
import {
  loadUsers,
  saveUsers,
  loadProjects,
  saveProjects,
  loadTimeEntries,
  saveTimeEntries,
  loadSettings,
  saveSettings,
  loadNotifications,
  saveNotifications,
  getOfflineQueue,
  addToOfflineQueue,
  clearOfflineQueue
} from '../services/storage';
import {
  captureScreenOrSimulate,
  requestEntireScreenStream,
  downloadDesktopAgentPackage
} from '../services/screenCapture';
import { encryptData } from '../services/crypto';

interface AppContextType {
  currentUser: User;
  users: User[];
  projects: Project[];
  timeEntries: TimeEntry[];
  settings: TrackingSettings;
  notifications: NotificationItem[];
  networkStatus: NetworkStatus;
  isDarkMode: boolean;
  offlineQueueCount: number;
  
  // Tracking State
  isTracking: boolean;
  activeProjectId: string;
  trackingMemo: string;
  elapsedSeconds: number;
  currentActivityScore: number;
  keystrokesCount: number;
  mouseClicksCount: number;
  currentBlockScreenshots: Screenshot[];
  screenCaptureMode: ScreenCaptureMode;
  realScreenStream: MediaStream | null;
  
  // Actions
  toggleDarkMode: () => void;
  setNetworkStatus: (status: NetworkStatus) => void;
  switchUser: (userId: string) => void;
  setActiveProjectId: (id: string) => void;
  setTrackingMemo: (memo: string) => void;
  startTracking: () => void;
  stopTracking: () => Promise<void>;
  takeManualScreenshotNow: () => Promise<void>;
  enableLiveScreenCapture: () => Promise<boolean>;
  disableLiveScreenCapture: () => void;
  setScreenCaptureMode: (mode: ScreenCaptureMode) => void;
  downloadDesktopAgent: (platform?: 'win' | 'mac' | 'linux') => void;
  inviteEmployee: (data: {
    name: string;
    email: string;
    role: 'employee' | 'owner';
    hourlyRate: number;
    projectId: string;
  }) => Promise<User>;
  addManualTimeEntry: (params: {
    projectId: string;
    date: string;
    startTime: string;
    endTime: string;
    memo: string;
    reason: string;
  }) => Promise<void>;
  updateSettings: (newSettings: Partial<TrackingSettings>) => void;
  syncOfflineData: () => Promise<void>;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  
  // Modal states
  isManualModalOpen: boolean;
  setIsManualModalOpen: (open: boolean) => void;
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isInviteModalOpen: boolean;
  setIsInviteModalOpen: (open: boolean) => void;
  isDesktopModalOpen: boolean;
  setIsDesktopModalOpen: (open: boolean) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(loadUsers);
  // Default to Alex Rivera (employee tracker) or Sarah Jenkins (owner)
  const [currentUser, setCurrentUser] = useState<User>(() => users.find(u => u.role === 'employee') || users[0]);
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(loadTimeEntries);
  const [settings, setSettings] = useState<TrackingSettings>(loadSettings);
  const [notifications, setNotifications] = useState<NotificationItem[]>(loadNotifications);
  const [networkStatus, setNetworkStatusState] = useState<NetworkStatus>('online');
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(() => getOfflineQueue().length);
  
  // Active Tracking
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [activeProjectId, setActiveProjectId] = useState<string>(() => projects[0]?.id || 'proj-1');
  const [trackingMemo, setTrackingMemo] = useState<string>('Refactoring core features & Apple design UI');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [currentActivityScore, setCurrentActivityScore] = useState<number>(85);
  const [keystrokesCount, setKeystrokesCount] = useState<number>(0);
  const [mouseClicksCount, setMouseClicksCount] = useState<number>(0);
  const [currentBlockScreenshots, setCurrentBlockScreenshots] = useState<Screenshot[]>([]);
  const [screenCaptureMode, setScreenCaptureMode] = useState<ScreenCaptureMode>('simulated');
  const [realScreenStream, setRealScreenStream] = useState<MediaStream | null>(null);
  const trackingStartTimeRef = useRef<number | null>(null);

  // Modals & Navigation
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<AppView>(
    currentUser.role === 'owner' ? 'dashboard' : 'tracker'
  );

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('chronotrack_theme') === 'dark' ||
      (!('chronotrack_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('chronotrack_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('chronotrack_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  // Sync offline queue count
  const refreshOfflineCount = useCallback(() => {
    setOfflineQueueCount(getOfflineQueue().length);
  }, []);

  // Listen to physical user activity (keystrokes and mouse movement) when tracker is active
  useEffect(() => {
    if (!isTracking) return;

    let localKeystrokes = 0;
    let localMouseClicks = 0;

    const handleKeyDown = () => {
      setKeystrokesCount(k => k + 1);
      localKeystrokes++;
    };

    const handleMouseDown = () => {
      setMouseClicksCount(c => c + 1);
      localMouseClicks++;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    // Activity calculator loop (every 5 seconds, recalculate activity score between 60% and 100%)
    const activityInterval = setInterval(() => {
      const activityBasis = Math.min(100, Math.max(45, (localKeystrokes * 4 + localMouseClicks * 6) + Math.floor(Math.random() * 20) + 40));
      setCurrentActivityScore(activityBasis);
      localKeystrokes = Math.floor(localKeystrokes * 0.5);
      localMouseClicks = Math.floor(localMouseClicks * 0.5);
    }, 5000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
      clearInterval(activityInterval);
    };
  }, [isTracking]);

  // Main Tracking Timer Interval
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTracking) {
      timer = setInterval(() => {
        setElapsedSeconds(sec => sec + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTracking]);

  // Automated Screenshot Scheduler based on settings.screenshotsPer10Min
  useEffect(() => {
    if (!isTracking) return;

    // screenshotsPer10Min: 1 to 6
    // 10 minutes = 600 seconds. Interval = 600 / screenshotsPer10Min
    // For demo/prototype agility, we take periodic screenshots every (600 / settings.screenshotsPer10Min) seconds,
    // clamped to at least 45 seconds so it doesn't flood, but still runs automatically.
    const intervalSec = Math.max(45, Math.floor(600 / Math.max(1, settings.screenshotsPer10Min)));

    const screenshotTimer = setInterval(async () => {
      try {
        const capture = await captureScreenOrSimulate(trackingMemo, realScreenStream);
        const newShot: Screenshot = {
          id: `shot-${Date.now()}`,
          timestamp: new Date().toISOString(),
          imageUrl: capture.imageUrl,
          activityPercent: capture.activityPercent,
          keystrokes: capture.keystrokes,
          mouseClicks: capture.mouseClicks,
          activeWindow: capture.activeWindow,
          activeUrl: capture.activeUrl,
          isBlurred: settings.blurScreenshotsByDefault
        };

        setCurrentBlockScreenshots(prev => [newShot, ...prev.slice(0, 11)]);

        // Push notification on screenshot capture
        if (settings.pushNotificationsEnabled) {
          addNotificationInternal({
            title: 'Screenshot Captured',
            message: `10-min block audit: ${capture.activeWindow} (${capture.activityPercent}% active)`,
            type: 'sync',
            priority: 'normal'
          });
        }
      } catch (err) {
        console.error('Screenshot capture loop failed', err);
      }
    }, intervalSec * 1000);

    return () => clearInterval(screenshotTimer);
  }, [isTracking, settings.screenshotsPer10Min, settings.blurScreenshotsByDefault, settings.pushNotificationsEnabled, trackingMemo, realScreenStream]);

  const addNotificationInternal = useCallback((item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      saveNotifications(updated);
      return updated;
    });
  }, []);

  const addNotification = useCallback((item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    addNotificationInternal(item);
  }, [addNotificationInternal]);

  // Enable Live Screen Capture (Entire Screen)
  const enableLiveScreenCapture = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await requestEntireScreenStream();
      setRealScreenStream(stream);
      setScreenCaptureMode('live_screen');

      // Listen for user terminating stream externally via browser UI
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          setRealScreenStream(null);
          setScreenCaptureMode('simulated');
          addNotificationInternal({
            title: 'Live Screen Share Ended',
            message: 'Browser screen sharing track ended. Reverted to simulated testing mode.',
            type: 'sync'
          });
        };
      }

      addNotificationInternal({
        title: 'Entire Screen Audit Active',
        message: 'Live desktop display stream successfully connected for automated screenshots.',
        type: 'sync',
        priority: 'urgent'
      });
      return true;
    } catch (err) {
      console.warn('Unable to acquire screen stream:', err);
      addNotificationInternal({
        title: 'Screen Permission Notice',
        message: 'Screen capture permission was not granted or blocked by iframe sandbox. You can download the desktop .exe agent for background audits.',
        type: 'sync'
      });
      return false;
    }
  }, [addNotificationInternal]);

  // Disable Live Screen Capture
  const disableLiveScreenCapture = useCallback(() => {
    if (realScreenStream) {
      realScreenStream.getTracks().forEach(t => t.stop());
      setRealScreenStream(null);
    }
    setScreenCaptureMode('simulated');
  }, [realScreenStream]);

  // Download Desktop Agent Companion
  const downloadDesktopAgent = useCallback((platform: 'win' | 'mac' | 'linux' = 'win') => {
    downloadDesktopAgentPackage(platform);
    addNotificationInternal({
      title: 'Desktop Agent Downloaded',
      message: `ChronoTrack companion installer package downloaded for ${platform.toUpperCase()}. Run to enable silent background full-screen auditing.`,
      type: 'sync'
    });
  }, [addNotificationInternal]);

  // Invite remote employee
  const inviteEmployee = useCallback(async (data: {
    name: string;
    email: string;
    role: 'employee' | 'owner';
    hourlyRate: number;
    projectId: string;
  }): Promise<User> => {
    const newId = `user-${Date.now()}`;
    const newUser: User = {
      id: newId,
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      designation: data.role === 'owner' ? 'Project Manager' : 'Remote Team Member',
      hourlyRate: data.hourlyRate,
      isOnline: false,
      activeProject: data.projectId,
      trackingSince: null
    };

    setUsers(prev => {
      const updated = [...prev, newUser];
      saveUsers(updated);
      return updated;
    });

    addNotificationInternal({
      title: 'Team Member Invited',
      message: `${data.name} (${data.email}) added to workspace at $${data.hourlyRate}/hr.`,
      type: 'security',
      priority: 'urgent'
    });

    return newUser;
  }, [addNotificationInternal]);

  // Start Tracking
  const startTracking = useCallback(async () => {
    setIsTracking(true);
    trackingStartTimeRef.current = Date.now();
    setElapsedSeconds(0);
    setKeystrokesCount(0);
    setMouseClicksCount(0);

    // Take initial screenshot on tracker start
    try {
      const capture = await captureScreenOrSimulate(trackingMemo, realScreenStream);
      const initialShot: Screenshot = {
        id: `shot-init-${Date.now()}`,
        timestamp: new Date().toISOString(),
        imageUrl: capture.imageUrl,
        activityPercent: capture.activityPercent,
        keystrokes: 45,
        mouseClicks: 12,
        activeWindow: capture.activeWindow,
        activeUrl: capture.activeUrl,
        isBlurred: settings.blurScreenshotsByDefault
      };
      setCurrentBlockScreenshots([initialShot]);
    } catch {
      // Ignored
    }

    // Update user state to active
    setUsers(prev => {
      const updated = prev.map(u => u.id === currentUser.id ? { ...u, isOnline: true, activeProject: activeProjectId, trackingSince: new Date().toISOString() } : u);
      saveUsers(updated);
      return updated;
    });

    addNotificationInternal({
      title: 'Time Tracker Started',
      message: `Tracking session initiated for ${projects.find(p => p.id === activeProjectId)?.name || 'Active Task'}`,
      type: 'sync',
      priority: 'normal'
    });
  }, [currentUser.id, activeProjectId, trackingMemo, settings.blurScreenshotsByDefault, projects, addNotificationInternal]);

  // Stop Tracking & Save Entry
  const stopTracking = useCallback(async () => {
    if (!isTracking) return;
    setIsTracking(false);

    const startTime = trackingStartTimeRef.current ? new Date(trackingStartTimeRef.current).toISOString() : new Date(Date.now() - elapsedSeconds * 1000).toISOString();
    const endTime = new Date().toISOString();
    const project = projects.find(p => p.id === activeProjectId);

    // Encrypt the memo and active window data with AES-256 GCM
    const encryptedMeta = await encryptData({
      memo: trackingMemo,
      keystrokes: keystrokesCount,
      clicks: mouseClicksCount,
      screenshotsCount: currentBlockScreenshots.length
    });

    const newEntry: TimeEntry = {
      id: `entry-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      projectId: activeProjectId,
      projectName: project ? project.name : 'General Project',
      startTime,
      endTime,
      durationSeconds: Math.max(15, elapsedSeconds),
      memo: trackingMemo || 'Working on assigned deliverables',
      isManual: false,
      activityPercent: currentActivityScore,
      keystrokesTotal: Math.max(keystrokesCount, 120),
      mouseClicksTotal: Math.max(mouseClicksCount, 35),
      activeWindow: currentBlockScreenshots[0]?.activeWindow || 'Development Environment',
      activeUrl: currentBlockScreenshots[0]?.activeUrl || 'localhost:3000',
      screenshots: [...currentBlockScreenshots],
      isEncrypted: settings.endToEndEncryptionEnabled,
      isSynced: networkStatus === 'online',
      date: new Date().toISOString().split('T')[0]
    };

    // If offline, queue it!
    if (networkStatus === 'offline') {
      addToOfflineQueue({
        type: 'time_entry',
        data: newEntry
      });
      refreshOfflineCount();
      addNotificationInternal({
        title: 'Saved in Offline Queue',
        message: 'Network offline. Your encrypted time block is safely stored and will auto-sync upon reconnection.',
        type: 'sync',
        priority: 'urgent'
      });
    }

    setTimeEntries(prev => {
      const updated = [newEntry, ...prev];
      saveTimeEntries(updated);
      return updated;
    });

    // Update project total time
    setProjects(prev => {
      const updated = prev.map(p => p.id === activeProjectId ? { ...p, totalTrackedSeconds: p.totalTrackedSeconds + newEntry.durationSeconds } : p);
      saveProjects(updated);
      return updated;
    });

    // Update user status
    setUsers(prev => {
      const updated = prev.map(u => u.id === currentUser.id ? { ...u, trackingSince: null } : u);
      saveUsers(updated);
      return updated;
    });

    setCurrentBlockScreenshots([]);
    setElapsedSeconds(0);

    addNotificationInternal({
      title: 'Work Session Logged',
      message: `Successfully logged ${(newEntry.durationSeconds / 60).toFixed(1)} mins to ${project?.name || 'Project'}.`,
      type: 'sync'
    });
  }, [isTracking, elapsedSeconds, activeProjectId, projects, trackingMemo, keystrokesCount, mouseClicksCount, currentBlockScreenshots, currentUser, currentActivityScore, settings.endToEndEncryptionEnabled, networkStatus, refreshOfflineCount, addNotificationInternal]);

  // Take an instant screenshot now
  const takeManualScreenshotNow = useCallback(async () => {
    try {
      const capture = await captureScreenOrSimulate(trackingMemo, realScreenStream);
      const newShot: Screenshot = {
        id: `shot-instant-${Date.now()}`,
        timestamp: new Date().toISOString(),
        imageUrl: capture.imageUrl,
        activityPercent: capture.activityPercent,
        keystrokes: capture.keystrokes,
        mouseClicks: capture.mouseClicks,
        activeWindow: capture.activeWindow,
        activeUrl: capture.activeUrl,
        isBlurred: settings.blurScreenshotsByDefault
      };
      setCurrentBlockScreenshots(prev => [newShot, ...prev]);

      addNotificationInternal({
        title: 'Instant Screenshot Captured',
        message: `Captured ${capture.activeWindow} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        type: 'sync'
      });
    } catch (err) {
      console.error('Instant screenshot error', err);
    }
  }, [trackingMemo, realScreenStream, settings.blurScreenshotsByDefault, addNotificationInternal]);

  // Add Manual Time Entry
  const addManualTimeEntry = useCallback(async (params: {
    projectId: string;
    date: string;
    startTime: string;
    endTime: string;
    memo: string;
    reason: string;
  }) => {
    const startObj = new Date(`${params.date}T${params.startTime}:00`);
    const endObj = new Date(`${params.date}T${params.endTime}:00`);
    let durationSec = Math.floor((endObj.getTime() - startObj.getTime()) / 1000);
    if (durationSec <= 0) durationSec = 3600; // default 1 hr fallback

    const project = projects.find(p => p.id === params.projectId);

    const manualEntry: TimeEntry = {
      id: `manual-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      projectId: params.projectId,
      projectName: project ? project.name : 'Project',
      startTime: startObj.toISOString(),
      endTime: endObj.toISOString(),
      durationSeconds: durationSec,
      memo: params.memo,
      isManual: true,
      manualReason: params.reason,
      activityPercent: 100,
      keystrokesTotal: 0,
      mouseClicksTotal: 0,
      activeWindow: 'Manual Work Session',
      activeUrl: 'offline-activity',
      screenshots: [],
      isEncrypted: settings.endToEndEncryptionEnabled,
      isSynced: networkStatus === 'online',
      date: params.date
    };

    if (networkStatus === 'offline') {
      addToOfflineQueue({
        type: 'time_entry',
        data: manualEntry
      });
      refreshOfflineCount();
    }

    setTimeEntries(prev => {
      const updated = [manualEntry, ...prev];
      saveTimeEntries(updated);
      return updated;
    });

    setProjects(prev => {
      const updated = prev.map(p => p.id === params.projectId ? { ...p, totalTrackedSeconds: p.totalTrackedSeconds + durationSec } : p);
      saveProjects(updated);
      return updated;
    });

    addNotificationInternal({
      title: 'Manual Time Logged',
      message: `Added ${(durationSec / 3600).toFixed(1)} hrs manual entry for ${project?.name || 'Project'}.`,
      type: 'sync'
    });
  }, [currentUser, projects, settings.endToEndEncryptionEnabled, networkStatus, refreshOfflineCount, addNotificationInternal]);

  // Sync Offline Data
  const syncOfflineData = useCallback(async () => {
    setNetworkStatusState('syncing');
    const queue = getOfflineQueue();

    // Simulate network transmission latency (750ms)
    await new Promise(res => setTimeout(res, 750));

    // Clear offline queue
    clearOfflineQueue();
    refreshOfflineCount();
    setNetworkStatusState('online');

    // Mark all pending entries as synced
    setTimeEntries(prev => {
      const updated = prev.map(e => ({ ...e, isSynced: true }));
      saveTimeEntries(updated);
      return updated;
    });

    addNotificationInternal({
      title: 'Cloud Backup & Sync Complete',
      message: `Successfully synchronized ${queue.length || 'pending'} queued items with end-to-end encrypted storage.`,
      type: 'sync'
    });
  }, [refreshOfflineCount, addNotificationInternal]);

  // Set Network Status (allows testing offline mode seamlessly)
  const setNetworkStatus = useCallback((status: NetworkStatus) => {
    setNetworkStatusState(status);
    if (status === 'online') {
      const queue = getOfflineQueue();
      if (queue.length > 0) {
        syncOfflineData();
      }
    } else if (status === 'offline') {
      addNotificationInternal({
        title: 'Offline Mode Activated',
        message: 'Productivity tracker will save all screenshots and logs locally with zero data loss.',
        type: 'sync',
        priority: 'urgent'
      });
    }
  }, [syncOfflineData, addNotificationInternal]);

  // Switch User
  const switchUser = useCallback((userId: string) => {
    const selected = users.find(u => u.id === userId);
    if (selected) {
      if (isTracking) {
        stopTracking();
      }
      setCurrentUser(selected);
      setActiveView(selected.role === 'owner' ? 'dashboard' : 'tracker');
      addNotificationInternal({
        title: `Switched Role to ${selected.role === 'owner' ? 'Owner / Manager' : 'Employee Tracker'}`,
        message: `Active profile: ${selected.name} (${selected.designation})`,
        type: 'security'
      });
    }
  }, [users, isTracking, stopTracking, addNotificationInternal]);

  // Update Settings
  const updateSettings = useCallback((newSettings: Partial<TrackingSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);
      return updated;
    });
    addNotificationInternal({
      title: 'Preferences Updated',
      message: `Updated tracking configuration (${newSettings.screenshotsPer10Min ? `${newSettings.screenshotsPer10Min} shots/10m` : 'settings applied'}).`,
      type: 'system'
    });
  }, [addNotificationInternal]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      saveNotifications(updated);
      return updated;
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    saveNotifications([]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        projects,
        timeEntries,
        settings,
        notifications,
        networkStatus,
        isDarkMode,
        offlineQueueCount,
        isTracking,
        activeProjectId,
        trackingMemo,
        elapsedSeconds,
        currentActivityScore,
        keystrokesCount,
        mouseClicksCount,
        currentBlockScreenshots,
        screenCaptureMode,
        realScreenStream,
        toggleDarkMode,
        setNetworkStatus,
        switchUser,
        setActiveProjectId,
        setTrackingMemo,
        startTracking,
        stopTracking,
        takeManualScreenshotNow,
        enableLiveScreenCapture,
        disableLiveScreenCapture,
        setScreenCaptureMode,
        downloadDesktopAgent,
        inviteEmployee,
        addManualTimeEntry,
        updateSettings,
        syncOfflineData,
        markNotificationAsRead,
        clearAllNotifications,
        addNotification,
        isManualModalOpen,
        setIsManualModalOpen,
        isExportModalOpen,
        setIsExportModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isInviteModalOpen,
        setIsInviteModalOpen,
        isDesktopModalOpen,
        setIsDesktopModalOpen,
        activeView,
        setActiveView
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
