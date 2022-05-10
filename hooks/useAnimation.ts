 // Modules
import { useRef } from 'react';
import { Animated } from 'react-native';

export default function useAnimation() {
  
  const opacity = useRef(new Animated.Value(0.4)).current;

  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function fadeOut() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  return {
    opacity,
    fadeIn,
    fadeOut,
  };
}
