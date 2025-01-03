import React, { useState } from 'react';
import {StyleSheet,Text, View, Dimensions,Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import axiosInstance from './jwt';

const { width, height } = Dimensions.get('window');

const loadFonts = async () => {
    await Font.loadAsync({
      'CustomFont': require('./../assets/fonts/Kalam-Bold.ttf'),
    });
  };

  export default function Tab({navigation}){

    const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  };
  const Logout=async()=>{
    console.log("logout")
    await axiosInstance.post('/customer/logout');
    navigation.navigate('Login');
  }

      return (	
  //  <View style={styles.container}> 
    <View style={styles.containerHeader}>
    <TouchableOpacity  onPress={()=>Logout()}>
        <Image style={styles.img} source={require('./../assets/logout-2-svgrepo-com (1).png')}/>
      </TouchableOpacity>
            <Text style={styles.txtTitle}>Tega Scent</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
        <Image style={styles.img} source={require('./../assets/black-cart-shopping-svgrepo-com.png')}/>
      </TouchableOpacity>
        
    </View>)
  //  </View>);
  }

  const styles = StyleSheet.create({

	// container: {
	// 	flex: 1,
	// 	alignItems:'center',
	// 	justifyContent:'flex-start'
	//    },

	containerHeader: {
		padding: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection:'row',
    marginTop:52,
		borderBottomWidth:0.25,
		backgroundColor:'#FAF6F2',
	   },
	   txtTitle:{
		fontSize:34,
		fontFamily: 'CustomFont',
		marginLeft:20
	   },
	   img:{
		width:34,
		height:34,
		marginRight:10,
		marginLeft:10,	
	   }
	  

});