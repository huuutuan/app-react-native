import React, {useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { View, TextInput, Button, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Register = ({navigation}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [error, setError] = useState('');

	const handleRegister = async () => {
		if (!/\S+@\S+\.\S+/.test(email)) {
			alert('Email không hợp lệ');
			return;
		}
		if (password.length < 6) {
			alert('Lỗi', 'Mật khẩu phải ít nhất 6 ký tự');
			return;
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			console.log('User registered:', user);
			alert('Đăng ký thành công!');
			await setDoc(doc(db, 'users', user.uid), {
				name: name,
				phone: phone,
				email: email,
				createdAt: serverTimestamp(),
			}); // Lưu thông tin người dùng vào Firestore
			
			 // Navigate to Login screen after successful registration
			
		} catch (error) {
			console.error('Register Error:', error.message);
			// Kiểm tra và xử lý lỗi
			if (error.code === 'auth/email-already-in-use') {
				alert('Lỗi', 'Email đã được sử dụng');
			} else {
				alert('Lỗi', error.message); // Hiển thị các lỗi khác
			}
		}
	}
  return (
    <KeyboardAvoidingView behavior= {Platform.OS === 'ios' ? 'padding' : 'undefined'} style={styles.container}>
	<Text style={styles.title}>Đăng ký</Text>
	<TextInput
		style={styles.input}
		placeholder="Name"
		placeholderTextColor="#999"
		autoCapitalize="none"
		value={name}
		onChangeText={setName}
	/>
	<TextInput
		style={styles.input}
		placeholder="Phone"
		placeholderTextColor="#999"
		autoCapitalize="none"
		value={phone}
		onChangeText={setPhone}
	/>
	<TextInput
		style={styles.input}
		placeholder="Email"
		placeholderTextColor="#999"
		autoCapitalize="none"
		value={email}
		onChangeText={setEmail}
	/>
	<TextInput 
		style={styles.input}
		placeholder='Mật khẩu'
		placeholderTextColor='#999'
		secureTextEntry
		value={password}
		onChangeText={setPassword}
	/>
	<TouchableOpacity style = {styles.button} onPress={handleRegister}>
		<Text style= {styles.buttonText} >Tạo tài khoản </Text>
	</TouchableOpacity>

	<TouchableOpacity onPress={() => navigation.navigate('Login')}>
		<Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
	</TouchableOpacity>
	</KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fefefe',
		paddingHorizontal:24,
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
		borderColor: '#f2f2f2',
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

export default Register