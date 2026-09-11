# ChronoTrack Enterprise

> **Enterprise-Grade Remote Time Tracking & Activity Audit Platform**  
> *Inspired by the Upwork Work Diary with Automated Full-Screen Captures, Activity Telemetry, Manual Time Accounting, Offline Outage Protection, and Native Desktop Companion.*

---

## 📸 System Architecture & Dashboard Panels

### 1. Manager Overview & Live Team Dashboard
```
+-------------------------------------------------------------------------------------------------------------+
|  [⚡ ChronoTrack Enterprise]   [Team Live]  [Work Diary & Audit]  [Payroll]  [Settings]  [Guides & Docs]    |
+-------------------------------------------------------------------------------------------------------------+
|  TOTAL LOGGED: 42.8 hrs   |   ACTIVE NOW: 3 online   |   ACCRUED PAYROLL: $2,845.00   |   ENCRYPTION: AES-256|
+-------------------------------------------------------------------------------------------------------------+
|  LIVE TEAM ACTIVITY:                                                                                        |
|  • Alex Rivera      | Project: Mobile App | Status: 85% Active | [████████░░] | Last Shot: 2 mins ago     |
|  • Elena Rostova    | Project: Web UI     | Status: 92% Active | [█████████░] | Last Shot: 4 mins ago     |
|  • Marcus Chen      | Project: Backend    | Status: 74% Active | [███████░░░] | Last Shot: 7 mins ago     |
+-------------------------------------------------------------------------------------------------------------+
```

### 2. 10-Minute Screenshot Work Diary Matrix (Upwork Standard)
```
+-------------------------------------------------------------------------------------------------------------+
|  Work Diary for Alex Rivera  |  Date: 2026-09-11  |  Total: 6 hrs 40 mins  |  Activity Avg: 84%             |
+-------------------------------------------------------------------------------------------------------------+
|  09:00 AM  [ 📷 88% ] [ 📷 92% ] [ 📷 79% ] [ 📷 85% ] [ 📷 90% ] [ 📷 84% ]  -> 1 hr 00m (6 blocks)       |
|  10:00 AM  [ 📷 95% ] [ 📷 87% ] [ 📷 91% ] [ 📷 73% ] [ 📷 82% ] [ 📷 88% ]  -> 1 hr 00m (6 blocks)       |
|  11:00 AM  [ 📷 64% ] [ 📷 80% ] [ 📷 85% ] [ 📝 MANUAL TIME: Client Call ]  -> 1 hr 00m (Verified)      |
+-------------------------------------------------------------------------------------------------------------+
|  * Each 10-minute block records a random full-screen screenshot, active window title, and keystrokes/clicks.|
|  * Owners can click any block to inspect full resolution or discard non-work intervals from billable totals.|
+-------------------------------------------------------------------------------------------------------------+
```

### 3. Employee Tracking Interface (Web & Native Desktop)
```
+-------------------------------------------------------------------------------------------------------------+
|  PROJECT: Apollo Cloud Platform (Acme Corp)                                       [ + Manual Time ]         |
|  TASK MEMO: Refactoring authentication flows and high-contrast Apple UI tokens                              |
|                                                                                                             |
|  [ ▶ START TRACKING ]   02:45:18 Elapsed   |   Current Rate: $65.00/hr   |   Today's Earned: $178.75         |
|                                                                                                             |
|  ACTIVITY SENSOR:                                      AUTOMATED SCREENSHOT (Interval: 3 shots/10m):        |
|  [████████░░] 85% Active                               +-------------------------------------------------+  |
|  Keystrokes: 428   |   Mouse Clicks: 112               | [Preview: VS Code - authController.ts]          |  |
|                                                        | Mode: ● Entire Screen Live (Full Desktop)       |  |
|                                                        | [ Share Entire Screen ]  [ Download Agent .EXE ]|  |
+-------------------------------------------------------------------------------------------------------------+
```

---

## 🎯 Dual Architecture: Web Dashboard vs Desktop Companion

Modern browsers enforce strict sandbox constraints: when an employee minimizes or switches browser tabs, the browser may throttle background JavaScript execution or stop WebRTC screen streams.

To address this:

| Feature | Web Tracker (Browser) | Native Desktop Agent (`.exe` / `.dmg`) |
|:---|:---|:---|
| **Primary Audience** | Quick onboarding & managers | Full-time remote contractors & staff |
| **Screen Capture Range** | User selects "Entire Screen" in prompt | Automatic full-screen across multi-monitors |
| **Background Auditing** | Subject to browser tab throttling | Runs silently in OS system tray daemon |
| **Input Velocity Hooks** | Window focused events | OS-level velocity sensor (no keylogging) |
| **Offline Buffering** | Encrypted IndexedDB | Local SQLite with AES-256 GCM |
| **Installation** | Zero install (any modern browser) | One-time downloadable installer package |

---

## 🚀 Quick Setup Guide for Workspace Owners

### Step 1: Workspace Organization & Projects
1. Sign in as an **Owner** (e.g. *Sarah Jenkins, Project Manager*).
2. Navigate to **Team Live &gt; Projects**.
3. Create billable projects, set contract budgets, and configure hourly caps to prevent scope creep.

