import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import LoginScreen from '../screens/LoginScreen';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import Home from '../screens/Home';
import GardenDetail from '../screens/GardenDetail';
import { Text, ActivityIndicator, View } from 'react-native';

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> 
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
    </Stack.Navigator>
  );
}
