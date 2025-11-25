import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Import screens
import HomeScreen from './screens/HomeScreen';
import QuizListScreen from './screens/QuizListScreen';
import CreateQuizScreen from './screens/CreateQuizScreen';
import EditQuizScreen from './screens/EditQuizScreen';
import HostGameScreen from './screens/HostGameScreen';
import JoinGameScreen from './screens/JoinGameScreen';
import PlayerGameScreen from './screens/PlayerGameScreen';
import GameLobbyScreen from './screens/GameLobbyScreen';
import GameResultsScreen from './screens/GameResultsScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function QuizManagementStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="QuizList" 
        component={QuizListScreen}
        options={{ title: 'My Quizzes' }}
      />
      <Stack.Screen 
        name="CreateQuiz" 
        component={CreateQuizScreen}
        options={{ title: 'Create Quiz' }}
      />
      <Stack.Screen 
        name="EditQuiz" 
        component={EditQuizScreen}
        options={{ title: 'Edit Quiz' }}
      />
    </Stack.Navigator>
  );
}

// Auth Stack for Login/Signup
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Main App Stack for authenticated users
function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="QuizManagement" 
        component={QuizManagementStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="JoinGame" 
        component={JoinGameScreen}
        options={{ title: 'Join Game' }}
      />
      <Stack.Screen 
        name="GameLobby" 
        component={GameLobbyScreen}
        options={{ title: 'Game Lobby' }}
      />
      <Stack.Screen 
        name="HostGame" 
        component={HostGameScreen}
        options={{ title: 'Host Game' }}
      />
      <Stack.Screen 
        name="PlayerGame" 
        component={PlayerGameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="GameResults" 
        component={GameResultsScreen}
        options={{ title: 'Results' }}
      />
    </Stack.Navigator>
  );
}

// Navigation wrapper with auth check
function Navigation() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4a148c' }}>
        <ActivityIndicator size="large" color="#03dac6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
