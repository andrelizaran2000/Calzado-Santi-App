// Modules
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

// Screens
import Login from '../screens/Login';
import DrawerNavigation from '../navigation/DrawerNavigation';

// Utils
import { colorPalette } from '../utils/colors';
import GeneralState, { GeneralContext } from '../contexts/GeneralContext';
import { View } from 'react-native';

export type StackParams = {
  login: undefined;
  home: undefined;
}

const Stack = createNativeStackNavigator<StackParams>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    card:colorPalette.primaryColor,
    text:'#FFF'
  },
};

export default function StackNavigation() {

  const [currentToken, setCurrentToken] = useState('');
  const [loadingToken, setLoadingToken] = useState(true);

  useEffect(() => {
    getToken();
  }, []);

  async function getToken () {
    const token = await AsyncStorage.getItem('token');
    if (token) setCurrentToken(token as string)
    setLoadingToken(false)
  }

  if (loadingToken) {
    return <View/>
  } else {
    return (
      <GeneralState>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator screenOptions={{ headerBackButtonMenuEnabled:false,headerBackVisible:false, gestureEnabled:false }}>
            {
              currentToken
              ?
              <>
                <Stack.Screen 
                  name="home" 
                  component={DrawerNavigation} 
                  options={{ headerShown:false }}
                />
                <Stack.Screen 
                  name="login" 
                  component={Login} 
                  options={{ title:'Iniciar sesión' }}
                /> 
              </>
              :
              <>
                <Stack.Screen 
                  name="login" 
                  component={Login} 
                  options={{ title:'Iniciar sesión' }}
                />
                <Stack.Screen 
                  name="home" 
                  component={DrawerNavigation} 
                  options={{ headerShown:false }}
                />
              </>
            }
          </Stack.Navigator>
        </NavigationContainer>
      </GeneralState>
    );
  }
}
