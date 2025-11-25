# Sample Quiz Data for Testing

You can use this sample data to quickly test the app without creating quizzes manually.

## Sample Quiz 1: General Knowledge

```javascript
{
  title: "General Knowledge Quiz",
  description: "Test your general knowledge!",
  questions: [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      timeLimit: 20
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      timeLimit: 20
    },
    {
      question: "What is 7 × 8?",
      options: ["54", "56", "64", "72"],
      correctAnswer: 1,
      timeLimit: 15
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2,
      timeLimit: 20
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: 3,
      timeLimit: 20
    }
  ]
}
```

## Sample Quiz 2: JavaScript Basics

```javascript
{
  title: "JavaScript Quiz",
  description: "Test your JavaScript knowledge!",
  questions: [
    {
      question: "Which keyword is used to declare a constant in JavaScript?",
      options: ["var", "let", "const", "static"],
      correctAnswer: 2,
      timeLimit: 15
    },
    {
      question: "What does '===' check in JavaScript?",
      options: ["Value only", "Type only", "Value and type", "Reference"],
      correctAnswer: 2,
      timeLimit: 20
    },
    {
      question: "Which method adds an item to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: 0,
      timeLimit: 15
    }
  ]
}
```

## Sample Quiz 3: Quick Math

```javascript
{
  title: "Quick Math Challenge",
  description: "Speed math questions!",
  questions: [
    {
      question: "15 + 27 = ?",
      options: ["41", "42", "43", "44"],
      correctAnswer: 1,
      timeLimit: 10
    },
    {
      question: "100 ÷ 4 = ?",
      options: ["20", "25", "30", "35"],
      correctAnswer: 1,
      timeLimit: 10
    },
    {
      question: "12 × 12 = ?",
      options: ["124", "134", "144", "154"],
      correctAnswer: 2,
      timeLimit: 10
    },
    {
      question: "50 - 17 = ?",
      options: ["31", "32", "33", "34"],
      correctAnswer: 2,
      timeLimit: 10
    },
    {
      question: "9² = ?",
      options: ["79", "80", "81", "82"],
      correctAnswer: 2,
      timeLimit: 10
    }
  ]
}
```

## How to Use This Data

You can't directly import this into the app, but you can:

1. **Manually create these quizzes** using the app interface
2. **Use as reference** when creating your own quizzes
3. **Modify the questions** to suit your needs

## Creating Sample Data Programmatically (Advanced)

If you want to add sample quizzes programmatically, you can temporarily add this code to `HomeScreen.js`:

```javascript
import { createQuiz } from '../services/quizService';

// Add this function
const createSampleQuizzes = async () => {
  const sampleQuiz = {
    title: "General Knowledge Quiz",
    description: "Test your general knowledge!",
    questions: [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        timeLimit: 20
      },
      // ... add more questions
    ]
  };
  
  await createQuiz(sampleQuiz);
  alert('Sample quiz created!');
};

// Add a button in the UI to call this function
```

Remember to remove this code after testing!
