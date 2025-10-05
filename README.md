# 🏆 Fitness Journey

**Pax - Stay fit with socializing**

A comprehensive health and fitness tracking application built with React Native and Expo. Track your daily wellness, connect with a global community, run AI-powered experiments, and achieve your fitness goals.

---

## 📚 Quick Navigation

- 🚀 **New here?** Start with [QUICK_START.md](./QUICK_START.md) (5 minutes)
- 📱 **QR code issues?** Check [QR_CODE_GUIDE.md](./QR_CODE_GUIDE.md) (visual guide)
- ⚡ **Need quick reference?** See [CHEAT_SHEET.md](./CHEAT_SHEET.md) (one page)
- 📖 **Want full details?** Keep reading this README (comprehensive)
- 🗂️ **Looking for something specific?** See [DOCS_INDEX.md](./DOCS_INDEX.md)

---

## 📱 Features

### 🔥 Health Tracking

- **Health Score System** - Uncapped scoring system with gaming-inspired levels
- **Daily Streak Tracking** - Build consistency with fire streak counter
- **Recovery Impact Analysis** - Track what helps and hurts your recovery
- **Interactive Charts** - Swipeable, tappable charts with real-time data visualization

### 📊 Stats & Analytics

- **Detailed Metrics** - Heart rate, sleep quality, HRV, stress levels, and more
- **24-Hour Charts** - Tap any metric to see hourly breakdown with Y-axis data
- **Progress Tracking** - Monitor improvements over time

### 📝 Daily Journal

- **Customizable Questions** - Add/remove questions from your daily check-in
- **Category Organization** - Circadian Health, Sleep, Nutrition, Fitness, Wellness
- **Searchable Database** - Find specific questions quickly
- **Yes/No Format** - Simple, fast daily completion

### 🧪 AI-Powered Experiments

- **Personalized Predictions** - AI suggests experiments based on similar users
- **Confidence Ratings** - See how likely each experiment is to work for you
- **Progress Tracking** - Monitor experiment status (not started, in progress, completed)
- **Impact Analysis** - View positive/negative results after completion

### 👥 Social Features

- **Following System** - Connect with friends and see their progress
- **Profile Views** - Check out other users' stats, streaks, and trophies
- **Social Feed** - See likes, comments, and encouragement from the community
- **Share Profiles** - Share your fitness journey to other apps

### 🎖️ Achievements

- **Trophy System** - Earn trophies for milestones (runs, workouts, journals)
- **Visual Progress** - Shield-shaped trophies with custom icons
- **Status Levels** - Elite, Advanced, Intermediate, Beginner, Starting

### 🔗 Integrations

