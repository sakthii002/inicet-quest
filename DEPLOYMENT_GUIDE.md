# ⚔️ INI-CET QUEST // DEPLOYMENT & MULTI-DEVICE SYNC GUIDE

This guide walks you through hosting your gamified study tracker **100% for free** on **GitHub Pages** and setting up **seamless, automatic real-time sync across your Phone, Tablet, and PC**.

---

## 🚀 PART 1: Host Free on GitHub Pages (Via Web Browser - No Git CLI Needed!)

You can upload your files directly on [github.com](https://github.com) through your web browser without installing Git or terminal commands.

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Go to [github.com/new](https://github.com/new).
3. Under **Repository name**, enter: `inicet-quest` (or any name you prefer).
4. Set visibility to **Public** (required for free GitHub Pages).
5. Leave "Add a README file" unchecked (we already have one).
6. Click **Create repository**.

### Step 2: Upload Your App Files
1. On your newly created repository page, click the link: **"uploading an existing file"**.
2. Open your local folder (`d:\AGY\` or wherever your files are located).
3. Drag and drop these files into the GitHub upload area:
   - `index.html` *(primary web app file)*
   - `inicet-quest.html` *(duplicate reference copy)*
   - `manifest.json` *(enables mobile "Add to Home Screen" PWA install)*
   - `sw.js` *(offline service worker engine)*
   - `favicon.png`, `icon-192.png`, `icon-512.png` *(8-bit retro pixel icons)*
4. Scroll to the bottom and click **Commit changes**.

### Step 3: Enable GitHub Pages
1. On your repository page, click the **Settings** tab (the gear icon at the top right).
2. In the left sidebar menu, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - Source: Select **Deploy from a branch**.
   - Branch: Click the dropdown, select **main**, leave the folder as **/(root)**.
   - Click **Save**.
4. Wait about 30 to 60 seconds. Refresh the page.
5. A banner will appear: **"Your site is live at `https://<your-username>.github.io/inicet-quest/`"**!

🎉 **Your study tracker is now live on the internet!**

---

## 📱 PART 2: Install as a Native App on Mobile (PWA)

You can install this tracker on your iPhone, iPad, or Android so it behaves like a native full-screen app with an 8-bit app icon on your home screen:

### On iPhone / iPad (Safari)
1. Open your live URL: `https://<your-username>.github.io/inicet-quest/` in Safari.
2. Tap the **Share** button (box with upward arrow at the bottom of the screen).
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **Add** in the top right.
5. The retro sword icon is now on your home screen! Tap it to play in full-screen with no browser address bar.

### On Android (Chrome)
1. Open your live URL in Google Chrome.
2. Tap the **three vertical dots** (menu) in the top-right corner.
3. Tap **"Install app"** or **"Add to Home screen"**.
4. Confirm by tapping **Install**.

---

## ⚡ PART 3: Set Up Automatic Real-Time Cloud Sync (Google Firebase - 100% Free Forever)

To keep your quest progress in sync between your phone, tablet, and PC automatically without exporting/importing files, we use **Google Firebase Firestore**.
- **Cost:** Free forever (Spark Plan gives 50,000 reads/day — you will use less than 0.1%).
- **Speed:** Instant live streaming (strike a question on phone, your PC updates in ~100ms!).
- **Offline Capable:** If your Wi-Fi drops, progress is saved locally and auto-syncs when reconnected.

### Step 1: Create a Free Firebase Project (2 Minutes)
1. Open [console.firebase.google.com](https://console.firebase.google.com) and sign in with your Google account.
2. Click **"Add project"** (or "Create a project").
3. Name it: `inicet-quest`.
4. Turn **OFF** Google Analytics (not needed), then click **Create project**.
5. Wait ~15 seconds and click **Continue**.

### Step 2: Enable Cloud Firestore Database
1. In the left sidebar under "Build", click **Firestore Database**.
2. Click the orange **"Create database"** button.
3. In the setup modal:
   - Database ID: leave as `(default)`.
   - Security Rules: Select **"Start in test mode"** (or production).
   - Location: Choose your closest region (or leave default).
   - Click **Enable**.

### Step 2.1: Add Permanent Security Rules (Never Expires!)
By default, Firebase test mode expires in 30 days and cuts off sync. To keep sync working forever without 30-day expiration:
1. In Firestore Database, click the **"Rules"** tab at the top.
2. Replace whatever is inside the editor with:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /inicet_saves/{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
3. Click the blue **"Publish"** button.

### Step 3: Copy Your Web App Config
1. In the top left, click the gear icon ⚙️ next to "Project Overview", then click **Project settings**.
2. Scroll down to the **"Your apps"** section.
3. Click the Web icon **`</>`**.
4. App nickname: enter `web`. Leave "Firebase Hosting" unchecked. Click **Register app**.
5. Firebase will show a code block containing `const firebaseConfig = { ... }`.
6. Copy that entire configuration object:
   ```javascript
   {
     apiKey: "AIzaSy...",
     authDomain: "inicet-quest.firebaseapp.com",
     projectId: "inicet-quest",
     storageBucket: "inicet-quest.appspot.com",
     messagingSenderId: "...",
     appId: "..."
   }
   ```

### Step 4: Connect & Test INI-CET Quest
1. Open your hosted INI-CET Quest website on your computer.
2. In the top HUD, click the **`☁️ SYNC: LOCAL`** button (or click **`⚡ WARP CRYSTAL`** in the Guild Armory).
3. In the **🔥 FIREBASE LIVE** tab:
   - **Secret Sync Room Code:** Type any memorable passphrase (e.g. `dr-dungeon-2026`) or click **`🎲 RANDOM`**.
   - **Firebase Web App Config:** Paste the config snippet you copied in Step 3.
4. Click **`🧪 TEST CONNECTION`**:
   - The app runs a read/write test to verify your Firestore rules.
   - If rules or config have an issue, a detailed diagnostic card explains how to fix it in 1 click.
   - If verified, it automatically connects and syncs!
5. Or click **`💾 CONNECT & ENABLE LIVE SYNC`**.
6. The HUD indicator turns green: **`☁️ CLOUD: LIVE`**, and **Last sync** updates to the current time!

---

## 📷 PART 4: Pair Your Phone in 5 Seconds via QR Code (Zero Typing on Mobile!)

You don't need to type the long Firebase config on your phone:

1. On your PC, click **`☁️ CLOUD: LIVE`** to open the Warp Crystal modal.
2. Click the **`📱 MOBILE PAIR QR`** tab.
3. A glowing pixel QR code will be generated containing your sync room and configuration.
4. Open the **Camera app** on your iPhone or Android.
5. Point your camera at the PC screen.
6. Tap the notification banner that appears.
7. Your phone opens your quest, automatically pairs to your Firebase room, and loads your save!
8. From this moment on:
   - Any quest checked on your phone **instantly reflects on your PC**.
   - Daily Anki ignitions or gear purchases sync across both screens in real time!

---

## 🐙 ALTERNATIVE: GitHub Gist Cloud Sync

If you prefer not to use Firebase and want everything kept strictly within GitHub:

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens).
2. Click **Generate new token (classic)**.
3. Note: `INI-CET Quest Sync`.
4. Check the **`gist`** permission box (Create gists).
5. Click **Generate token** and copy the `ghp_...` token.
6. In INI-CET Quest, click **`☁️ SYNC: LOCAL`** -> **`🐙 GITHUB GIST`** tab.
7. Paste your token and leave "Gist ID" empty.
8. Click **`💾 CONNECT & SYNC GIST`**.
9. The app will automatically create a private, encrypted Gist on your GitHub account and keep it synced!

---

## 🛡️ SUMMARY OF FILES IN YOUR REPOSITORY

| File | Purpose |
|---|---|
| `index.html` | The main game & study tracker with embedded 8-bit engine, audio synth, and Warp Crystal sync hub. |
| `inicet-quest.html` | Duplicate file for direct URL access. |
| `manifest.json` | Web App Manifest allowing iPhone & Android to install the tracker as a native home-screen app. |
| `sw.js` | Service Worker that caches game assets for offline studying in hospital wards, subways, or study rooms. |
| `icon-192.png` | 192x192 retro pixel art golden sword & rune shield app icon. |
| `icon-512.png` | 512x512 high-resolution app icon. |
| `favicon.png` | Browser tab icon. |
| `DEPLOYMENT_GUIDE.md` | This step-by-step setup and synchronization reference. |

---

*⚔️ May your preparation be legendary and your INI-CET rank stellar!*
