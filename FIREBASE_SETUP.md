# Firebase Setup Guide

## Firebase Realtime Database Rules

To ensure your app works properly, you need to set up the correct database rules in Firebase.

### Steps:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **quizmaster-app-34b08**
3. Click on **Realtime Database** in the left menu
4. Click on the **Rules** tab
5. Copy and paste the rules from `firebase-database-rules.json`
6. Click **Publish**

### Quick Setup (Development/Testing)

For development and testing, you can use these simple rules:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**⚠️ WARNING**: These rules allow anyone to read/write to your database. Only use for development!

### Production Rules (Recommended)

For production, use the rules in `firebase-database-rules.json` or implement authentication:

```json
{
  "rules": {
    "quizzes": {
      ".read": true,
      ".write": "auth != null"
    },
    "games": {
      ".read": true,
      ".write": true
    }
  }
}
```

## Database Structure

Your Firebase Realtime Database should have two main collections:

### 1. Quizzes
Stores all quiz data including questions and answers.

### 2. Games
Stores active game sessions with real-time player data.

## Testing the Connection

1. Start your app: `npm start`
2. Open in Expo Go
3. Try creating a quiz
4. Check the Firebase Console to see if data appears in Realtime Database

## Troubleshooting

### "Permission Denied" Error
- Check that your database rules allow write access
- Ensure the database URL in `config/firebase.js` is correct

### Data Not Syncing
- Verify you're connected to the internet
- Check Firebase Console for any service outages
- Make sure your Firebase project is on the Spark (free) or Blaze plan

### Cannot Read Data
- Ensure the database has `.read: true` in rules
- Check if there's actually data in the database

## Security Best Practices

1. **Never commit Firebase API keys to public repositories**
2. Add Firebase rules to validate data structure
3. Implement user authentication before production
4. Set up Firebase App Check to prevent abuse
5. Monitor database usage in Firebase Console

## Estimated Costs (Firebase Free Tier)

The Spark (free) plan includes:
- 1 GB stored data
- 10 GB/month downloaded
- 100 simultaneous connections

This should be sufficient for testing and small-scale use.

---

Need help? Check the [Firebase Documentation](https://firebase.google.com/docs/database)
