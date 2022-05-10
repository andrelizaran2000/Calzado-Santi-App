// Modules
import React, { useContext, useEffect } from 'react'
import { Animated, Text, View } from 'react-native'
import { GeneralContext } from '../../contexts/GeneralContext';
import useAnimation from '../../hooks/useAnimation'

// Utils
import { colorPalette } from '../../utils/colors'

export default function Toast() {

  const { fadeIn, fadeOut, opacity } = useAnimation();
  const { state } = useContext(GeneralContext);

  useEffect(() => {
    fadeIn();
  }, [])

  return (
    <View style={{ position:'absolute', zIndex:4, bottom:0, padding:20, alignItems:'center', width:'100%' }}>
      <Animated.View style={{ paddingHorizontal:15, paddingVertical:10, backgroundColor:colorPalette.gray, borderRadius:20 }}>
        <Text style={{ color:'white', fontSize:16 }}>{state.toastMessage}</Text>
      </Animated.View>
    </View>
  )
}
