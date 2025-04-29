import react, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';


const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleRegister = () => {
		try {
			navigation.navigate('Register'); // Navigate to Register screen
		} catch (error) {
			console.error('Register Error:', error.message);
		}

	}

	const handleLogin = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			console.log('User logged in:', userCredential.user);
			
			alert('Login successful!');
			navigation.navigate('Home'); // Navigate to Home screen after successful login
		} catch (error) {
			console.error('Login Error:', error.message);
			// Kiểm tra và xử lý lỗi
			if (error.code === 'auth/invalid-email') {
				alert('Lỗi', 'Địa chỉ email không hợp lệ');
			} else if (error.code === 'auth/wrong-password') {
				alert('Lỗi', 'Mật khẩu không đúng');
			} else if (error.code === 'auth/user-not-found') {
				alert('Lỗi', 'Không tìm thấy người dùng');
			} else {
				alert('Lỗi', error.message); // Hiển thị các lỗi khác
				
			}
		}
	};

	return (
		// <View style={styles.container}>
		// 	<TextInput 
		// 		style={styles.input}
		// 		placeholder="Email"
		// 		value={email}
		// 		onChangeText={setEmail}
		// 	/>
		// 	<TextInput 
		// 		style={styles.input}
		// 		placeholder="Password"
		// 		value={password}
		// 		onChangeText={setPassword}
		// 		secureTextEntry
		// 	/>
		// 	{error ? <Text style={styles.error}>{error}</Text> : null}
		// 	<Button title="Login" onPress={handleLogin} />
		// 	<Button title="Register" onPress={() => navigation.navigate('Register')} />
		// </View>
		<KeyboardAvoidingView
		style={styles.container}
		behavior={Platform.OS === 'ios' ? 'padding' : undefined}
	      >
		<Text style={styles.title}>Đăng nhập</Text>
	  
		<TextInput
		  style={styles.input}
		  placeholder="Email"
		  placeholderTextColor="#999"
		  keyboardType="email-address"
		  autoCapitalize="none"
		  value={email}
		  onChangeText={setEmail}
		/>
	  
		<TextInput
		  style={styles.input}
		  placeholder="Mật khẩu"
		  placeholderTextColor="#999"
		  secureTextEntry
		  value={password}
		  onChangeText={setPassword}
		/>
	  
		<TouchableOpacity style={styles.button} onPress={handleLogin}>
		  <Text style={styles.buttonText}>Đăng nhập</Text>
		</TouchableOpacity>
	  
		<TouchableOpacity onPress={handleRegister}>
		  <Text style={styles.link}>Chưa có tài khoản? Đăng ký ngay</Text>
		</TouchableOpacity>
		<TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
		  <Text style={styles.link}>Quên mật khẩu?</Text>
		</TouchableOpacity>
	      </KeyboardAvoidingView>
	)
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fefefe',
	  alignItems: 'center',
	  justifyContent: 'center',
	  paddingHorizontal: 24,
	},
	title: {
	  fontSize: 28,
	  fontWeight: 'bold',
	  color: '#333',
	  marginBottom: 32,
	},
	input: {
	  width: '100%',
	  height: 48,
	  backgroundColor: '#f2f2f2',
	  borderRadius: 10,
	  paddingHorizontal: 16,
	  marginBottom: 16,
	  fontSize: 16,
	  color: '#000',
	},
	button: {
	  width: '100%',
	  height: 48,
	  backgroundColor: '#5A67D8',
	  borderRadius: 10,
	  justifyContent: 'center',
	  alignItems: 'center',
	  marginTop: 8,
	},
	buttonText: {
	  color: '#fff',
	  fontWeight: '600',
	  fontSize: 16,
	},
	link: {
	  marginTop: 16,
	  color: '#5A67D8',
	  fontSize: 14,
	},
      });

export default LoginScreen;