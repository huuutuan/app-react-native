import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/Home'
import GardenDetail from '../screens/GardenDetail'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from '../screens/SettingScreen';
import DeviceTabScreens from '../screens/DevicesWater/DeviceTabScreens';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={Home}/>
			<Stack.Screen name="GardenDetail" component={GardenDetail} />
			<Stack.Screen name="DevicesWater" component={DeviceTabScreens} options={{headerShown: true}}/>
			{/* <Stack.Screen name="DeviceTabs" component={} */}
		</Stack.Navigator>
	)
}

const AppNavigatior = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
	<Drawer.Screen name="trang chủ" component={HomeStack}/>
	<Drawer.Screen name="Setting" component={SettingScreen} options={{headerShown: true}} />
    </Drawer.Navigator>
  )
}

export default AppNavigatior