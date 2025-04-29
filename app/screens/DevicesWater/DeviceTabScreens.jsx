import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChartScreen from './ChartScreen'
import PumpScreen from './PumpScreen'
import {Ionicons} from '@expo/vector-icons'


const iconMap = {
  'temperature': {focused: 'thermometer', unfocused: 'thermometer-outline'},
  'humidity': {focused: 'rainy', unfocused: 'rainy-outline'},
  'soilMoisture': {focused: 'water', unfocused: 'water-outline'},
  'settings': {focused: 'settings', unfocused: 'settings-outline'},
}

const Tab = createBottomTabNavigator()

const DeviceTabScreens = () => {
  
 
  
  return (
    

    <Tab.Navigator 
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const iconName = iconMap[route.name];
          const icon = focused ? iconName.focused : iconName.unfocused;
          size = focused ? size + 4 : size;
          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#34D399',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
      

      

    >
      <Tab.Screen name="temperature" component={ChartScreen} options={{ headerShown: false }} />
      <Tab.Screen name="humidity" component={ChartScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="soilMoisture" component={ChartScreen} options={{ headerShown: false }} />
      <Tab.Screen name="settings" component={PumpScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default DeviceTabScreens