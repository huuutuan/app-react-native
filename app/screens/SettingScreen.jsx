import React from 'react'
import { Alert, TouchableOpacity, View, Text } from 'react-native'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

const SettingScreen = () => {
	const handleLogout = async () => {
		Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn đăng xuất?', [
			{text: 'Hủy'},
			{text: 'Đăng xuất', onPress: () => signOut(auth)}
		]);
	}
  // const [gardens, setGardens] = useState([]);
  return (
    <View className="flex-1 justify-center items-center bg-white">
	<Text className = "" >Cài Đặt</Text>
	<TouchableOpacity onPress={handleLogout}>
		<Text>Đăng xuất</Text>
	</TouchableOpacity>
    </View>
  )
}

export default SettingScreen;