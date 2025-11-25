import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBTEW4N4qGPEVBfs70EqDtFX8wLZQQmIco",
  authDomain: "quizmaster-app-34b08.firebaseapp.com",
  databaseURL: "https://quizmaster-app-34b08-default-rtdb.firebaseio.com",
  projectId: "quizmaster-app-34b08",
  storageBucket: "quizmaster-app-34b08.firebasestorage.app",
  messagingSenderId: "387913824816",
  appId: "1:387913824816:web:10d7ad97a95460156bcbf5"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
