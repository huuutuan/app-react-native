import React, {useState} from 'react'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import { View, TextInput, Button, Text, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';

const ForgotPassword = ({navigation}) => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const handleForgotPassword = async () => {
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			alert('Email đặt lại mật khẩu đã được gửi!');
			
		} catch (error) {
			console.error('Forgot Password Error:', error.message);
		}
	}
  return (
	<KeyboardAvoidingView behavior= {Platform.OS === 'ios' ? 'padding' : 'undefined'} style={styles.container}>
		<Text style={styles.title}>Quên Mật khẩu</Text>
		<TextInput
			style={styles.input}
			placeholder="Email"
			placeholderTextColor="#999"
			keyboardType="email-address"
			autoCapitalize="none"
			value={email}
			onChangeText={setEmail}
		/>
		<Button title="Gửi" onPress={handleForgotPassword} />
		<Button title='Quay lại' onPress={() => navigation.goBack()} />
		{error ? <Text style={styles.error}>{error}</Text> : null}
	</KeyboardAvoidingView>	
		
  )
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	title:{
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	error:{
		color: 'red',
		marginTop: 10,
	},
	input:{
		width: '80%',
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 20,
	},
});

export default ForgotPassword