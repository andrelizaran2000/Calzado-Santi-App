// Modules
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Dimensions, Image, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Api
import { getShoeByIdApi, getUserShoppingCartApi, removeItemFromShoppingCartApi } from '../api';

import TitleText from '../components/general/TitleText';
import ColorButton from '../components/general/ColorButton';
import SubtitleText from '../components/general/SubtitleText';

// Utils
import { colorPalette } from '../utils/colors';

// Contexts
import { GeneralContext } from '../contexts/GeneralContext';
import Toast from '../components/shared/Toast';

type ShoppingCartItemMapped = {
  BRAND:string;
  IMAGE:string;
  PIECES:number;
  PRICE:number;
  ID_SHOPPING_CART:number;
}

export default function ShoppingCart() {

  const [loadingShoppinItems, setLoadingShoppingItems] = useState(true)
  const [shoppingItems, setShoppingItems] = useState<ShoppingCartItemMapped[]>([]);
  const { state, setState } = useContext(GeneralContext);

  async function getProductsFromShoppingCart () {
    try {
      const shoppingCart = await getShoppingCartRegisters();
      if (shoppingCart.length === 0) {
        setLoadingShoppingItems(false);
        return;
      }
      const productsPromises = shoppingCart.map(({ ID_PRODUCT }) => getShoeByIdApi(ID_PRODUCT));
      const productsInformation = await Promise.all(productsPromises);
      const mappedShoppingCart = productsInformation.map(({ data }, index) => {
        const { COLORS, CATEGORY, PIECES, ID_SHOE, ...shoeInformation } = data[0];
        return { ...shoeInformation, PIECES:shoppingCart[index].PIECES, ID_SHOPPING_CART:shoppingCart[index].ID_SHOPPING_CART }
      });
      setShoppingItems(mappedShoppingCart)
      setLoadingShoppingItems(false);
      setState({ ...state, shoppingCartItems:mappedShoppingCart.length })
    } catch (error:any) { 
      console.log(error);
      setLoadingShoppingItems(false);
    }
  }

  async function getShoppingCartRegisters () {
    try {
      setLoadingShoppingItems(true);
      const token = await AsyncStorage.getItem('token');
      const { data } = await getUserShoppingCartApi(token as string);
      const mappedData = data.map(({ ID_USER, ...item }) => (item));
      return mappedData;
    } catch (error:any) {
      console.log(error);
      setLoadingShoppingItems(false);
      return [];
    }
  }

  useEffect(() => {
    getProductsFromShoppingCart();
  }, [state.shoppingCartItems]);

  return (
    <View style={{ paddingTop:20, height:Dimensions.get('screen').height - 60 }}> 
      { loadingShoppinItems ? <ActivityIndicator color={colorPalette.gray}/> : <></> }
      { (!loadingShoppinItems && shoppingItems.length === 0) ? <EmptyAlert/> : <></> }
      { (!loadingShoppinItems && shoppingItems.length !== 0) ? <ShoppingCartList shoppingItems={shoppingItems} setShoppingItems={setShoppingItems}/> : <></> }
      { state.toastMessage ? <Toast/> : <></> }
    </View>
  )
}

function EmptyAlert () {
  return (
    <View style={{ padding:20, paddingTop:0 }}>
      <View style={{ padding:20, backgroundColor:colorPalette.gray, borderRadius:5 }}>
        <SubtitleText text='El carrito está vacío' textColor='white' textAlign='center'/>
      </View>
    </View>
  )
}

type ShoppingCartListProps = {
  shoppingItems:ShoppingCartItemMapped[]
  setShoppingItems:React.Dispatch<React.SetStateAction<ShoppingCartItemMapped[]>>
}

function ShoppingCartList ({ shoppingItems, setShoppingItems }:ShoppingCartListProps) {

  const { state, setState } = useContext(GeneralContext);

  async function removeItemDatabase (indexItem:number, idShoppingCart:number, action:boolean) {
    try {
      if (action) setState({ ...state, toastMessage:'Elemento comprado' });
      else setState({ ...state, toastMessage:'Elemento eliminado' });
      setTimeout(() => {
        setState({ ...state, toastMessage:'' });
      }, 2000);
      const filteredShoppingItems = shoppingItems.filter(({  }, index) => index != indexItem);
      setShoppingItems(filteredShoppingItems);
      await removeItemFromShoppingCartApi(idShoppingCart);
    } catch (error:any) {
      console.log(error)
    }
  }

  return (
    <ScrollView>
      { shoppingItems.map(({ BRAND, PIECES, PRICE, IMAGE, ID_SHOPPING_CART }, key) => (
        <View key={key} style={{ paddingHorizontal:20 }}>
          <View style={{ padding:20, borderRadius:5, backgroundColor:colorPalette.secondaryColor, marginBottom:20 }}>
            <View style={{ flexDirection:'row' }}>
              <Image source={{ uri:IMAGE }} style={{ width:100, height:100, borderRadius:5 }}/>
              <View style={{ paddingLeft:20, justifyContent:'space-between' }}>
                <TitleText text={BRAND} textColor='white'/>
                <View>
                  <SubtitleText text={`Piezas: ${PIECES}`} textColor='white'/>
                  <SubtitleText text={`Precio: $${PRICE}`} textColor='white'/>
                  <SubtitleText text={`Total: $${PRICE * PIECES}`} textColor='white'/>
                </View>
              </View>
            </View>
            <View style={{ flexDirection:'row', justifyContent:'space-between', marginTop:20 }}>
              <View style={{ width:'46%' }}>
                <ColorButton text='Cancelar' textColor={colorPalette.gray} color='white' onPress={() => removeItemDatabase(key, ID_SHOPPING_CART, false)} />
              </View>
              <View style={{ width:'46%' }}>
                <ColorButton text='Comprar' onPress={() => removeItemDatabase(key, ID_SHOPPING_CART, true)}/>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}