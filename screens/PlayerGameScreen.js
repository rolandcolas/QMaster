import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { listenToGame, submitAnswer } from '../services/gameService';

const ANSWER_COLORS = ['#e21b3c', '#1368ce', '#d89e00', '#26890c'];
const ANSWER_LABELS = ['A', 'B', 'C', 'D'];

export default function PlayerGameScreen({ navigation, route }) {
  const { gamePin, quiz, playerId } = route.params;
  const [gameData, setGameData] = useState(null);
  const [currentQuestionData, setCurrentQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const unsubscribe = listenToGame(gamePin, (data) => {
      setGameData(data);
      
      if (data.currentQuestion >= 0 && data.currentQuestion < quiz.questions.length) {
        const questionData = quiz.questions[data.currentQuestion];
        setCurrentQuestionData(questionData);
        setTimeLeft(questionData.timeLimit);
        setStartTime(Date.now());
        setSelectedAnswer(null);
      }

      if (data.status === 'finished') {
        navigation.replace('GameResults', {
          gamePin,
          quiz,
          isHost: false,
          playerId,
        });
      }
    });

    return () => unsubscribe();
  }, [gamePin]);

  useEffect(() => {
    if (!currentQuestionData || selectedAnswer !== null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionData, selectedAnswer]);

  const handleAnswerSelect = async (answerIndex) => {
    if (selectedAnswer !== null || timeLeft <= 0) return;

    const timeElapsed = Math.round((Date.now() - startTime) / 1000);
    setSelectedAnswer(answerIndex);

    await submitAnswer(gamePin, playerId, gameData.currentQuestion, answerIndex, timeElapsed);
  };

  if (!gameData || !currentQuestionData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Waiting for next question...</Text>
      </View>
    );
  }

  const playerData = gameData.players?.[playerId];
  const hasAnswered = playerData?.answers?.[gameData.currentQuestion] !== undefined;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>
          Question {gameData.currentQuestion + 1} of {quiz.questions.length}
        </Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{timeLeft}s</Text>
        </View>
        <Text style={styles.score}>Score: {playerData?.score || 0}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{currentQuestionData.question}</Text>
      </View>

      {hasAnswered ? (
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingText}>✓ Answer submitted!</Text>
          <Text style={styles.waitingSubtext}>
            Waiting for other players...
          </Text>
        </View>
      ) : timeLeft <= 0 ? (
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingText}>Time's up!</Text>
          <Text style={styles.waitingSubtext}>
            Waiting for other players...
          </Text>
        </View>
      ) : (
        <View style={styles.answersContainer}>
          {currentQuestionData.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                { backgroundColor: ANSWER_COLORS[index] },
                selectedAnswer === index && styles.selectedAnswer,
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.answerLabel}>{ANSWER_LABELS[index]}</Text>
              <Text style={styles.answerText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6200ea',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ea',
  },
  loadingText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  timerContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  score: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  questionContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    minHeight: 100,
    justifyContent: 'center',
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  answersContainer: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  answerButton: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedAnswer: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  answerLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 16,
    width: 50,
  },
  answerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  waitingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  waitingSubtext: {
    fontSize: 18,
    color: '#e0e0e0',
    textAlign: 'center',
  },
});
