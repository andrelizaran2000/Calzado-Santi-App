// Modules
import React from 'react';
import { TextInput } from 'react-native';

type Props = {
  mb:number;
  textType: 'email-address' | 'visible-password' | 'default';
  value:string;
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function TextBox ({ mb, textType, value, setValue }:Props) {
  return (
    <TextInput 
      style={{ 
        paddingVertical: 10, 
        paddingHorizontal:20,
        backgroundColor:'white', 
        borderRadius:5,
        borderColor:'#DDD',
        borderWidth:2,
        marginBottom:mb,
        fontSize:16
      }}
      keyboardType={textType}
      secureTextEntry={textType === 'visible-password' ? true : false}
      onChangeText={text => setValue(text)}
      value={value}
    />
  )
}
