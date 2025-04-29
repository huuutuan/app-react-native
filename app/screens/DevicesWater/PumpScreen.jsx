import React, { useEffect, useState } from 'react'
import { View, Text, Switch } from 'react-native'
import { useDevice } from '../../context/DeviceContext';
import { Ionicons } from '@expo/vector-icons';


const PumpScreen = ({}) => {
  const {device} = useDevice();
  const [power, setPower] = useState(false);
  const [autoWater, setAutoWater] = useState(false);
  const [notification, setNotification] = useState(true)
  useEffect(() => {
    console.log('PumpScreen mounted with device:', device);
  }, [device])
  return (
    <View>
      <View className= "flex-row flex-wrap mb-4 justify-between">
        <View className="w-2/6">

          <Text className=" text-xl font-semibold mb-3">Water pump</Text>
          <View className="mb-4">
            <Text className="text-lg mb-2"> Power</Text>
            <Switch value={power} onValueChange={setPower} className="ml-2" ></Switch>
          </View>
          <Text className="text-xl">
            {power ? 'The pump is on' : 'The pump is off'}
          </Text>
        </View>
        <View className=" w-3/6 justify-center ">
          <View clasName="flex flex-row items-center justify-between">
            <Text className = "text-xl font-semibold mb-4"> Auto Water</Text>
            <Switch value={autoWater} onValueChange={setAutoWater} ></Switch>
          </View>
          <Text className= "mt-5 text-xl">Last Water Time: </Text>
          <Text ></Text>
        </View>
        
      </View>
      <View className="flex-row flex-wrap mt-8 ">
        <View className="w-6/12 rounded-lg bg-slate-300 pb-12">
          <View className="flex-row justify-between">
            <Ionicons name='notifications' size={36} className="p-4" ></Ionicons>
            <Switch value={notification} onValueChange={setNotification} trackColor={{true: 'black'}} className="mt-5 mr-2" ></Switch>
          </View>

          <Text className="ml-5 text-xl">Notifications</Text>
          <Text className = "ml-4 "> {notification ? 'On' : 'Off'} </Text>
        </View>
        <View className="w-5/12 rounded-lg bg-slate-300 p-2 ml-4 items-center">
          <Text className="text-xl">Water duration </Text>
          <View className="flex-row justify-between " >
            <Text className="text-5xl mt-8">10s</Text>
            <Ionicons name="pencil" size={18} className="ml-4 mt-8"></Ionicons>
          </View>
        </View>
      </View>



    </View>
  )
}

export default PumpScreen