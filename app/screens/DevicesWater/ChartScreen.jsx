import React, { useEffect } from 'react'
import { use } from 'react';
import { View, Text } from 'react-native'
import { useDevice } from '../../context/DeviceContext';
import { LineChart } from 'react-native-gifted-charts';
const dummyData = [
   { value: 20, label: 'Jan', frontColor: 'red' },
    { value: 40, label: 'Feb', frontColor: 'blue' },
    { value: 30, label: 'Mar', frontColor: 'green' },
    { value: 50, label: 'Apr', frontColor: 'purple' },
    { value: 40, label: 'May', frontColor: 'orange' },
    { value: 60, label: 'Jun', frontColor: 'yellow' },
    { value: 70, label: 'Jul', frontColor: 'pink' },
    { value: 80, label: 'Aug', frontColor: 'cyan' },
    { value: 90, label: 'Sep', frontColor: 'magenta' },
   
]

const ChartScreen = () => {
  const {device} = useDevice();
  useEffect(() => {
    console.log('ChartScreen mounted with device:', device);
  }
  , [device])

  if (!device) {
    return (
      <View className="flex-1 justify-center items-center"> 
        <Text className="text-xl font-bold">No device found</Text>
      </View>
    )
  }
  return (
    <View className="flex-1 justify-center items-center"> 
      <View className="absolute top-8 left-0 right-0 bg-white flex justify-center items-center">
        <Text className=" text-xl font-bold">Device: {device.name}</Text>
        {/* <Text className="mb-3 text-xl font-bold">Device: {device.name}</Text> */}
        <Text className=" text-6xl font-bold">{device.sensors_data.temperature}</Text>
      </View>
      <Text className="mb-3 text-2xl font-bold">Temperature Chart</Text> 

      <LineChart
        data={dummyData}
        width={360}
        height={280}
        isAnimated
        areaChart  // bật chế độ area
        areaChartColor="rgba(0, 0, 255, 0.2)"
        color="blue"
        thickness={2}
        hideDataPoints={true}
        yAxisLabelPrefix="$"
        verticalLabelRotation={30}
      />
    </View>
  )
}

export default ChartScreen