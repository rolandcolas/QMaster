import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { listenToGame, nextQuestion, endGame, updatePlayerScore, revealAnswer } from '../services/gameService';

const ANSWER_COLORS = ['#e21b3c', '#1368ce', '#d89e00', '#26890c'];
const ANSWER_LABELS = ['A', 'B', 'C', 'D'];

export default function HostGameScreen({ navigation, route }) {
  const { gamePin, quiz } = route.params;
  const [gameData, setGameData] = useState(null);
  const [currentQuestionData, setCurrentQuestionData] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [answerStats, setAnswerStats] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const unsubscribe = listenToGame(gamePin, (data) => {
      setGameData(data);
      
      if (data.currentQuestion >= 0 && data.currentQuestion < quiz.questions.length) {
        setCurrentQuestionData(quiz.questions[data.currentQuestion]);
        calculateAnswerStats(data);
      }

      if (data.status === 'finished') {
        navigation.replace('GameResults', {
          gamePin,
          quiz,
          isHost: true,
        });
      }
    });

    return () => unsubscribe();
  }, [gamePin]);

  const calculateAnswerStats = (data) => {
    const stats = [0, 0, 0, 0];
    if (data.players) {
      Object.values(data.players).forEach((player) => {
        const answer = player.answers?.[data.currentQuestion];
        if (answer !== undefined && answer.answerIndex !== undefined) {
          stats[answer.answerIndex]++;
        }
      });
    }
    setAnswerStats(stats);
  };

  const calculateScores = () => {
    if (!gameData || !gameData.players) return;

    const currentQ = gameData.currentQuestion;
    const question = quiz.questions[currentQ];
    const maxPoints = 1000;
    const maxTime = question.timeLimit;

    Object.entries(gameData.players).forEach(async ([playerId, player]) => {
      const answer = player.answers?.[currentQ];
      if (!answer) return;

      if (answer.answerIndex === question.correctAnswer) {
        // Calculate points based on speed
        const timeBonus = Math.max(0, (maxTime - answer.timeElapsed) / maxTime);
        const points = Math.round(500 + (500 * timeBonus));
        const newScore = (player.score || 0) + points;
        await updatePlayerScore(gamePin, playerId, newScore);
      }
    });
  };

  const handleShowResults = async () => {
    calculateScores();
    setShowResults(true);
    await revealAnswer(gamePin, true);
  };

  const handleNextQuestion = async () => {
    setShowResults(false);
    const nextQ = gameData.currentQuestion + 1;
    
    if (nextQ >= quiz.questions.length) {
      await endGame(gamePin);
    } else {
      await nextQuestion(gamePin, gameData.currentQuestion);
    }
  };

  if (!gameData || !currentQuestionData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const playersAnswered = gameData.players
    ? Object.values(gameData.players).filter(
        (p) => p.answers?.[gameData.currentQuestion]
      ).length
    : 0;
  const totalPlayers = gameData.players ? Object.keys(gameData.players).length : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>
          Question {gameData.currentQuestion + 1} of {quiz.questions.length}
        </Text>
        <Text style={styles.answerCount}>
          {playersAnswered} / {totalPlayers} answered
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{currentQuestionData.question}</Text>
      </View>

      <View style={styles.answersContainer}>
        {currentQuestionData.options.map((option, index) => {
          const isCorrect = index === currentQuestionData.correctAnswer;
          const count = answerStats[index];
          
          return (
            <View
              key={index}
              style={[
                styles.answerCard,
                { backgroundColor: ANSWER_COLORS[index] },
                showResults && isCorrect && styles.correctAnswer,
              ]}
            >
              <View style={styles.answerContent}>
                <Text style={styles.answerLabel}>{ANSWER_LABELS[index]}</Text>
                <Text style={styles.answerText}>{option}</Text>
              </View>
              {showResults && (
                <View style={styles.statsContainer}>
                  <Text style={styles.statsText}>{count} players</Text>
                  {isCorrect && <Text style={styles.correctBadge}>✓</Text>}
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        {!showResults ? (
          <TouchableOpacity
            style={styles.button}
            onPress={handleShowResults}
          >
            <Text style={styles.buttonText}>Show Results</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleNextQuestion}
          >
            <Text style={styles.buttonText}>
              {gameData.currentQuestion + 1 >= quiz.questions.length
                ? 'End Game'
                : 'Next Question'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  questionNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  answerCount: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  questionContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    minHeight: 120,
    justifyContent: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  answersContainer: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  answerCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
  },
  correctAnswer: {
    borderWidth: 4,
    borderColor: '#fff',
  },
  answerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerLabel: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 16,
    width: 40,
  },
  answerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  correctBadge: {
    fontSize: 24,
    color: '#fff',
  },
  footer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#03dac6',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
