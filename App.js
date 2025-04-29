import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from 'react';

//firebase
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './app/firebase/config';
import { auth } from './app/firebase/config';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import LoginScreen from './app/screens/LoginScreen';
import Home from './app/screens/Home';
import Register from './app/screens/Register';
import ForgotPassword from './app/screens/ForgotPassword';
import AuthNavigator from './app/navigation/AuthNavigator';
import "./global.css"
import { useAuthState } from 'react-firebase-hooks/auth';
import AppNavigatior from './app/navigation/AppNavigatior';
import { DeviceProvider } from './app/context/DeviceContext';

const Stack = createNativeStackNavigator();


export default function App() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
    console.log('User state changed:', user);
    });
    return unsubscribe;
  }, []);

  if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#5A67D8" />
        </View>
      )
    }
  
    if (error) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">Có lỗi xảy ra: {error.message}</Text>
        </View>
      )
    }

  return (
    <DeviceProvider>

    <NavigationContainer> 
      {/* <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={FogotPassword} options={{ headerShown: false}} />
        </Stack.Navigator> */}
      { user ? <AppNavigatior /> : <AuthNavigator/>}
      
    </NavigationContainer>
    </DeviceProvider>
  );
}


