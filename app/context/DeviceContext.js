import React, { createContext, useContext, useState } from 'react'

const DeviceConText = createContext();

export const useDevice = () => useContext(DeviceConText);

export const DeviceProvider = ({children}) => {
  const [device, setDevice] = useState();

  return (
    <DeviceConText.Provider value={{device, setDevice}}>
      {children}
    </DeviceConText.Provider>
  )
}
