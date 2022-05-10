// Modules
import React from 'react';
import { Text } from 'react-native';

type Props = {
  text:String;
  mb?:number;
  uppercase?: boolean;
  textColor?: 'black' | 'white';
  textAlign?: 'center' | 'left' | 'right';
}

export default function BodyText ({ text, mb = 0, textColor = 'black', textAlign = 'left' }:Props) {
  return (
    <Text 
      style={{ 
        fontSize:14, 
        marginBottom:mb,
        color:textColor,
        textAlign
      }}
    >{text}</Text>
  )
}