import { database } from '../config/firebase';
import { ref, set, get, update, remove, push, onValue, off } from 'firebase/database';

// Generate a random 6-digit game PIN
const generateGamePin = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create a new game session
export const createGameSession = async (quizId, hostName) => {
  try {
    const gamePin = generateGamePin();
    const gameRef = ref(database, `games/${gamePin}`);
    
    const gameData = {
      gamePin,
      quizId,
      hostName,
      status: 'waiting', // waiting, playing, finished
      currentQuestion: -1,
      players: {},
      createdAt: Date.now()
    };
    
    await set(gameRef, gameData);
    return { success: true, gamePin, gameData };
  } catch (error) {
    console.error('Error creating game session:', error);
    return { success: false, error: error.message };
  }
};

// Join a game session as a player
export const joinGame = async (gamePin, playerName) => {
  try {
    const gameRef = ref(database, `games/${gamePin}`);
    const snapshot = await get(gameRef);
    
    if (!snapshot.exists()) {
      return { success: false, error: 'Game not found' };
    }
    
    const gameData = snapshot.val();
    if (gameData.status !== 'waiting') {
      return { success: false, error: 'Game already started' };
    }
    
    const playerId = push(ref(database, `games/${gamePin}/players`)).key;
    const playerData = {
      id: playerId,
      name: playerName,
      score: 0,
      answers: {},
      joinedAt: Date.now()
    };
    
    await update(ref(database, `games/${gamePin}/players/${playerId}`), playerData);
    return { success: true, playerId, playerData };
  } catch (error) {
    console.error('Error joining game:', error);
    return { success: false, error: error.message };
  }
};

// Start the game
export const startGame = async (gamePin) => {
  try {
    const gameRef = ref(database, `games/${gamePin}`);
    await update(gameRef, {
      status: 'playing',
      currentQuestion: 0,
      startedAt: Date.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error starting game:', error);
    return { success: false, error: error.message };
  }
};

// Reveal correct answer
export const revealAnswer = async (gamePin, showResults) => {
  try {
    const gameRef = ref(database, `games/${gamePin}`);
    await update(gameRef, {
      showResults: showResults
    });
    return { success: true };
  } catch (error) {
    console.error('Error revealing answer:', error);
    return { success: false, error: error.message };
  }
};

// Move to next question
export const nextQuestion = async (gamePin, currentQuestionIndex) => {
  try {
    const gameRef = ref(database, `games/${gamePin}`);
    await update(gameRef, {
      currentQuestion: currentQuestionIndex + 1,
      showResults: false
    });
    return { success: true };
  } catch (error) {
    console.error('Error moving to next question:', error);
    return { success: false, error: error.message };
  }
};

// Submit player answer
export const submitAnswer = async (gamePin, playerId, questionIndex, answerIndex, timeElapsed) => {
  try {
    const playerRef = ref(database, `games/${gamePin}/players/${playerId}`);
    const snapshot = await get(playerRef);
    
    if (!snapshot.exists()) {
      return { success: false, error: 'Player not found' };
    }
    
    const playerData = snapshot.val();
    const answers = playerData.answers || {};
    answers[questionIndex] = {
      answerIndex,
      timeElapsed,
      submittedAt: Date.now()
    };
    
    await update(playerRef, { answers });
    return { success: true };
  } catch (error) {
    console.error('Error submitting answer:', error);
    return { success: false, error: error.message };
  }
};

// Update player score
export const updatePlayerScore = async (gamePin, playerId, score) => {
  try {
    const playerRef = ref(database, `games/${gamePin}/players/${playerId}`);
    await update(playerRef, { score });
    return { success: true };
  } catch (error) {
    console.error('Error updating score:', error);
    return { success: false, error: error.message };
  }
};

// End the game
export const endGame = async (gamePin) => {
  try {
    const gameRef = ref(database, `games/${gamePin}`);
    await update(gameRef, {
      status: 'finished',
      finishedAt: Date.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error ending game:', error);
    return { success: false, error: error.message };
  }
};

// Listen to game updates
export const listenToGame = (gamePin, callback) => {
  const gameRef = ref(database, `games/${gamePin}`);
  onValue(gameRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  });
  return () => off(gameRef);
};

// Get game data
export const getGameData = async (gamePin) => {
  try {
    const gameRef = ref(database, `games/${gamePin}`);
    const snapshot = await get(gameRef);
    if (snapshot.exists()) {
      return { success: true, game: snapshot.val() };
    }
    return { success: false, error: 'Game not found' };
  } catch (error) {
    console.error('Error getting game data:', error);
    return { success: false, error: error.message };
  }
};
