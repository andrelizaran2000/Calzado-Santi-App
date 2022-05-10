// Modules
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

// Utils
import { colorPalette } from '../../utils/colors';

type Props = {
  text:string;
  loading?:boolean;
  color?:string;
  onPress?: () => void;
  textColor?:string;
  mb?:number;
}

  export default function ColorButton({ text, loading = false, color = colorPalette.primaryColor, onPress, textColor = 'white', mb = 0 }:Props) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom:mb }} disabled={loading}>
      <View style={{ paddingVertical:15, paddingHorizontal:20, backgroundColor:color, borderRadius:5 }}>
        { 
          loading
          ?
          <ActivityIndicator color='white'/>
          :
          <Text style={{ color:textColor, fontWeight:'bold', fontSize:18, textAlign:'center' }}>{text}</Text>
        }
      </View>
    </TouchableOpacity>
  )
}
