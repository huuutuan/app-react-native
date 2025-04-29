import React, { useState } from 'react'
import { View, Text, TextInput, Pressable,  Modal } from 'react-native';

const AddDeviceIdModal = ({ visible, onClose, onAdd, gardenId }) => {
	const [deviceId, setDeviceId] = useState("");

  return (
	<Modal visible={visible} animationType={'fade'} transparent onRequestClose={onClose}>
		<View className="flex-1 bg-black/50 justify-center items-center">
			<View className="bg-white w-11/12 p-6 rounded-2xl shadow-lg">
				<Text className="text-xl font-bold text-center mb-4">Thêm thiết bị</Text>
				<TextInput 
					    className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-base"
					    placeholder="Id thiết bị"
					    value={deviceId}
					    onChangeText={setDeviceId}
				/>
				<Pressable
					className='bg-blue-500 rounded-xl py-3 mb-2'
					onPress={() => {
						if (!deviceId.trim()) {
							alert('Vui lòng nhập ID thiết bị hợp lệ!');
							return;
						}
						onAdd(gardenId, deviceId.trim());
						setDeviceId("");
					}}
				>
					<Text className="text-white text-center font-semibold">Thêm</Text>
				
				</Pressable>
				<Pressable
					onPress={() => {
						setDeviceId("");
						onClose();
					}
					}
					className="bg-gray-300 rounded-xl py-3"
				>
					<Text className="text-center font-semibold text-gray-800">
					      Huỷ
					</Text>
				</Pressable>
			</View>
		</View>
	</Modal>
    
  )
}

export default AddDeviceIdModal