# ✅ QuizMaster - Complete Setup Checklist

Use this checklist to ensure everything is set up correctly!

## 📋 Pre-Installation Checklist

- [ ] Node.js installed (v14 or higher)
  - Check: `node --version`
- [ ] npm installed
  - Check: `npm --version`
- [ ] Expo Go app installed on your mobile device
  - Download from App Store (iOS) or Play Store (Android)
- [ ] Firebase project exists (quizmaster-app-34b08)
  - Check at: https://console.firebase.google.com/

## 🔧 Installation Checklist

- [ ] Navigate to project directory
  ```bash
  cd c:\Users\rolan\Desktop\quizmaster
  ```
- [ ] Install dependencies
  ```bash
  npm install
  ```
- [ ] Wait for installation to complete (may take 2-5 minutes)
- [ ] Check for any error messages
- [ ] Verify `node_modules` folder was created

## 🔥 Firebase Setup Checklist

- [ ] Open Firebase Console
  - URL: https://console.firebase.google.com/
- [ ] Select project: **quizmaster-app-34b08**
- [ ] Navigate to **Realtime Database**
- [ ] Click on **Rules** tab
- [ ] Paste the following rules for testing:
  ```json
  {
    "rules": {
      ".read": true,
      ".write": true
    }
  }
  ```
- [ ] Click **Publish**
- [ ] Verify database is in **test mode** (shows in the console)
- [ ] Note: For production, update rules (see FIREBASE_SETUP.md)

## 📱 Device Preparation Checklist

### On Your Computer
- [ ] Computer connected to WiFi
- [ ] Note your WiFi network name

### On Your Mobile Device
- [ ] Expo Go app installed
- [ ] Connected to **same WiFi** as computer
- [ ] Camera app ready (iOS) or Expo Go open (Android)

## 🚀 First Run Checklist

- [ ] Open terminal/command prompt
- [ ] Navigate to project folder
- [ ] Run: `npm start`
- [ ] Wait for QR code to appear
- [ ] Metro bundler starts successfully
- [ ] No error messages in terminal
- [ ] QR code displays in terminal

### On Mobile Device
- [ ] Scan QR code with:
  - **iOS**: Camera app
  - **Android**: Expo Go app
- [ ] App starts loading
- [ ] Expo Go shows "Opening project..."
- [ ] App loads successfully
- [ ] You see the QuizMaster home screen

## 🎮 Functionality Testing Checklist

### Test 1: Create a Quiz
- [ ] Tap "Create & Manage Quizzes"
- [ ] See empty quiz list (or existing quizzes)
- [ ] Tap the **+** button
- [ ] Create Quiz screen appears
- [ ] Enter quiz title: "Test Quiz"
- [ ] Tap "Add Question"
- [ ] Enter question text
- [ ] Enter 4 answer options
- [ ] Select correct answer (tap radio button)
- [ ] Set time limit
- [ ] Tap "Save Quiz"
- [ ] See success message
- [ ] Quiz appears in list

### Test 2: Edit a Quiz
- [ ] Find your quiz in the list
- [ ] Tap "Edit" button
- [ ] Edit Quiz screen appears
- [ ] Modify quiz title or questions
- [ ] Tap "Save Changes"
- [ ] Changes saved successfully
- [ ] Return to quiz list

### Test 3: Host a Game (Single Device)
- [ ] Find your quiz in the list
- [ ] Tap "Host" button
- [ ] Enter your name
- [ ] Game lobby appears
- [ ] 6-digit PIN is displayed
- [ ] Copy button works
- [ ] Your name shows as host

### Test 4: Join a Game (If you have a second device)
- [ ] On second device, scan same QR code
- [ ] App loads
- [ ] Tap "Join Game"
- [ ] Enter the PIN from host device
- [ ] Enter a player name
- [ ] Join successful
- [ ] See game lobby
- [ ] Player appears on host device

### Test 5: Play a Game (Need 2+ devices)
- [ ] On host device, tap "Start Game"
- [ ] Question appears on all devices
- [ ] Timer counts down
- [ ] On player device, select an answer
- [ ] "Answer submitted" message appears
- [ ] On host device, see answer count update
- [ ] Host taps "Show Results"
- [ ] Correct answer highlights
- [ ] Host taps "Next Question"
- [ ] Next question appears
- [ ] Repeat for all questions
- [ ] Final results/leaderboard appears
- [ ] Scores displayed correctly
- [ ] Medals shown for top 3

