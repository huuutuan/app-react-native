import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

//firebase
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './app/firebase/config';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import LoginScreen from './app/screens/LoginScreen';
import Home from './app/screens/Home';
import Register from './app/screens/Register';
import FogotPassword from './app/screens/FogotPassword';

const Stack = createNativeStackNavigator();

if (!getApps().length) {
  initializeApp(firebaseConfig);
} else {
  getApp(); // if already initialized, use that one
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register}  />
        <Stack.Screen name="ForgotPassword" component={FogotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


