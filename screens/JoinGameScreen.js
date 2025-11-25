import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { joinGame, getGameData } from '../services/gameService';
import { getQuizById } from '../services/quizService';

export default function JoinGameScreen({ navigation }) {
  const [gamePin, setGamePin] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoinGame = async () => {
    if (!gamePin.trim() || !playerName.trim()) {
      Alert.alert('Error', 'Please enter both game PIN and your name');
      return;
    }

    setLoading(true);

    // First check if game exists
    const gameResult = await getGameData(gamePin.trim());
    if (!gameResult.success) {
      setLoading(false);
      Alert.alert('Error', 'Game not found');
      return;
    }

    // Get quiz data
    const quizResult = await getQuizById(gameResult.game.quizId);
    if (!quizResult.success) {
      setLoading(false);
      Alert.alert('Error', 'Quiz not found');
      return;
    }

    // Join the game
    const joinResult = await joinGame(gamePin.trim(), playerName.trim());
    setLoading(false);

    if (joinResult.success) {
      navigation.navigate('GameLobby', {
        gamePin: gamePin.trim(),
        quiz: quizResult.quiz,
        isHost: false,
        playerId: joinResult.playerId,
      });
    } else {
      Alert.alert('Error', joinResult.error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Join a Game</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Game PIN</Text>
          <TextInput
            style={styles.input}
            value={gamePin}
            onChangeText={setGamePin}
            placeholder="Enter 6-digit PIN"
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            value={playerName}
            onChangeText={setPlayerName}
            placeholder="Enter your name"
            autoCapitalize="words"
          />
        </View>

        <TouchableOpacity
          style={[styles.joinButton, loading && styles.joinButtonDisabled]}
          onPress={handleJoinGame}
          disabled={loading}
        >
          <Text style={styles.joinButtonText}>
            {loading ? 'Joining...' : 'Join Game'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6200ea',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
  },
  joinButton: {
    backgroundColor: '#03dac6',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  joinButtonDisabled: {
    opacity: 0.6,
  },
  joinButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
