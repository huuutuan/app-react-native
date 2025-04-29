import React, { useEffect, useLayoutEffect, useState } from 'react'
import { use } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native'
import { addDevice, listenToDevicesbyGarden, removeDevice } from '../services/deviceService';
import { useDevice } from '../context/DeviceContext';
import AddDeviceIdModal from '../components/AddDeviceIdModal';
import AddGardenModal from '../components/AddGardenModal';
import { Ionicons } from '@expo/vector-icons';
import { getDoc,doc } from 'firebase/firestore';
import { db } from '../firebase/config';






const GardenDetail = ({route, navigation}) => {
	const [garden, setGarden] = useState(route.params.garden)// Lấy thông tin vườn từ params
  const [devices, setDevices] =  useState([]);
  const {setDevice} = useDevice();
  const [modalAddDeviceID, setModalAddDeviceID] = useState(false);


  useEffect(() => {
    if (!Array.isArray(garden.deviceIds) || garden.deviceIds.length === 0) {
      setDevices([]); // Đặt danh sách thiết bị thành rỗng nếu không có deviceIds
      return;
    }
    const unsubscribe = listenToDevicesbyGarden(garden.id, setDevices, garden.deviceIds);
    
    return () => {
      unsubscribe(); // Dọn dẹp khi component unmount
    }
  }, [garden.deviceIds]);





  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: garden.name,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalAddDeviceID(true)} >
          <Ionicons name='add-circle' size={24} color="black" className="mr-4" ></Ionicons>
        </TouchableOpacity>
      )
    });

  })

  const handleAddDevice = async (gardenId, deviceId) => {
    try {
      if (garden.deviceIds.includes(deviceId)) {
        alert('Thiết bị này đã tồn tại trong vườn!');
        return;
      }
      const deviceRef = doc(db, 'devices', deviceId);
      // const deviceSnap = await getDoc(deviceRef);
      // if (!deviceSnap.exists()) {
      //   alert('Thiết bị không tồn tại!');
      //   return;
      // }
      
      await addDevice(gardenId,deviceId);
      setDevices((prevDevices) => [...prevDevices, devices]);
      setGarden((prevGarden) => ({
        ...prevGarden,
        deviceIds: [...prevGarden.deviceIds, deviceId]
      }));
      setModalAddDeviceID(false)
      console.log('thiet bi: ', devices);
      
    } catch (error) {
      console.error('Lỗi khi thêm thiết bị:', error);
      alert('Không thể thêm thiết bị. Vui lòng thử lại!');
    }
    
  }

  const handleDeleteDevice = (item) => {
    try {
      
      removeDevice(garden.id, item.deviceId);
      setDevices((prevDevices) => 
         prevDevices.filter(device => device.deviceId !== item.deviceId));
      setGarden((prevGarden) => ({
        ...prevGarden,
        deviceIds: prevGarden.deviceIds.filter(id => id !== item.deviceId),
      }))

      
    } catch (error) {
      console.error('Lỗi khi xóa thiết bị:', error);
      alert('không thể xóa thiết bị. Vui lòng thử lại!');
      
    }
    
    
  }

  const handlePressGardenDetail = (item) => {
    setDevice(item);
    navigation.navigate('DevicesWater');
  }
  
  const renderDeviceItem = ({ item }) => (
    
    <TouchableOpacity onPress={() => {handlePressGardenDetail(item)
      
    }} activeOpacity={0.7}>

    <View className="p-4 mb-4 bg-white rounded-2xl shadow-md">
      <View className="flex-row items-center justify-between mb-2">
        <View>
          
        <Text className="text-xl font-bold text-green-700">{item.name || 'Thiết bị không tên'}</Text>
        <Text className="text-sm text-gray-500 mb-2">ID: {item.id}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleDeleteDevice(item)} className="p-2">
            <Text> Xóa </Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <View className="bg-gray-100 rounded-xl p-3 mt-2">
        <Text className="text-sm text-gray-700 font-semibold mb-1">Cảm biến:</Text>
        <Text className="text-sm text-gray-600">🌡 Nhiệt độ: {item.sensors_data?.temperature ?? '---'}°C</Text>
        <Text className="text-sm text-gray-600">💧 Độ ẩm không khí: {item.sensors_data?.humidity ?? '---'}%</Text>
        <Text className="text-sm text-gray-600">🌱 Độ ẩm đất: {item.sensors_data?.soilMoisture ?? '---'}%</Text>
      </View>
      
    </View>
    </TouchableOpacity>
  );

  return (
    
    <View className="flex-1 px-5 pt-6 bg-gray-100">
      {modalAddDeviceID && (
        <AddDeviceIdModal
          visible={modalAddDeviceID}
          onClose={() => setModalAddDeviceID(false)}
          onAdd={handleAddDevice}
          gardenId={garden.id}
        />
      )}

      <Text className="text-base text-gray-700 mb-1"> Vị trí: {garden.location}</Text>
      <Text className="text-base text-gray-700 mb-4"> Garden ID: {garden.id}</Text>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderDeviceItem}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">Chưa có thiết bị nào trong vườn này.</Text>
        }
      />
    </View>
  );
}

export default GardenDetail