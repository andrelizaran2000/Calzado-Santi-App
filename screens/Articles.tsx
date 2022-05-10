// Modules
import { Entypo } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Animated, Dimensions, Image, ScrollView, View } from 'react-native';

// Api
import { getAllShoesApi, getShoesByCategoryApi, GetShoesByCategoryApiData, saveInShoppingCartApi, ShoeData } from '../api'

// @ts-ignore
import shoeA from '../assets/assets/shoeA.jpg';

// Utils
import { colorPalette } from '../utils/colors';

// Components
import Toast from '../components/shared/Toast';
import BodyText from '../components/general/BodyText';
import ColorButton from '../components/general/ColorButton';
import SubtitleText from '../components/general/SubtitleText';

// Hooks
import useAnimation from '../hooks/useAnimation';

// Context
import { GeneralContext } from '../contexts/GeneralContext';

// Navigation
import { DrawerStackParams } from '../navigation/DrawerNavigation';

interface Props extends NativeStackScreenProps<DrawerStackParams, 'articles'> {}

export default function Articles({ route }:Props) {

  const [loadingShoes, setLoadingShoes] = useState(true);
  const [shoes, setShoes] = useState<GetShoesByCategoryApiData>([]);
  const { state } = useContext(GeneralContext);

  useEffect(() => {
    getShoesByCategory();
  }, [route.params?.type]);

  async function getShoesByCategory () {
    setShoes([]);
    setLoadingShoes(true); 
    if (route.params?.type === 4) {
      const { data } = await getAllShoesApi();
      setShoes(data);
      setLoadingShoes(false);
    }
    else {
      const { data } = await getShoesByCategoryApi(route.params?.type || 1);
      setShoes(data);
      setLoadingShoes(false);
    }
  }

  return (
    <View style={{ paddingTop:20, flex:1 }}>
      { 
        loadingShoes 
        ? <ActivityIndicator color={colorPalette.gray}/>
        :
          <ScrollView>
            {/* @ts-ignore */}
            {shoes.map(({ BRAND, PRICE, COLORS, CATEGORY, ID_SHOE, IMAGE }, key) => <ShoeItem BRAND={BRAND} PRICE={PRICE} COLORS={COLORS} CATEGORY={CATEGORY} ID_SHOE={ID_SHOE} IMAGE={IMAGE} key={key}/>)}
          </ScrollView>
      }
      { state.showShoppingCartModal ? <ShoppingCartModal/> : <></> }
      { state.toastMessage ? <Toast/> : <></> }
    </View>
  )
}

