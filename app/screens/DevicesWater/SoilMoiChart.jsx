import React from 'react'
import { View, Text } from 'react-native'
import { useDevice } from '../../context/DeviceContext';
import { LineChart } from 'react-native-gifted-charts';
import { useEffect } from 'react';

const soilMoiChart = () => {
  const {device} = useDevice();
    // const {setDevice} = useDevice();
    useEffect(() => {
      console.log('ChartScreen mounted with device:', device);
    }
    , [device])
    return (
      <View className="flex-1 justify-center items-center"> 
	<View className="absolute top-0 left-0 right-0 h-16 bg-blue-500 flex justify-center items-center">
	  <Text className="mb-3 text-xl font-bold">Device: {device.name}</Text>
	  <Text className="mb-3 text-6xl font-bold">Soil Moisture: {device.sensors_data.soilMoisture}</Text>
	</View>
	<Text className="mb-3 text-2xl font-bold">Soil Moisture Chart</Text> 
  
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

export default soilMoiChart