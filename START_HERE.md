# 🎉 START HERE - QuizMaster Setup Guide

Welcome to **QuizMaster** - Your Kahoot-like Quiz App!

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies (2 min)
Open your terminal and run:
```bash
npm install
```
Wait for it to complete...

### Step 2: Configure Firebase (1 min)
1. Go to https://console.firebase.google.com/
2. Select project: **quizmaster-app-34b08**
3. Click **Realtime Database** → **Rules**
4. Paste this:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
5. Click **Publish**

### Step 3: Run the App (2 min)
```bash
npm start
```
Then scan the QR code with **Expo Go** on your phone!

---

## 📱 What You'll See

1. **Home Screen** with two options:
   - Create & Manage Quizzes
   - Join Game

2. **Create your first quiz**:
   - Tap "Create & Manage Quizzes"
   - Tap the **+** button
   - Add questions and answers
   - Save!

3. **Host a game**:
   - Tap "Host" on your quiz
   - Share the 6-digit PIN
   - Wait for players to join
   - Start and play!

---

## 📚 Need More Help?

### Read These Guides (In Order):
1. **QUICKSTART.md** - Detailed setup guide (10 min)
2. **PROJECT_SUMMARY.md** - What's included (5 min)
3. **README.md** - Full documentation (15 min)

### Quick References:
- **COMMANDS.md** - All terminal commands
- **SETUP_CHECKLIST.md** - Step-by-step checklist
- **APP_FLOW.md** - How the app works
- **FEATURES.md** - What's included

### All Documentation:
See **DOCUMENTATION_INDEX.md** for complete guide

---

## 🎯 What You Have

✅ **Complete Kahoot-like App** with:
- Full quiz CRUD (Create, Read, Update, Delete)
- Host games with PIN codes
- Real-time multiplayer
- Timed questions
- Speed-based scoring
- Live leaderboards
- Professional UI

✅ **9 Screens**:
- Home, Quiz List, Create Quiz, Edit Quiz
- Join Game, Game Lobby, Host Game
- Player Game, Results

✅ **Firebase Integration**:
- Real-time database
- Live synchronization
- Automatic updates

---

## ⚠️ Quick Troubleshooting

### App won't start?
```bash
npx expo start -c
```

### Firebase errors?
→ Check database rules are published

### Network issues?
```bash
npm start -- --tunnel
```

### Need to reset everything?
```bash
rm -rf node_modules
npm install
npx expo start -c
```

---

## 🎊 You're All Set!

**Next Steps:**
1. ✅ Run `npm install`
2. ✅ Set up Firebase rules
3. ✅ Run `npm start`
4. ✅ Create your first quiz
5. ✅ Test with friends!

**Questions?** Check the documentation files listed above.

**Ready to dive deeper?** Read **QUICKSTART.md**

---

**Happy Quizzing! 🚀**

Built with ❤️ using React Native, Expo, and Firebase
