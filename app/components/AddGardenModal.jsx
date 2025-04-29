import React, { useState } from 'react'
import { View, Text, TextInput, Pressable,  Modal } from 'react-native';


const AddGardenModal = ({ visible, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleAdd = () => {
    if (!name || !location) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    const garden = {
      name,
      location,
      deviceIds: [],
      createdAt: new Date().toISOString(),
    }

    onAdd(garden);
    setName('');
    setLocation('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-11/12 p-6 rounded-2xl shadow-lg">
          <Text className="text-xl font-bold text-center mb-4">Thêm vườn</Text>
          <TextInput 
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-base"
            placeholder="Tên vườn"
            value={name}
            onChangeText={setName}
          />
          <TextInput 
            className="border border-gray-300 rounded-lg px-4 py-2 mb-6 text-base"
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          <Pressable
            className='bg-blue-500 rounded-xl py-3 mb-2'
            onPress={handleAdd}
          >
            <Text className="text-white text-center font-semibold">Thêm</Text>

          </Pressable>
          <Pressable
            onPress={onClose}
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

export default AddGardenModal