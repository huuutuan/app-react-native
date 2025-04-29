import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { auth } from '../firebase/config';
import AddGardenModal from '../components/AddGardenModal';
import GardenCard from '../components/GardenCard';
import { getGardens, addGarden, deleteGarden } from '../services/gardenService';
import { Ionicons } from '@expo/vector-icons';


const dummyGardens = [
	{ id: 1, name: 'Vườn 1', location: 'Địa điểm 1', createdAt: '2025-10-01' },
	{ id: 2, name: 'Vườn 2', location: 'Địa điểm 2' , createdAt: '2025-10-01'},
];

const Home = ( {navigation} ) => {
	
	const [modalAddGardenVisible, setModalAddGardenVisible] = useState(false);
	const [gardens, setGardens] = useState([]);
	const handleLogout = async () => {
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
	const handleGardenPress = (garden) => {
		try {
			navigation.navigate('GardenDetail', { garden });
		      } catch (err) {
			console.error('Navigate Error:', err.message);
			alert('Có lỗi xảy ra khi mở chi tiết vườn!');
		      }
	      };
	
	const handleAddGarden = async (garden) => {
		const gardenId = await addGarden(garden);
		setGardens((prevGardens) => [...prevGardens, {...garden, id: gardenId }]);
		console.log(gardens);
		setModalAddGardenVisible(false);
	      }
	const handleDeleteGarden = async (id) => {
		await deleteGarden(id);
		setGardens((prevGardens) => prevGardens.filter((garden) => garden.id !== id));
		console.log(gardens);
		
	      }
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			title: 'Danh sách vườn',
			headerStyle: {
				backgroundColor: '#fff',
			},
			headerTintColor: "#000",
			headerTitleStyle: {
				fontSize: 20,
				fontWeight: 'bold',
			},
			headerTitleAlign: 'center',
			headerRight:() => (
				<TouchableOpacity onPress={() => setModalAddGardenVisible(true)}>
					<Ionicons name='add-circle' size={24} color="black" className="mr-4" />
				</TouchableOpacity>
			),
			headerLeft: () => (
				<TouchableOpacity onPress={() => navigation.openDrawer()} className ="ml-4" >
					<Ionicons name ="menu" size={24} color="black" />
				</TouchableOpacity>
			)
		})
	})

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getGardens().then(setGardens);
			
		});
		return unsubscribe;
		
		
	}, [navigation])
	
	      return (
			<View>				
				{(() => {
				try {
				return (
					<AddGardenModal
					visible={modalAddGardenVisible}
					onClose={() => setModalAddGardenVisible(false)}
					onAdd={handleAddGarden}
					/>
				);
				} catch (error) {
				console.error('Lỗi khi render AddGardenModal:', error);
				return (
					<Text style={{ color: 'red', margin: 10 }}>
					Đã xảy ra lỗi khi hiển thị modal!
					</Text>
				);
				}
				})()}

				<FlatList 
					data={gardens}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<GardenCard
							handleDeleteGarden={handleDeleteGarden}
							garden={item}
							onPress={() => handleGardenPress(item)}
						/>
					)}
				>
				</FlatList>
			</View>
			
	      );
}



export default Home;