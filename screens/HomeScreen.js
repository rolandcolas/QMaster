import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { Audio } from 'expo-av';

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.3)).current;
  const button1Slide = useRef(new Animated.Value(50)).current;
  const button2Slide = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Animated background circles
  const circle1 = useRef(new Animated.Value(0)).current;
  const circle2 = useRef(new Animated.Value(0)).current;
  const circle3 = useRef(new Animated.Value(0)).current;

  // Button press animations
  const button1Scale = useRef(new Animated.Value(1)).current;
  const button2Scale = useRef(new Animated.Value(1)).current;

  // Background music
  const [sound, setSound] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [clickSound, setClickSound] = useState(null);

  useEffect(() => {
    // Configure audio mode to allow mixing
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
    });

    // Auto-play background music
    const loadBackgroundMusic = async () => {
      try {
        const { sound: bgSound } = await Audio.Sound.createAsync(
          require('../assets/audio/doja.mp3'),
          { shouldPlay: true, isLooping: true, volume: 0.3 }
        );
        setSound(bgSound);
        setIsMusicPlaying(true);
      } catch (error) {
        console.log('Background music not found');
      }
    };
    loadBackgroundMusic();

    // Load click sound effect (optional)
    const loadClickSound = async () => {
      try {
        const { sound: clickSnd } = await Audio.Sound.createAsync(
          require('../assets/audio/click.mp3'),
          { volume: 1.0 },
          null,
          true
        );
        await clickSnd.setStatusAsync({ shouldPlay: false });
        setClickSound(clickSnd);
      } catch (error) {
        console.log('Click sound not found - buttons will work without sound');
      }
    };
    loadClickSound();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Title scale animation
    Animated.spring(titleScale, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Button slide animations
    Animated.stagger(200, [
      Animated.spring(button1Slide, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(button2Slide, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating circles animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(circle1, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        }),
        Animated.timing(circle1, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(circle2, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(circle2, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(circle3, {
          toValue: 1,
          duration: 12000,
          useNativeDriver: true,
        }),
        Animated.timing(circle3, {
          toValue: 0,
          duration: 12000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (clickSound) {
        clickSound.unloadAsync();
      }
    };
  }, [sound, clickSound]);

  const toggleMusic = async () => {
    if (sound) {
      if (isMusicPlaying) {
        await sound.pauseAsync();
        setIsMusicPlaying(false);
      } else {
        await sound.playAsync();
        setIsMusicPlaying(true);
      }
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../assets/audio/doja.mp3'),
        { shouldPlay: true, isLooping: true, volume: 0.3 }
      );
      setSound(newSound);
      setIsMusicPlaying(true);
    }
  };

  const circle1TranslateY = circle1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  const circle2TranslateY = circle2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const circle3TranslateY = circle3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  const circle1Scale = circle1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  const circle2Scale = circle2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.8, 1],
  });

  const handleButton1PressIn = () => {
    Animated.spring(button1Scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButton1PressOut = () => {
    Animated.spring(button1Scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleButton2PressIn = () => {
    Animated.spring(button2Scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButton2PressOut = () => {
    Animated.spring(button2Scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const playClickSound = async () => {
    if (clickSound) {
      try {
        const status = await clickSound.getStatusAsync();
        if (status.isLoaded) {
          await clickSound.setPositionAsync(0);
          await clickSound.playAsync();
        }
      } catch (error) {
        console.log('Error playing click sound:', error);
      }
    }
  };

  const handleCreateQuizPress = () => {
    playClickSound();
    navigation.navigate('QuizManagement');
  };

  const handleJoinGamePress = () => {
    playClickSound();
    navigation.navigate('JoinGame');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated background circles */}
      <Animated.View
        style={[
          styles.circle1,
          {
            transform: [
              { translateY: circle1TranslateY },
              { scale: circle1Scale },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle2,
          {
            transform: [
              { translateY: circle2TranslateY },
              { scale: circle2Scale },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle3,
          {
            transform: [{ translateY: circle3TranslateY }],
          },
        ]}
      />

      {/* Music Toggle Button */}
      <TouchableOpacity
        style={styles.musicButton}
        onPress={toggleMusic}
        activeOpacity={0.7}
      >
        <Text style={styles.musicButtonText}>
          {isMusicPlaying ? '🔊' : '🔇'}
        </Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.7}
      >
        <Text style={styles.profileButtonText}>👤</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.View style={{ transform: [{ scale: titleScale }] }}>
          <Text style={styles.title}>QuizMaster</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Text style={styles.subtitle}>Interactive Quiz Game</Text>
        </Animated.View>
        
        <View style={styles.buttonContainer}>
          <Animated.View
            style={{
              transform: [
                { translateY: button1Slide },
                { scale: button1Scale },
              ],
              width: '100%',
            }}
          >
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleCreateQuizPress}
              onPressIn={handleButton1PressIn}
              onPressOut={handleButton1PressOut}
              activeOpacity={1}
            >
              <Text style={styles.buttonText}>Create & Manage Quizzes</Text>
              <Text style={styles.buttonEmoji}>📝</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              transform: [
                { translateY: button2Slide },
                { scale: button2Scale },
              ],
              width: '100%',
            }}
          >
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleJoinGamePress}
              onPressIn={handleButton2PressIn}
              onPressOut={handleButton2PressOut}
              activeOpacity={1}
            >
              <Text style={styles.buttonText}>Join Game</Text>
              <Text style={styles.buttonEmoji}>🎮</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a148c',
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(187, 134, 252, 0.3)',
    top: -100,
    right: -50,
  },
  circle2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(3, 218, 198, 0.2)',
    bottom: -80,
    left: -60,
  },
  circle3: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(187, 134, 252, 0.25)',
    top: '40%',
    left: -100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 20,
    color: '#e0e0e0',
    marginBottom: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
  },
  button: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButton: {
    backgroundColor: '#03dac6',
  },
  secondaryButton: {
    backgroundColor: '#bb86fc',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  buttonEmoji: {
    fontSize: 24,
  },
  musicButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(3, 218, 198, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  musicButtonText: {
    fontSize: 28,
  },
  profileButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(187, 134, 252, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  profileButtonText: {
    fontSize: 28,
  },
});
