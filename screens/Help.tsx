// Modules
import React, { useContext } from 'react';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity, View, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Components
import Container from '../components/shared/Container';
import SubtitleText from '../components/general/SubtitleText';

// Utils
import { colorPalette } from '../utils/colors';

// Navigation
import { StackParams } from '../navigation/StackNavigation';

// Context
import { GeneralContext } from '../contexts/GeneralContext';

export interface Props extends NativeStackScreenProps<StackParams, any> {}

export default function Help ({ navigation }:Props) {

  const { state, setState } = useContext(GeneralContext);

  function signOut () {
    setState({ ...state, token:'' });
    AsyncStorage.removeItem('token');
    navigation.navigate('login');
  }

  function redirect (path:string) {
    Linking.openURL(path);
  }

  const options:{ icon:string, title:string, action:() => void }[] = [
    { 
      icon:'book', 
      title:'Términos y condiciones',
      action:() => redirect('https://www.apple.com/mx/legal/internet-services/itunes/vppbusiness/mx/terms.html')
    },
    { 
      icon:'warning',
      title:'Aviso de privacidad', 
      action:() => redirect('https://www.apple.com/legal/privacy/es/') 
    },
    { 
      icon:'help', 
      title:'Ayuda', 
      action:() => redirect('https://communities.apple.com/es/docs/DOC-250003547')
    },
    { 
      icon:'message', 
      title:'Comentarios', 
      action:() => redirect('https://www.apple.com/mx/contact/feedback/')
    },
    { 
      icon:'level-down', 
      title:'Cerrar sesión', 
      action: signOut
    }
  ]

  return (
    <Container> 
      <View style={{ flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
        {options.map(({ title, icon, action }, key) => (
          <TouchableOpacity style={{ marginBottom:20, width:'46%' }} key={key} onPress={action}>
            <View style={{ padding:20, backgroundColor:icon === 'level-down' ? colorPalette.danger : colorPalette.gray, borderRadius:5 }}>
              <SubtitleText text={title} textColor='white' textAlign='center'/>
            </View>
            <View style={{ padding:20, backgroundColor:'white', borderBottomLeftRadius:5, borderBottomRightRadius:5, alignItems:'center' }}>
              {/* @ts-ignore */}
              <Entypo name={icon} size={24} color={icon === 'level-down' ? colorPalette.danger : colorPalette.gray} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  )
}