function ShoeItem ({ ID_SHOE, BRAND, PRICE, COLORS, IMAGE }:ShoeData) {

  useEffect(() => {
    setColors(COLORS.split(', '))
  }, []);

  const [ colors, setColors ] = useState<string[]>([]);
  const { state, setState } = useContext(GeneralContext);

  function setCurrentItem () {
    setState({ 
      ...state, 
      showShoppingCartModal:true,
      currentItem: {
        brand:BRAND,
        image:IMAGE,
        price:PRICE,
        pieces:1,
        id:ID_SHOE
      }
    });
  }
  
  return (
    <View style={{ padding:20, paddingTop:0 }}>
      <View style={{ padding:20, backgroundColor:'white', alignItems:'center', borderTopRightRadius:5, borderTopLeftRadius:5 }}>
        <Image style={{ width:120, height:120, borderRadius:5 }} source={{ uri:IMAGE }}/>
      </View>
      <View style={{ backgroundColor:colorPalette.primaryColor, borderRadius:5, padding:20 }}>
        <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
          <SubtitleText textColor='white' text={BRAND} textAlign='center'/>
          <SubtitleText textColor='white' text={`$ ${String(PRICE)}`} textAlign='right'/>
        </View>
        <View style={{ flexDirection:'row', marginTop:10, justifyContent:'space-between' }}>
          <View style={{ flexDirection:'row' }}>
            {colors.map((color, key) => (
              <View style={{ borderRadius:20, borderColor:'white', borderWidth:2, padding:10, marginRight:10 }} key={key}>
                <BodyText textColor='white' text={color}/>
              </View>
            ))}
          </View>
          <View style={{ flexDirection:'row' }}>
            <TouchableOpacity style={{ backgroundColor:'white', borderRadius:20, padding:10, paddingHorizontal:15 }} onPress={setCurrentItem}>
              <Entypo name="shopping-cart" size={20} color={colorPalette.primaryColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

function ShoppingCartModal () {

  const [ loadingAdding, setLoadingAdding ] = useState(false)
  const { fadeIn, fadeOut, opacity } = useAnimation();
  const { state, setState } = useContext(GeneralContext);
  const { currentItem } = state;

  async function addItemToShoppingCart () {
    try {
      setLoadingAdding(true)
      const token = await AsyncStorage.getItem('token');
      await saveInShoppingCartApi(token as string, currentItem.id, currentItem.pieces);
      fadeOut();
      setTimeout(() => {
        setState({ ...state, toastMessage:'Producto agregado al carrito', showShoppingCartModal:false });
        setTimeout(() => {
          setState({ ...state, toastMessage:'', showShoppingCartModal:false, shoppingCartItems:state.shoppingCartItems + 1 });
        }, 2000);
      }, 400);
      setLoadingAdding(false);
    } catch (error:any) {
      console.log(error.response);
    }
  }

  function closeModal () {
    fadeOut();
    setTimeout(() => {
      setState({ ...state, showShoppingCartModal:false })
    }, 200);
  }

  function addMoreItems () {
    if (state.currentItem.pieces < 5) setState({ ...state, currentItem:{ ...state.currentItem, pieces: state.currentItem.pieces + 1 }});
  }

  function removeItem () {
    if (state.currentItem.pieces !== 1) setState({ ...state, currentItem:{ ...state.currentItem, pieces: state.currentItem.pieces - 1 }});
  } 
  
  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <Animated.View style={{ height:Dimensions.get('screen').height, width:'100%', backgroundColor:'rgba(52, 52, 52, 0.8)', zIndex:2, position:'absolute', bottom:0, opacity }}>
      <Animated.View style={{ position:'absolute', width:'100%', padding:20, bottom:0, zIndex:3 }}>
        <View style={{ backgroundColor:colorPalette.secondaryColor, padding:20, borderRadius:5, alignItems:'center' }}>
          <Image source={{ uri:currentItem.image }} style={{ width:120, height:120, borderRadius:5, marginBottom:20 }}/>
          <View style={{ width:'100%' }}>
            <View style={{ flexDirection:'row', width:'100%', justifyContent:'space-between', marginBottom:15 }}>
              <SubtitleText text='Marca:' textColor='white'/>
              <SubtitleText text={state.currentItem.brand} textColor='white' textAlign='right'/>
            </View>
            <View style={{ flexDirection:'row', width:'100%', justifyContent:'space-between', marginBottom:20 }}>
              <SubtitleText text='Precio:' textColor='white'/>
              <SubtitleText text={`$${String(state.currentItem.price)}`} textColor='white' textAlign='right'/>
            </View>
            <View style={{ flexDirection:'row', width:'100%', justifyContent:'space-between', marginBottom:20 }}>
              <SubtitleText text='Piezas:' textColor='white'/>
              <SubtitleText text={String(state.currentItem.pieces)} textColor='white' textAlign='right'/>
            </View>
            <View style={{ flexDirection:'row', width:'100%', justifyContent:'space-between', marginBottom:20 }}>
              <SubtitleText text='Total:' textColor='white'/>
              <SubtitleText text={`$${Number(state.currentItem.pieces * state.currentItem.price)}`} textColor='white' textAlign='right'/>
            </View>
            <View style={{ flexDirection:'row', width:'100%', justifyContent:'space-between', marginBottom:20 }}>
              <View style={{ width:'46%' }}>
                <ColorButton text='+' color='white' textColor={colorPalette.primaryColor} onPress={addMoreItems}/>
              </View>
              <View style={{ width:'46%' }}>
                <ColorButton text='-' color='white' textColor={colorPalette.primaryColor} onPress={removeItem}/>
              </View>
            </View>
            <ColorButton text='Agregar a carrito' mb={20} onPress={addItemToShoppingCart} loading={loadingAdding}/>
            <ColorButton text='Cancelar' color='white' textColor={colorPalette.primaryColor} onPress={closeModal} loading={loadingAdding}/>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  )
}
