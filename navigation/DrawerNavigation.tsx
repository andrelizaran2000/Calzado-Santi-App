// Modules
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// Components
import { colorPalette } from '../utils/colors';

// Screens
import Help from '../screens/Help';
import Shops from '../screens/Shops';
import Articles from '../screens/Articles';
import Categories from '../screens/Categories';
import ShoppingCart from '../screens/ShoppingCart';

export type DrawerStackParams = {
  categories: undefined;
  articles: {
    type: 1 | 2 | 3 | 4
  }
  shoppingCart: undefined;
  shops:undefined;
  help:undefined;
};

const Drawer = createDrawerNavigator<DrawerStackParams>();

export default function DrawerNavigation () {
  return (
    <Drawer.Navigator 
      screenOptions={{ 
        headerTintColor:'white',
        drawerActiveBackgroundColor:colorPalette.secondaryColor,
        drawerActiveTintColor:'white'
      }}
    >
      <Drawer.Screen 
        name="categories" 
        component={Categories}
        options={{ title:'Categorías' }}
      />
      <Drawer.Screen 
        name="articles" 
        component={Articles} 
        options={{ title:'Artículos' }}
      />
      <Drawer.Screen 
        name="shoppingCart" 
        component={ShoppingCart} 
        options={{ title:'Carrito de compras' }}
      />
      <Drawer.Screen 
        name="shops" 
        component={Shops} 
        options={{ title:'Tiendas' }}
      />
      <Drawer.Screen 
        name="help" 
        component={Help} 
        options={{ title:'Ayuda' }}
      />
    </Drawer.Navigator>
  );
}