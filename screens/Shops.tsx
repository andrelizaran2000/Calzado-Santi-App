// Modules
import { Dimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, Linking } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// Components
import TitleText from '../components/general/TitleText';
import SubtitleText from '../components/general/SubtitleText';

// Utils
import { colorPalette } from '../utils/colors';

// Dummy
import { dummyLocations } from '../utils/dummyData';

// Api
import { getShopsApi, GetShopsApiData } from '../api';

export default function Shops () {
  return (
    <View style={{ flex:1 }}>
      <MapView 
        style={{ 
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height, 
          zIndex:1
        }} 
        showsUserLocation={true}
        focusable={true}
        initialRegion={{
          latitude:dummyLocations[0].latitude,
          longitude:dummyLocations[0].longitude,
          latitudeDelta:0,
          longitudeDelta:0
        }}
      >
        {dummyLocations.map(({ latitude, longitude, title }, key) => <Marker coordinate={{ latitude, longitude }} title={title} key={key}/>)}
      </MapView>
      <InformationContainer/>
    </View>
  )
}

function InformationContainer () {

  useEffect(() => {
    getShops()
  }, []);

  const [loadingShops, setLoadingShops] = useState(true);
  const [shopsInformation, setShopsInformation] = useState<GetShopsApiData>([]);

  async function getShops () {
    setLoadingShops(true);
    const { data } = await getShopsApi();
    setShopsInformation(data);
    setLoadingShops(false);
  }

  return (
    <View style={{ position:'absolute', bottom:0, padding:20, zIndex:2, width:'100%' }}>
      <View style={{ backgroundColor:colorPalette.primaryColor, padding:15, borderRadius:5 }}>
        <TitleText text='Tiendas' textColor='white' textAlign='center'/>
      </View>
      <View style={{ backgroundColor:'white', borderBottomLeftRadius:5, borderBottomRightRadius:5, paddingBottom:0, maxHeight:150 }}>
        { 
          loadingShops 
          ? 
          <ActivityIndicator color={colorPalette.gray} style={{ paddingVertical:15 }}/>
          :
          <ScrollView>
            <View style={{ padding:20, paddingBottom:0, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between' }}>
              {shopsInformation.map(({ TITLE, URL }, key) => (
                <View style={{ marginBottom:20, width:'46%' }} key={key}>
                  <TouchableOpacity key={key} style={{ padding:15, backgroundColor:colorPalette.lightGray, borderRadius:5 }} onPress={() => Linking.openURL(URL)}>
                    <SubtitleText text={TITLE} textColor='white' textAlign='center'/>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        }
      </View>
    </View>
  )
}