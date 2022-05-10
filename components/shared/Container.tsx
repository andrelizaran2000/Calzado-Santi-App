// Modules
import React from 'react'
import { View } from 'react-native'

type Props = {
  children: any
}

export default function Container ({ children }:Props) {
  return <View style={{ flex:1, padding:20 }}>{children}</View>
}
