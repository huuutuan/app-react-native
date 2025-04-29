import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '../styles/styles'
const ButtonBack = () => {
	const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
    	<Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  )
}

export default ButtonBack