- **Garmin Connect** - SSO login with OAuth 1.0a (mock mode for development)
- **Real-time Sync** - Connect with Garmin devices for automatic data import

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Expo Go app** on your iOS/Android device - [Download here](https://expo.dev/client)
  - iOS: App Store
  - Android: Google Play Store
- **Xcode Command Line Tools** (for iOS development on Mac)
  ```bash
  xcode-select --install
  ```

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd hackathon-rn
```

### 2. Install Dependencies

```bash
npm install
```

If you encounter dependency conflicts, use:

```bash
npm install --legacy-peer-deps
```

Or fix dependencies automatically:

```bash
npx expo install --fix
```

### 3. Verify Installation

Check that all packages are installed correctly:

```bash
npm list
```

---

## 🏃 Running the App

### Method 1: Using QR Code (Recommended for Physical Devices)

#### Step 1: Start the Development Server

```bash
npm start
```

Or explicitly:

```bash
npx expo start
```

#### Step 2: Scan the QR Code

**On iOS:**

1. Open the **Expo Go** app (NOT the native Camera app)
2. Tap **"Scan QR Code"** at the bottom
3. Scan the QR code displayed in your terminal or browser
4. The app will load automatically

**On Android:**

1. Open the **Expo Go** app
2. Tap **"Scan QR Code"**
3. Scan the QR code displayed in your terminal or browser
4. The app will load automatically

#### Step 3: Wait for Bundle to Load

The first load may take 30-60 seconds as the JavaScript bundle is built and transferred to your device.

---

### Method 2: Using Tunnel Mode (For Network Issues)

If the QR code doesn't work due to network configuration (different WiFi, firewall, etc.):

```bash
npx expo start --tunnel
```

This uses ngrok to create a public URL, allowing your phone to connect even if it's not on the same network as your computer.

**Note:** Tunnel mode is slower but more reliable for complex network setups.

---

### Method 3: Running on Simulator/Emulator

#### iOS Simulator (Mac only):

```bash
npm run ios
```

Or:

```bash
npx expo start --ios
```

**Requirements:**

- Xcode must be installed
- iOS Simulator must be available
- Command line tools must be configured

#### Android Emulator:

```bash
npm run android
```

Or:

```bash
npx expo start --android
```

**Requirements:**

- Android Studio must be installed
- Android emulator must be running
- SDK tools must be configured

---

## 🛠️ Common Issues & Troubleshooting

### ❌ QR Code Scan Shows "No Usable Data Found"

**Solution:** Use the Expo Go app's built-in QR scanner, NOT your phone's native Camera app.

---

### ❌ "Cannot connect to Metro bundler"

**Solutions:**

1. Ensure your phone and computer are on the **same WiFi network**
2. Try tunnel mode: `npx expo start --tunnel`
3. Restart the Metro bundler: Press `R` in the terminal
4. Clear cache: `npx expo start --clear`

---

### ❌ Expo Version Mismatch

**Error:** "This project requires Expo SDK version X but you have Y"

**Solution:**

```bash
# Update Expo Go app on your phone to the latest version
# Then update your project dependencies
npx expo install --fix
```

---

### ❌ "babel-preset-expo cannot find module"

**Solution:**

```bash
npm install --save-dev babel-preset-expo
```

---

### ❌ "Invariant Violation: PlatformConstants could not be found"

**Solution:**

```bash
npx expo install expo-modules-core
npm install --legacy-peer-deps
```

---

### ❌ Xcode Command Line Tools Not Configured

**Solution:**

```bash
sudo xcode-select --reset
xcode-select --install
```

---

### ❌ "Cannot read property 'x' of undefined" When Clicking Charts

**This has been fixed!** The app now handles loading states properly. If you still see this:

1. Pull down to refresh the screen
2. Restart the Expo app
3. Clear cache: `npx expo start --clear`

---

## 📂 Project Structure

```
hackathon-rn/
├── App.tsx                      # Root component with auth logic
├── app.json                     # Expo configuration
├── package.json                 # Dependencies and scripts
├── babel.config.js              # Babel configuration
├── tsconfig.json                # TypeScript configuration
│
├── src/
│   ├── navigation/
│   │   └── HomeNavigation.tsx   # Bottom tab navigator
│   │
│   ├── screens/
│   │   ├── LoginScreen.tsx      # Garmin SSO login
│   │   ├── StatsScreen.tsx      # Main dashboard with charts
│   │   ├── JournalScreen.tsx    # Daily questionnaire
│   │   ├── JournalCustomizeScreen.tsx  # Customize journal questions
│   │   ├── ExperimentsScreen.tsx       # AI-powered experiments
│   │   ├── ProfileScreen.tsx    # User profile and settings
│   │   ├── SearchScreen.tsx     # Search and follow users
│   │   ├── UserProfileScreen.tsx       # Other users' profiles
│   │   ├── ChartDetailScreen.tsx       # Detailed chart view
│   │   └── HealthScoreDetailScreen.tsx # Health score breakdown
│   │
│   ├── services/
│   │   ├── garminApi.ts         # Garmin API integration
│   │   ├── garminOAuth.ts       # OAuth 1.0a authentication
│   │   ├── journalService.ts    # Journal question management
│   │   └── randomDataService.ts # Random data generation
│   │
│   └── assets/
│       └── svg/                 # SVG logo components
│           ├── GarminLogo.tsx
│           ├── AppleWatchLogo.tsx
│           ├── FitbitLogo.tsx
│           └── index.ts
│
└── node_modules/                # Dependencies (gitignored)
```

---

## 🎨 Tech Stack

### Core

- **React Native** `0.81.4` - Mobile framework
- **Expo** `^54.0.0` - Development platform
- **TypeScript** `^5.3.0` - Type safety
- **React** `19.1.0` - UI library

### Navigation

- **React Navigation** `^7.0.13` - Navigation framework
- **Bottom Tabs** `^7.2.1` - Tab navigation
- **Native Stack** `^7.1.7` - Stack navigation

### UI & Graphics

- **react-native-svg** `15.8.0` - SVG rendering
- **react-native-safe-area-context** `~5.6.0` - Safe area handling
- **react-native-screens** `~4.6.0` - Native screen optimization

### Authentication

- **expo-auth-session** `^7.0.8` - OAuth flows
- **expo-crypto** `^15.0.7` - Cryptographic functions
- **expo-web-browser** `^15.0.8` - In-app browser for auth

### Build Tools

- **Babel** `^7.25.0` - JavaScript compiler
- **babel-preset-expo** `~12.0.1` - Expo Babel preset

---

## 🎯 App Navigation Structure

```
Login Screen (Garmin SSO)
    ↓ (after authentication)
Bottom Tab Navigator
    ├── Stats Tab
    │   ├── Stats Screen (main dashboard)
    │   ├── → Chart Detail Screen (tap any chart)
    │   ├── → Health Score Detail Screen (tap health score)
    │   ├── → Journal Screen (complete daily journal button)
    │   ├── → Search Screen (search icon in header)
    │   └── → User Profile Screen (tap following avatars)
    │
    ├── Daily Check Tab
    │   └── Journal Customize Screen (add/remove questions)
    │
    ├── Experiments Tab
    │   └── Experiments Screen (AI predictions)
    │
    └── Profile Tab
        └── Profile Screen (your stats, settings, logout)
```

---

## 🔐 Authentication

### Garmin OAuth (Mock Mode)

The app uses **Garmin Connect OAuth 1.0a** for authentication. Currently in **mock mode** for development.

**To enable real Garmin authentication:**

1. Register your app at [Garmin Connect Developer Portal](https://developer.garmin.com/)
2. Obtain Client ID and Client Secret
3. Update `src/services/garminOAuth.ts`:
   ```typescript
   const GARMIN_CONFIG = {
     clientId: "YOUR_ACTUAL_CLIENT_ID",
     clientSecret: "YOUR_ACTUAL_CLIENT_SECRET",
     // ... rest of config
   };
   ```
4. Configure redirect URI in `app.json` to match Garmin settings

**Current mock mode behavior:**

- Simulates successful authentication after 1.5s delay
- No real credentials required for testing
- Perfect for development and demonstrations

---

## 📊 Data & State Management

### Random Data Service

The app generates **random data on each launch** for demonstration purposes:

- Health scores (4000-9500)
- Streaks (1-365 days)
- Journal impacts (-20% to +30%)
- Chart metrics with realistic patterns
- Experiments with AI predictions
- Following users with varied stats

**Location:** `src/services/randomDataService.ts`

**To use real data:** Replace random data service calls with actual API calls to your backend.

---

## 🎨 Design System

### Colors

- **Primary Green:** `#7EE3A0` - Brand color, used throughout
- **Background:** `#000000` - Pure black
- **Cards:** `#0a0a0a` - Slightly lighter black
- **Borders:** `#1a1a1a`, `#2a2a2a` - Subtle separators
- **Text Primary:** `#ffffff` - White
- **Text Secondary:** `#9ca3af` - Gray
- **Success:** `#7EE3A0` - Green (positive impacts)
- **Warning:** `#E8A87C` - Orange (neutral)
- **Danger:** `#FF6B6B` - Red (negative impacts)

### Typography

- **Headers:** Bold, 24-32px
- **Body:** Regular, 14-16px
- **Captions:** Regular, 12-14px
- **Font:** System default (San Francisco on iOS, Roboto on Android)

### Spacing

- **Base unit:** 4px
- **Small:** 8px
- **Medium:** 16px
- **Large:** 24px
- **XLarge:** 32px

---

## 🧪 Development Scripts

```bash
# Start development server
npm start

# Start with cache cleared
npx expo start --clear

# Start in tunnel mode (for network issues)
npx expo start --tunnel

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run web version (limited functionality)
npm run web

# Fix dependency issues
npx expo install --fix
```

---

## 🏗️ Building for Production

### iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure your project
eas build:configure

# Build for iOS
eas build --platform ios
```

### Android

```bash
# Build for Android
eas build --platform android
```

**Note:** You'll need to set up EAS (Expo Application Services) and configure your `eas.json` for production builds.

---

## 🔄 State Management

### Journal Questions

- **Service:** `src/services/journalService.ts`
- **State:** Shared across Journal and Journal Customize screens
- **Persistence:** In-memory (resets on app restart)
- **To persist:** Integrate with `AsyncStorage` or backend API

### Authentication State

- **Location:** `App.tsx` root component
- **State:** `isAuthenticated` boolean
- **Logout:** Clears state and navigates to login screen

---

## 📱 Supported Platforms

- ✅ **iOS** 13.0+
- ✅ **Android** 5.0+ (API 21+)
- ⚠️ **Web** (limited functionality, not optimized)

---

## 🤝 Contributing

This is a hackathon project built for **HackYeah 2025**.

If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both iOS and Android
5. Submit a pull request

---

## 📄 License

This project is private and built for HackYeah 2025 hackathon.

---

## 👥 Team

**Pax Team** - Stay fit with socializing

---

## 🐛 Known Issues

- ✅ **Fixed:** Chart detail screen error when clicking charts
- ✅ **Fixed:** Journal "No" button styling when selected
- ✅ **Fixed:** Negative values displaying in wrong color
- ✅ **Fixed:** Loading states for all screens
- ⚠️ **Mock Mode:** Garmin OAuth is simulated (not real authentication)
- ⚠️ **Data Persistence:** Data resets on app restart (no backend)

---

## 📞 Support

For issues or questions:

1. Check the **Troubleshooting** section above
2. Clear cache: `npx expo start --clear`
3. Reinstall dependencies: `rm -rf node_modules && npm install`
4. Check Expo version match between CLI and Expo Go app

---

## 🎉 Acknowledgments

Built with:

- **Expo** - Amazing development platform
- **React Navigation** - Smooth navigation
- **react-native-svg** - Beautiful vector graphics
- **Garmin Connect** - Health data integration

---

## 📸 Screenshots

_Add screenshots of your app here once you've built it!_

---

**Made with ❤️ for HackYeah 2025**

🔥 **Start your fitness journey today!** 🔥
