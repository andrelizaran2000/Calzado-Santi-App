// Modules
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// @ts-ignore
import shoeA from '../assets/assets/shoeA.jpg';
// @ts-ignore
import shoeB from '../assets/assets/shoeB.jpg';
// @ts-ignore
import shoeC from '../assets/assets/shoeC.jpg';
// @ts-ignore
import shoeD from '../assets/assets/shoeD.png';

// Components
import Container from '../components/shared/Container';
import SubtitleText from '../components/general/SubtitleText';

// Utils
import { colorPalette } from '../utils/colors'

// Drawer
import { DrawerStackParams } from '../navigation/DrawerNavigation';

export interface Props extends NativeStackScreenProps<DrawerStackParams, any> {}

export default function Categories({ navigation }:Props) {

  function navigateToArticles (type:1 | 2 | 3) {
    navigation.navigate('articles', { type:type + 1 as 1 | 2 | 3 });
  }

  return (
    <Container>
      <View style={{ flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap' }}>
      {categories.map(({ title, image }, key) => (
        <TouchableOpacity style={{ marginBottom:20, width:'46%' }} key={key} onPress={() => navigateToArticles(key as 1 | 2 | 3)}>
          <View style={{ backgroundColor:colorPalette.lightGray, padding:20, borderRadius:5 }}>
            <SubtitleText text={title} textColor='white' textAlign='center'/>
          </View>
          <View style={{ padding:20, backgroundColor:'white', borderBottomLeftRadius:5, borderBottomRightRadius:5, alignItems:'center' }}>
            <Image source={{ uri:image }} style={{ width:100, height:100, borderRadius:5 }}/>
          </View>
        </TouchableOpacity>
      ))}
    </View>
    </Container>
  )
}

const categories = [
  { image:'https://firebasestorage.googleapis.com/v0/b/shoes-app-71c5b.appspot.com/o/shoe3.jpeg?alt=media&token=2d50f3a5-82de-40d7-a9dd-d0c3a6d49383', title:'Plataforma' },
  { image:'https://firebasestorage.googleapis.com/v0/b/shoes-app-71c5b.appspot.com/o/shoe14.jpeg?alt=media&token=b83cb959-0d6c-4abc-bd34-bb862e96ddf4', title:'Sandalias' },
  { image:'https://firebasestorage.googleapis.com/v0/b/shoes-app-71c5b.appspot.com/o/shoe1.jpeg?alt=media&token=0a2d8c9d-84f4-4e5d-a2ef-a5bfecc16474', title:'Zapatillas' },
  { image:'https://firebasestorage.googleapis.com/v0/b/shoes-app-71c5b.appspot.com/o/shoe22.jpeg?alt=media&token=2fddf9c2-e122-460a-b8b2-c573f0ae0d6c', title:'Todos' }
]