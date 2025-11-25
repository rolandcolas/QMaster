# Quick Start Guide - QuizMaster

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Firebase Database Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **quizmaster-app-34b08**
3. Go to **Realtime Database** > **Rules**
4. Paste this for testing:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
5. Click **Publish**

### Step 3: Start the App
```bash
npm start
```

Then scan the QR code with **Expo Go** app on your phone!

---

## 📱 Test the Complete Flow

### Create Your First Quiz

1. Tap **"Create & Manage Quizzes"**
2. Tap the **+** button
3. Fill in:
   - Title: "My First Quiz"
   - Add 3-5 questions with 4 options each
4. Tap **"Save Quiz"**

### Host a Game

1. Find your quiz in the list
2. Tap **"Host"**
3. Enter your name
4. Note the **6-digit PIN** (you'll need this!)

### Join as a Player (Use a Second Device)

1. Install Expo Go on another phone/tablet
2. Scan the same QR code
3. Tap **"Join Game"**
4. Enter the PIN and a player name
5. Wait in the lobby

### Play!

1. On the host device, tap **"Start Game"**
2. Players answer on their devices
3. Host shows results and moves to next question
4. See the final leaderboard!

---

## 🎮 Game Flow

```
Host Device:                    Player Devices:
┌─────────────────┐            ┌──────────────────┐
│ Select Quiz     │            │ Enter Game PIN   │
│      ↓          │            │       ↓          │
│ Generate PIN    │   ----→    │ Enter Name       │
│      ↓          │            │       ↓          │
│ Lobby (wait)    │   ←----    │ Join Lobby       │
│      ↓          │            │       ↓          │
│ Start Game      │   ----→    │ See Question     │
│      ↓          │            │       ↓          │
│ Show Question   │            │ Select Answer    │
│      ↓          │   ←----    │       ↓          │
│ Show Results    │   ----→    │ Wait for Host    │
│      ↓          │            │       ↓          │
│ Next Question   │            │ Next Question    │
│      ↓          │            │       ↓          │
│ Final Results   │   ←→       │ See Leaderboard  │
└─────────────────┘            └──────────────────┘
```

---

## 💡 Tips

- **Multiple Players**: Open the app on different devices using the same QR code
- **Testing Solo**: You can host and join from the same device (just use back button to navigate)
- **Network**: Make sure all devices are on the same WiFi network as your computer
- **PIN Sharing**: Use the "Copy" button to easily share the game PIN

---

## ⚠️ Troubleshooting

### Can't scan QR code?
- Make sure Expo Go is installed on your phone
- Try the tunnel option: Press `t` in the terminal

### Firebase errors?
- Check `FIREBASE_SETUP.md` for detailed setup instructions
- Verify database rules are set to allow read/write

### App won't start?
```bash
# Clear cache and restart
npx expo start -c
```

---

## 📚 Next Steps

- Read `README.md` for full documentation
- Check `FIREBASE_SETUP.md` for production setup
- Customize colors and styling in screen files

---

**Enjoy your QuizMaster app! 🎉**
