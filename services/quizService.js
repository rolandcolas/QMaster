import { database } from '../config/firebase';
import { ref, set, get, update, remove, push, onValue, off, query, orderByChild, equalTo } from 'firebase/database';

// Create a new quiz
export const createQuiz = async (quizData, userId) => {
  try {
    const quizRef = push(ref(database, 'quizzes'));
    const quiz = {
      id: quizRef.key,
      title: quizData.title,
      description: quizData.description || '',
      questions: quizData.questions || [],
      createdBy: userId,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    await set(quizRef, quiz);
    return { success: true, id: quizRef.key, quiz };
  } catch (error) {
    console.error('Error creating quiz:', error);
    return { success: false, error: error.message };
  }
};

// Get all quizzes
export const getAllQuizzes = async () => {
  try {
    const quizzesRef = ref(database, 'quizzes');
    const snapshot = await get(quizzesRef);
    if (snapshot.exists()) {
      const quizzes = [];
      snapshot.forEach((child) => {
        quizzes.push(child.val());
      });
      return { success: true, quizzes };
    }
    return { success: true, quizzes: [] };
  } catch (error) {
    console.error('Error getting quizzes:', error);
    return { success: false, error: error.message };
  }
};

// Get quizzes by user ID
export const getUserQuizzes = async (userId) => {
  try {
    const quizzesRef = ref(database, 'quizzes');
    const snapshot = await get(quizzesRef);
    if (snapshot.exists()) {
      const quizzes = [];
      snapshot.forEach((child) => {
        const quiz = child.val();
        if (quiz.createdBy === userId) {
          quizzes.push(quiz);
        }
      });
      return { success: true, quizzes };
    }
    return { success: true, quizzes: [] };
  } catch (error) {
    console.error('Error getting user quizzes:', error);
    return { success: false, error: error.message };
  }
};

// Get a single quiz by ID
export const getQuizById = async (quizId) => {
  try {
    const quizRef = ref(database, `quizzes/${quizId}`);
    const snapshot = await get(quizRef);
    if (snapshot.exists()) {
      return { success: true, quiz: snapshot.val() };
    }
    return { success: false, error: 'Quiz not found' };
  } catch (error) {
    console.error('Error getting quiz:', error);
    return { success: false, error: error.message };
  }
};

// Update a quiz
export const updateQuiz = async (quizId, updates) => {
  try {
    const quizRef = ref(database, `quizzes/${quizId}`);
    const updatedData = {
      ...updates,
      updatedAt: Date.now()
    };
    await update(quizRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error('Error updating quiz:', error);
    return { success: false, error: error.message };
  }
};

// Delete a quiz
export const deleteQuiz = async (quizId) => {
  try {
    const quizRef = ref(database, `quizzes/${quizId}`);
    await remove(quizRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return { success: false, error: error.message };
  }
};
