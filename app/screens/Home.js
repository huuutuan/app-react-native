import React from 'react'
import { View, Text, Button } from 'react-native';
import { getAuth } from 'firebase/auth';


const Home = ( {navigation} ) => {
	const handleLogout = async () => {
		const auth = getAuth();
		try {
		  await auth.signOut();
		  alert('Đăng xuất thành công!');
		  // Quay lại màn hình đăng nhập sau khi đăng xuất
		  navigation.navigate('Login');
		} catch (err) {
			console.error('Logout Error:', err.message);
		 	alert('Có lỗi xảy ra khi đăng xuất');
		}
	      };
	    
	      return (
		<View>
		  <Text>Chào mừng bạn đến với ứng dụng của chúng tôi!</Text>
		  <Button title="Đăng xuất" onPress={handleLogout} />
		</View>
	      );
}

export default Home;