### Test 6: Delete a Quiz
- [ ] Go to quiz list
- [ ] Tap "Delete" on a quiz
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Quiz removed from list

## 🔍 Firebase Verification Checklist

- [ ] Open Firebase Console
- [ ] Go to Realtime Database
- [ ] Navigate to **Data** tab
- [ ] You should see two nodes:
  - [ ] `quizzes` (with your created quizzes)
  - [ ] `games` (if you hosted a game)
- [ ] Click on a quiz to view its data
- [ ] Verify question data is correct
- [ ] If you hosted a game, check game data

## 📊 Performance Checklist

- [ ] App loads in under 5 seconds
- [ ] No lag when creating quizzes
- [ ] Real-time updates work instantly
- [ ] Timer counts down smoothly
- [ ] Answer submission is immediate
- [ ] No crashes or freezes

## 🐛 Troubleshooting Checklist

If you encounter issues, check these:

### Installation Issues
- [ ] Run: `npm cache clean --force`
- [ ] Delete `node_modules` folder
- [ ] Run: `npm install` again

### Connection Issues
- [ ] Computer and phone on same WiFi
- [ ] Try: `npm start -- --tunnel`
- [ ] Restart Expo development server
- [ ] Restart Expo Go app

### Firebase Issues
- [ ] Database rules allow read/write
- [ ] Correct database URL in `config/firebase.js`
- [ ] Internet connection active
- [ ] Firebase project is active

### App Issues
- [ ] Run: `npx expo start -c` (clear cache)
- [ ] Shake device → Reload
- [ ] Close and reopen Expo Go
- [ ] Restart development server

## 📚 Documentation Checklist

Have you read:
- [ ] [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - Know what docs exist
- [ ] [QUICKSTART.md](QUICKSTART.md) - Quick setup guide
- [ ] [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Project overview
- [ ] [README.md](README.md) - Full documentation
- [ ] [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Firebase details
- [ ] [COMMANDS.md](COMMANDS.md) - Useful commands
- [ ] [APP_FLOW.md](APP_FLOW.md) - Understand app flow

## 🎯 Ready to Use Checklist

You're ready when:
- [ ] App runs without errors
- [ ] You can create quizzes
- [ ] You can host games
- [ ] Players can join
- [ ] Gameplay works smoothly
- [ ] Scores calculate correctly
- [ ] Results display properly
- [ ] You understand the basic flow

## 🎉 Bonus: Multi-Device Testing

For the full experience:
- [ ] Have 2+ devices ready
- [ ] Install Expo Go on all devices
- [ ] Connect all to same WiFi
- [ ] Scan QR code on all devices
- [ ] One device hosts
- [ ] Others join as players
- [ ] Play a complete game
- [ ] Check leaderboard

## 📝 Notes Section

Use this space to note any issues or customizations:

```
Issues encountered:
_________________________________
_________________________________
_________________________________

Customizations made:
_________________________________
_________________________________
_________________________________

Questions for later:
_________________________________
_________________________________
_________________________________
```

## ✅ Final Verification

Answer these questions:
- [ ] Can you create a quiz? → YES / NO
- [ ] Can you edit a quiz? → YES / NO
- [ ] Can you delete a quiz? → YES / NO
- [ ] Can you host a game? → YES / NO
- [ ] Can you join a game? → YES / NO
- [ ] Does gameplay work? → YES / NO
- [ ] Do scores calculate? → YES / NO
- [ ] Does leaderboard show? → YES / NO

**If you answered YES to all 8 questions, you're good to go! 🎉**

## 🆘 Still Having Issues?

1. Check [QUICKSTART.md](QUICKSTART.md) troubleshooting
2. Review [README.md](README.md) troubleshooting section
3. Try the "nuclear option" in [COMMANDS.md](COMMANDS.md)
4. Verify Firebase setup in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

## 🎊 Success!

Once everything is checked:
- [ ] App is fully functional
- [ ] Ready for use with friends/students
- [ ] Can create unlimited quizzes
- [ ] Can host unlimited games
- [ ] Understand how to use all features

**Congratulations! You now have a fully functional Kahoot-like quiz app! 🚀**

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**Status**: Production Ready ✅
