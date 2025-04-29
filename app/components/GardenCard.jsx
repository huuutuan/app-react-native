import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'

import { img } from '../../assets/imagesAsset'
import { deleteGarden } from '../services/gardenService';

const GardenCard = ( {garden, onPress, handleDeleteGarden} ) => {
  const [index, setIndex] = useState(0);
  const randomImage = () => {
    const randomIndex = Math.floor(Math.random() * img.length);
    setIndex(randomIndex);
  }
  useEffect(() => {
    console.log(garden);
    
    randomImage();
  }, [])
  return (
    <TouchableOpacity onPress={onPress} className="mb-4 rounded-xl overflow-hidden bg-white shadow-md">
      <Image source={img[index]} className="w-full h-40 rounded-t-xl" resizeMode="cover" />
      <View className="p-4">
        <View>

        <Text className="text-lg font-semibold text-gray-800">{garden.name}</Text>
        <Text className="text-sm text-gray-600 mt-1">{garden.location}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() =>  handleDeleteGarden(garden.id)} >
            <Text className="text-sm text-blue-500 mt-2" >Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default GardenCard