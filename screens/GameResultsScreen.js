import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { getGameData } from '../services/gameService';

export default function GameResultsScreen({ navigation, route }) {
  const { gamePin, quiz, isHost, playerId } = route.params;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    const result = await getGameData(gamePin);
    if (result.success && result.game.players) {
      const playersList = Object.values(result.game.players)
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .map((player, index) => ({
          ...player,
          rank: index + 1,
        }));
      setResults(playersList);
    }
    setLoading(false);
  };

  const renderPlayerResult = ({ item }) => {
    const isCurrentPlayer = item.id === playerId;
    const medalEmoji = item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : '';

    return (
      <View style={[styles.resultCard, isCurrentPlayer && styles.currentPlayerCard]}>
        <View style={styles.rankContainer}>
          <Text style={styles.rank}>
            {medalEmoji || `#${item.rank}`}
          </Text>
        </View>
        <View style={styles.playerInfo}>
          <Text style={[styles.playerName, isCurrentPlayer && styles.currentPlayerText]}>
            {item.name}
            {isCurrentPlayer && ' (You)'}
          </Text>
          <Text style={styles.answersInfo}>
            {Object.keys(item.answers || {}).length} / {quiz.questions.length} answered
          </Text>
        </View>
        <Text style={[styles.score, isCurrentPlayer && styles.currentPlayerText]}>
          {item.score || 0}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Results</Text>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
      </View>

      <FlatList
        data={results}
        renderItem={renderPlayerResult}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
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
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  quizTitle: {
    fontSize: 18,
    color: '#e0e0e0',
  },
  listContainer: {
    padding: 20,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPlayerCard: {
    backgroundColor: '#03dac6',
    borderWidth: 3,
    borderColor: '#fff',
  },
  rankContainer: {
    width: 60,
    alignItems: 'center',
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  currentPlayerText: {
    color: '#000',
  },
  answersInfo: {
    fontSize: 14,
    color: '#666',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  footer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ea',
  },
});
