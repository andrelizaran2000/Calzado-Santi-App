// Modules
import React, { useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; 
import { View, KeyboardAvoidingView, Platform, Image } from 'react-native';

// @ts-ignore
import logo from '../assets/assets/logo.png';

// Components
import TextBox from '../components/general/TextBox';
import Container from '../components/shared/Container';
import ColorButton from '../components/general/ColorButton';
import SubtitleText from '../components/general/SubtitleText';

// Colors
import { colorPalette } from '../utils/colors';

// Api
import { loginApi } from '../api';

// Navigation
import { StackParams } from '../navigation/StackNavigation';

// Context
import { GeneralContext } from '../contexts/GeneralContext';

export interface Props extends NativeStackScreenProps<StackParams, any> {}

export default function Login({ navigation }:Props) {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loadingLogin, setLoadingLogin ] = useState(false);
  const { state, setState } = useContext(GeneralContext);
  const [ errorMessage, setErrorMessage ] = useState('');

  async function login () {
    try {
      setLoadingLogin(true);
      const { data } = await loginApi(email, password);
      if (data) {
        setState({ ...state, token:data });
        setLoadingLogin(false)
        await AsyncStorage.setItem('token', data);
        setEmail('');
        setPassword('');
        navigation.navigate('home');
      } else setLoadingLogin(false);
    } catch (error:any) {
      setLoadingLogin(false);
      if (error.response.status === 400) setErrorMessage('Contraseña incorrecta');
      if (error.response.status === 500) setErrorMessage('Contacte con el administrador');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  }

  return (
    <Container>
      <View style={{ flex:1, justifyContent:'center' }}>
        <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
          <View style={{ padding:15, backgroundColor:colorPalette.primaryColor, borderTopLeftRadius:5, borderTopRightRadius:5, alignItems:'center' }}>
            <Image source={logo} style={{ width:150, height:80 }}/>
          </View>
          <View style={{ padding:20, borderRadius:5, backgroundColor:'white' }}>
            { errorMessage ? <LoginError error={errorMessage}/> : <></> }
            <SubtitleText text='Email' mb={8}/>
            <TextBox mb={10} textType='email-address' setValue={setEmail} value={email}/>
            <SubtitleText text='Contraseña' mb={8}/>
            <TextBox mb={20} textType='visible-password' setValue={setPassword} value={password}/>
            <ColorButton text='Ingresar' onPress={login} loading={loadingLogin}/>
          </View>  
        </KeyboardAvoidingView>
      </View>
    </Container>
  )
}

type LoginErrorProps = {
  error:string
}
function LoginError ({}:LoginErrorProps) {
  return (
    <View style={{ padding:20, backgroundColor:colorPalette.danger, borderRadius:5, marginBottom:20 }}>
      <SubtitleText text='Contraseña incorrecta' textColor='white' textAlign='center'/>
    </View>
  )
}