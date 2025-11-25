# QuizMaster - Command Reference

## 🚀 Essential Commands

### First Time Setup
```bash
# Install all dependencies
npm install

# Start the development server
npm start
```

### Running the App

```bash
# Start Expo development server (recommended)
npm start

# Start with cache cleared
npx expo start -c

# Start in tunnel mode (if network issues)
npx expo start --tunnel

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run in web browser
npm run web
```

## 📱 Expo Go Commands

After running `npm start`, you can use these keyboard shortcuts in the terminal:

- `r` - Reload app
- `m` - Toggle menu
- `c` - Clear cache
- `d` - Open developer menu
- `i` - Open on iOS simulator
- `a` - Open on Android emulator
- `w` - Open in web browser

## 🔧 Development Commands

### Package Management
```bash
# Install a new package
npm install <package-name>

# Install as dev dependency
npm install --save-dev <package-name>

# Update all packages
npm update

# Check for outdated packages
npm outdated

# Remove a package
npm uninstall <package-name>
```

### Expo Commands
```bash
# Check Expo CLI version
npx expo --version

# Login to Expo account
npx expo login

# Logout from Expo
npx expo logout

# Check project configuration
npx expo config

# Generate native folders (if needed)
npx expo prebuild

# Create a build
npx expo build:android
npx expo build:ios
```

### Debugging
```bash
# Start with debugger
npm start -- --devClient

# Clear all caches and start fresh
npx expo start -c

# Reset Metro bundler cache
npx expo start --clear

# Check for issues
npx expo-doctor
```

## 🧹 Cleanup Commands

```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install

# Clear npm cache
npm cache clean --force

# Clear Expo cache
npx expo start -c

# Clear watchman (if installed)
watchman watch-del-all

# Reset everything
rm -rf node_modules package-lock.json
npm install
```

## 📦 Build Commands (Production)

```bash
# Create production build for Android
npx eas build --platform android

# Create production build for iOS
npx eas build --platform ios

# Create builds for both platforms
npx eas build --platform all

# Submit to app stores
npx eas submit -p android
npx eas submit -p ios
```

## 🐛 Troubleshooting Commands

```bash
# If Metro bundler has issues
npx expo start --reset-cache

# If experiencing network issues
npx expo start --tunnel

# Check for common issues
npx expo-doctor

# View error logs
npx expo start --verbose

# Kill all node processes
killall node

# For Windows (PowerShell)
Get-Process node | Stop-Process
```

## 🔍 Useful NPM Scripts (Custom)

You can add these to your `package.json` scripts section:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "clean": "rm -rf node_modules && npm install",
    "clear-cache": "expo start -c",
    "tunnel": "expo start --tunnel"
  }
}
```

Then run with:
```bash
npm run clean
npm run clear-cache
npm run tunnel
```

## 📊 Firebase Commands (via Firebase CLI)

If you have Firebase CLI installed:

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init

# Deploy database rules
firebase deploy --only database

# Open Firebase console
firebase open

# View database data
firebase database:get / --project quizmaster-app-34b08
```

## 🔄 Git Commands (Version Control)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Create a repository on GitHub, then:
git remote add origin <your-repo-url>
git push -u origin main

# Check status
git status

# View changes
git diff
```

## 📱 Device-Specific Commands

### Android
```bash
# List connected devices
adb devices

# Reverse port (for development)
adb reverse tcp:8081 tcp:8081

# Clear app data
adb shell pm clear host.exp.exponent

# View logs
adb logcat | grep Expo
```

### iOS (macOS only)
```bash
# List simulators
xcrun simctl list devices

# Open simulator
open -a Simulator

# Reset simulator
xcrun simctl erase all
```

## 🎯 Quick Commands Cheatsheet

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm start` | Start development server |
| `npx expo start -c` | Clear cache and start |
| `r` (in terminal) | Reload app |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npx expo-doctor` | Check for issues |

## 💡 Pro Tips

1. **Always start with cache clear** if you encounter issues:
   ```bash
   npx expo start -c
   ```

2. **Network issues?** Use tunnel mode:
   ```bash
   npm start -- --tunnel
   ```

3. **Fresh start** if things break:
   ```bash
   rm -rf node_modules
   npm install
   npx expo start -c
   ```

4. **Check for problems**:
   ```bash
   npx expo-doctor
   ```

## 🆘 Emergency Commands

If everything breaks:

```bash
# Nuclear option - reset everything
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install
npx expo start -c
```

For Windows PowerShell:
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm cache clean --force
npm install
npx expo start -c
```

---

**Need more help?** Check `README.md` or `QUICKSTART.md`