### Step 2: Inviting Remote Employees
1. Click the **"Invite Member"** button in the top navigation or dashboard.
2. Enter the employee's legal name, corporate work email, and billable rate (e.g. `$65/hr`).
3. Select their initial assigned project.
4. Click **"Create Invitation & Generate Link"**.
5. Copy the invite link and share it directly via Slack, Email, or Discord with your contractor.

### Step 3: Configuring Tracking Policies
1. Navigate to **Manager Suite &gt; Tracking Policies**.
2. **Screenshot Frequency:** Set between `1` and `6` captures per 10-minute block (default is `3`).
3. **Privacy Blur:** Toggle ON to automatically blur screenshots if your team handles confidential patient health information (HIPAA), banking data, or personal records.
4. **Manual Time Allowance:** Specify whether employees are permitted to log manual entries for offline phone calls and whiteboarding.
5. **Idle Inactivity Timeout:** Configured to `5 minutes` of zero input before the tracker pauses.

### Step 4: Enforcing the Desktop Agent (`.exe`)
For guaranteed compliance, direct your employees to download the **ChronoTrack Desktop Agent**:
- **Windows:** `ChronoTrack-Agent-Setup-v2.4.exe`
- **macOS:** `ChronoTrack-Agent-v2.4-Universal.dmg`
- **Linux:** `chronotrack-agent-linux.sh`

### Step 5: Auditing the Work Diary & Payroll Settlement
1. At the end of each weekly billing period, navigate to **Screenshots & Audit**.
2. Select any team member and inspection date.
3. Review the green/yellow activity meters and screenshots. If an employee was browsing non-work content, click **"Discard Block"** to deduct 10 minutes from billable hours.
4. Open the **Payroll** tab, review gross earnings, mark payments as Approved, and export client-ready vector **PDF Reports** or **CSV** data.

---

## 📚 Employee Onboarding & Screen Capture Tutorial

### Step 1: Accept Invite & Launch Tracker
1. Open your unique invitation link sent by your workspace manager.
2. Sign in with Google, GitHub, or your email.
3. Choose your tracking mode: **Web Tracker** or **Desktop .EXE Agent**.

### Step 2: Granting "Entire Screen" Permission
> **CRITICAL:** When starting the browser tracker, Chrome/Edge/Firefox prompts you to choose what to share:
> - ❌ **DO NOT** select *Chrome Tab* or *Application Window* (this will fail when you switch windows).
> - ✅ **SELECT "Entire Screen"**, choose your primary display monitor, and click **Share**.
>
> **macOS Permissions:** If prompted, open **System Settings &gt; Privacy & Security &gt; Screen Recording** and ensure Chrome / ChronoTrack is toggled ON.

### Step 3: Starting Work Sessions
1. Select your assigned client project.
2. Write a clear, specific memo describing your current task (e.g. *"Building responsive data visualizer"*).
3. Click **"Start Tracking"**. The timer and activity sensors will begin immediately.

### Step 4: 10-Minute Work Diary Captures
- ChronoTrack captures an automated snapshot at a random time inside every 10-minute block.
- Keep typing and moving your mouse normally; your activity percentage is computed automatically.
- **Privacy Guarantee:** ChronoTrack never logs raw passwords or individual keystrokes. Only movement velocity count is recorded.

### Step 5: Logging Breaks & Manual Time
- When stepping away for meals or personal errands, click **"Stop Tracking"**.
- If you conducted an offline phone consultation, click **"Manual Time"**, select your project, and provide a clear justification memo for manager review.

### Step 6: Working Offline During Internet Outages
- If your Wi-Fi drops, keep working!
- The app enters **Offline Outage Mode**: all screenshots and hours are encrypted locally with AES-256.
- The moment your internet connection restores, your offline queue automatically synchronizes with the manager dashboard.

---

## 🛠️ Tech Stack & Key Libraries

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Animation:** `motion/react` layout transitions
- **Icons:** `lucide-react`
- **Charts & Reports:** Recharts, D3
- **Security:** Web Crypto API (AES-256-GCM client-side encryption)
- **Display Streaming:** WebRTC `navigator.mediaDevices.getDisplayMedia`
- **Native Desktop Agent:** DirectX Desktop Duplication / CoreGraphics helper script
- **Build Tool:** Vite, TSX, PostCSS

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-org/chronotrack-enterprise.git
cd chronotrack-enterprise

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```
Generates static assets in `dist/` ready for zero-downtime deployment.

---

## 🔒 Security & Privacy Commitments

1. **Client-Side AES-256 Encryption:** All time entry payloads and screenshot blobs are encrypted prior to network transmission.
2. **Velocity Telemetry (No Keylogger):** Only total keystrokes and click velocity per block are counted. Keystroke content is never stored.
3. **Configurable Privacy Blur:** Proprietary customer records or personal identifiable information (PII) can be blurred on the client side before leaving the employee's machine.
4. **Transparent Employee Audit:** Employees maintain full access to inspect their own work diary and delete accidental screenshots before manager approval.

---

## 📄 License
Released under the **MIT License**. Built for high-trust remote engineering teams.
