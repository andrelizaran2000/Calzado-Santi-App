// Modules
import React from 'react';
import { Text } from 'react-native';

type Props = {
  text:String;
  mb?:number;
  uppercase?: boolean;
  textColor?: 'black' | 'white';
  textAlign?: 'center' | 'left';
}

export default function TitleText ({ text, uppercase = false, mb = 0, textColor = 'black', textAlign = 'left' }:Props) {
  return (
    <Text 
      style={{ 
        fontSize:18, 
        textTransform:uppercase ? 'uppercase' : 'none', 
        fontWeight:'500', 
        marginBottom:mb,
        color:textColor,
        textAlign
      }}
    >{text}</Text>
  )
}
