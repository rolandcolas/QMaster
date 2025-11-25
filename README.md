# QuizMaster - Kahoot-like Quiz App

A real-time interactive quiz game application built with React Native, Expo, and Firebase, similar to Kahoot!

## Features

### Quiz Management (CRUD)
- ✅ Create new quizzes with custom questions
- ✅ Edit existing quizzes
- ✅ Delete quizzes
- ✅ View all your quizzes
- ✅ Multiple choice questions (4 options)
- ✅ Customizable time limits per question (10s, 20s, 30s, 45s, 60s)

### Game Features
- ✅ Host game sessions with unique PIN codes
- ✅ Players join games using PIN
- ✅ Real-time game lobby showing connected players
- ✅ Live question display with timer
- ✅ Instant answer submission
- ✅ Score calculation based on speed and accuracy
- ✅ Leaderboard and final results

### Technical Features
- 🔥 Firebase Realtime Database for live updates
- 📱 React Native with Expo for cross-platform support
- 🎨 Kahoot-inspired UI with vibrant colors
- ⚡ Real-time synchronization between host and players

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app installed on your mobile device
- Firebase project set up

## Installation

1. Install dependencies:
```bash
npm install
```

2. The Firebase configuration is already set up in `config/firebase.js`

## Running the App

### Using Expo Go (Recommended for Testing)

1. Start the development server:
```bash
npm start
```

2. Scan the QR code with:
   - **iOS**: Use the Camera app
   - **Android**: Use the Expo Go app

3. The app will open in Expo Go on your device

### Alternative Commands

```bash
# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run in web browser
npm run web
```

## How to Use

### Creating a Quiz

1. Open the app and tap **"Create & Manage Quizzes"**
2. Tap the **"+"** button
3. Enter quiz title and description
4. Add questions:
   - Tap **"+ Add Question"**
   - Enter the question text
   - Enter 4 answer options
   - Select the correct answer (tap the radio button)
   - Set the time limit
5. Tap **"Save Quiz"**

### Hosting a Game

1. Go to **"Create & Manage Quizzes"**
2. Find your quiz and tap **"Host"**
3. Enter your name
4. Share the **Game PIN** with players
5. Wait for players to join
6. Tap **"Start Game"** when ready
7. Control the flow:
   - Show results after each question
   - Move to next question
   - View final leaderboard

### Joining a Game (as a Player)

1. Tap **"Join Game"**
2. Enter the **6-digit Game PIN**
3. Enter your name
4. Wait in the lobby for the host to start
5. Answer questions as fast as possible for more points!

## Project Structure

```
quizmaster/
├── App.js                          # Main navigation setup
├── config/
│   └── firebase.js                 # Firebase configuration
├── services/
│   ├── quizService.js             # Quiz CRUD operations
│   └── gameService.js             # Game session management
├── screens/
│   ├── HomeScreen.js              # Landing page
│   ├── QuizListScreen.js          # Quiz management (Read)
│   ├── CreateQuizScreen.js        # Create new quiz
│   ├── EditQuizScreen.js          # Edit existing quiz
│   ├── JoinGameScreen.js          # Player joins game
│   ├── GameLobbyScreen.js         # Pre-game lobby
│   ├── HostGameScreen.js          # Host controls
│   ├── PlayerGameScreen.js        # Player gameplay
│   └── GameResultsScreen.js       # Final leaderboard
├── package.json
└── README.md
```

## Firebase Database Structure

```
{
  "quizzes": {
    "quizId": {
      "id": "quizId",
      "title": "Quiz Title",
      "description": "Quiz Description",
      "questions": [
        {
          "question": "Question text?",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": 0,
          "timeLimit": 20
        }
      ],
      "createdAt": 1234567890,
      "updatedAt": 1234567890
    }
  },
  "games": {
    "123456": {
      "gamePin": "123456",
      "quizId": "quizId",
      "hostName": "Host Name",
      "status": "playing",
      "currentQuestion": 0,
      "players": {
        "playerId": {
          "id": "playerId",
          "name": "Player Name",
          "score": 1500,
          "answers": {
            "0": {
              "answerIndex": 2,
              "timeElapsed": 5,
              "submittedAt": 1234567890
            }
          }
        }
      }
    }
  }
}
```

## Scoring System

- **Base Points**: 500 points for correct answer
- **Speed Bonus**: Up to 500 additional points based on answer speed
- **Total**: Max 1000 points per question
- **Formula**: `500 + (500 × ((timeLimit - timeElapsed) / timeLimit))`

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **Firebase Realtime Database** - Real-time data sync
- **React Navigation** - Screen navigation
- **Expo Clipboard** - Copy game PIN functionality

## Troubleshooting

### Firebase Connection Issues
- Ensure your Firebase Realtime Database rules allow read/write access
- Check that the database URL is correct in `config/firebase.js`

### Expo Go Issues
- Make sure your mobile device and computer are on the same network
- Restart the Expo development server if QR code doesn't scan

### App Crashes
- Clear Expo cache: `npx expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Future Enhancements

- [ ] User authentication
- [ ] Quiz categories and tags
- [ ] Image support in questions
- [ ] Power-ups and bonuses
- [ ] Game history and statistics
- [ ] Private/public quiz sharing
- [ ] Sound effects and animations

## License

MIT

## Support

For issues or questions, please open an issue on the repository.

---

Built with ❤️ using React Native and Firebase
