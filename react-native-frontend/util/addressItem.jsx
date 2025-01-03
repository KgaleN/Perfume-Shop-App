import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import Home from '../screens/HomeScreen';

const {width, height} = Dimensions.get('window')


const AddressItem = ({streetAddress, city, province}) =>{

    return(
    <View style={style.container}>        
        <View style={style.container1}>
            <Text style={style.header}>Address</Text>
             <View style={style.container2}>
                 <Image style={style.img} source={require("./../assets/location-pin-alt-1-svgrepo-com (1).png")}></Image>
                 <Text style={style.homeTxt}>Home</Text>
             </View>
             <Text style={style.addressTxt}> {streetAddress}, {city}, {province} </Text>        
        </View>
    </View>

    )


}

const style= StyleSheet.create({
    header:{
        fontWeight:'bold',
        fontSize: 21,
        marginLeft:10
    },
img:{
   width:40,
   height:40
},
container:{
    // flex:1,
    alignContent:'center',
    width: width*1,
    marginBottom:45
  },
  container1:{
    borderBottomWidth:3,
    borderBottomColor:'#9E6847',
    padding:20,
    marginLeft:17,
    marginRight:17
  },
   container2:{
    flexDirection:'row',
    alignItems:'center',
    marginTop: 15,
    // marginLeft:13
   },

   homeTxt:{
    fontSize: 18,
    fontWeight: 'bold'
   },

   addressTxt:{
    fontSize: 14,
    color:'#7B7F81',
    marginLeft:37
   }
})

export default AddressItem

