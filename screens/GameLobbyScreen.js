import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { listenToGame, startGame } from '../services/gameService';
import { getQuizById } from '../services/quizService';

export default function GameLobbyScreen({ navigation, route }) {
  const { gamePin, quiz, isHost } = route.params;
  const [gameData, setGameData] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToGame(gamePin, (data) => {
      setGameData(data);
      if (data.players) {
        const playersList = Object.values(data.players);
        setPlayers(playersList);
      }

      if (data.status === 'playing') {
        navigation.replace(isHost ? 'HostGame' : 'PlayerGame', {
          gamePin,
          quiz,
          playerId: route.params.playerId,
        });
      }
    });

    return () => unsubscribe();
  }, [gamePin]);

  const handleCopyPin = async () => {
    await Clipboard.setStringAsync(gamePin);
    Alert.alert('Copied!', 'Game PIN copied to clipboard');
  };

  const handleStartGame = async () => {
    if (players.length === 0) {
      Alert.alert('Error', 'Need at least one player to start');
      return;
    }

    const result = await startGame(gamePin);
    if (!result.success) {
      Alert.alert('Error', result.error);
    }
  };

  const renderPlayer = ({ item }) => (
    <View style={styles.playerCard}>
      <View style={styles.playerAvatar}>
        <Text style={styles.playerInitial}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={styles.playerName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{quiz.title}</Text>
        <View style={styles.pinContainer}>
          <Text style={styles.pinLabel}>Game PIN:</Text>
          <Text style={styles.pin}>{gamePin}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyPin}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.waitingText}>
          {isHost ? 'Waiting for players...' : 'Waiting for host to start...'}
        </Text>
      </View>

      <View style={styles.playersSection}>
        <Text style={styles.playersTitle}>
          Players ({players.length})
        </Text>
        <FlatList
          data={players}
          renderItem={renderPlayer}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.playersList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No players yet</Text>
          }
        />
      </View>

      {isHost && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartGame}
          >
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6200ea',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  pinLabel: {
    fontSize: 18,
    color: '#fff',
    marginRight: 12,
  },
  pin: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 12,
  },
  copyButton: {
    backgroundColor: '#03dac6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  waitingText: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  playersSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  playersTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  playersList: {
    paddingBottom: 20,
  },
  playerCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  playerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 40,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  startButton: {
    backgroundColor: '#4caf50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
