# ⚡ Quick Start Guide - 5 Minutes to Running

Get your Fitness Journey app running on your phone in 5 minutes!

---

## 📱 Step 1: Install Expo Go App (2 minutes)

### On iPhone:
1. Open **App Store**
2. Search for **"Expo Go"**
3. Download and install the app
4. ✅ Done! Keep the app ready

### On Android:
1. Open **Google Play Store**
2. Search for **"Expo Go"**
3. Download and install the app
4. ✅ Done! Keep the app ready

---

## 💻 Step 2: Install Project Dependencies (2 minutes)

Open your terminal and run these commands:

```bash
# Navigate to project folder
cd /Users/pedro/Desktop/Projects/hackathon-rn

# Install all dependencies
npm install
```

**If you see errors, try:**
```bash
npm install --legacy-peer-deps
```

---

## 🚀 Step 3: Start the Development Server (30 seconds)

```bash
npm start
```

You should see something like this:

```
Metro waiting on exp://192.168.1.100:8081
 
› Press s │ switch to Expo Go
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu

Logs for your project will appear below. Press Ctrl+C to exit.
```

**And a QR code will appear!** 📱

---

## 📸 Step 4: Scan the QR Code (30 seconds)

### 🍎 On iPhone:

1. Open the **Expo Go** app you just installed
2. Tap **"Scan QR Code"** button at the bottom of the screen
3. Point your camera at the QR code in your terminal
4. Wait 30-60 seconds for the app to load
5. ✅ **You're in!** 🎉

**⚠️ IMPORTANT:** Do NOT use the native iPhone Camera app. It won't work! Use the QR scanner INSIDE the Expo Go app.

### 🤖 On Android:

1. Open the **Expo Go** app you just installed
2. Tap **"Scan QR Code"** button
3. Point your camera at the QR code in your terminal
4. Wait 30-60 seconds for the app to load
5. ✅ **You're in!** 🎉

---

## 🎯 What You'll See

1. **Login Screen** with Garmin Connect button
2. Tap the Garmin button (it's in mock mode, no real login needed)
3. **Main Dashboard** with your health stats
4. Explore the 4 tabs at the bottom:
   - 📊 **Stats** - Your main dashboard
   - ✍️ **Daily Check** - Customize your journal
   - 🧪 **Experiments** - AI-powered suggestions
   - 👤 **Profile** - Your profile and settings

---

## 🆘 Troubleshooting

### ❌ QR Code Doesn't Work?

**Try Tunnel Mode:**
```bash
npx expo start --tunnel
```

This is slower but works even if your phone and computer are on different networks.

### ❌ "Cannot Connect to Metro"?

1. Make sure your phone and computer are on the **same WiFi**
2. Try restarting the server:
   - Press `Ctrl+C` in terminal to stop
   - Run `npm start` again
3. Try clearing cache:
   ```bash
   npx expo start --clear
   ```

### ❌ "Expo Go App Version Mismatch"?

1. Update Expo Go app on your phone to the latest version
2. In terminal, run:
   ```bash
   npx expo install --fix
   ```

### ❌ Still Not Working?

**Option 1: Use iOS Simulator (Mac only)**
```bash
npm run ios
```

**Option 2: Use Android Emulator**
```bash
npm run android
```

---

## 🎮 Testing the App

Once you're in, try these:

1. ✅ **Login** - Tap Garmin button (mock authentication)
2. ✅ **Swipe Charts** - Horizontal scroll through health metrics
3. ✅ **Tap Chart** - See detailed 24-hour breakdown
4. ✅ **Tap Health Score** - View score calculation and tips
5. ✅ **Complete Journal** - Answer daily questions
6. ✅ **Customize Journal** - Add/remove questions in Daily Check tab
7. ✅ **View Experiments** - See AI-powered predictions
8. ✅ **Search Users** - Find and follow other users
9. ✅ **View Profiles** - Tap following avatars on Stats screen
10. ✅ **Logout** - Profile tab → Logout button

---

## 🔥 Hot Reloading

When you make code changes, the app will automatically reload!

**Manual reload:**
- Shake your phone (yes, really!)
- Or tap `R` in the terminal

---

## 💾 Common Commands Cheat Sheet

```bash
# Start development server
npm start

# Start with clean cache
npx expo start --clear

# Use tunnel mode (for network issues)
npx expo start --tunnel

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Stop server
Ctrl+C
```

---

## 🎉 You're All Set!

Your Fitness Journey app is now running!

**Data Note:** All data is randomly generated on each app launch. This is perfect for testing and demos!

**Next Steps:**
- Read the full `README.md` for detailed documentation
- Explore the codebase in `src/` folder
- Customize colors, features, and functionality

---

**Need help?** Check the main README.md for detailed troubleshooting.

**Happy coding! 🚀**

