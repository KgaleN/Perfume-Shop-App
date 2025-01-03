import React from'react';
import { StyleSheet, View, TouchableOpacity, Image,Text } from 'react-native';
import axiosInstance from '../util/jwt';

const CheckoutBtn=({navigation})=>{

    const onClick=async()=>{
       await  axiosInstance.post("/cartCheckout/checkout")
       navigation.navigate('Checkout')
    }
    return(
            <TouchableOpacity style={styles.container} onPress={()=>onClick()}>
                <Image style={styles.img} source={require('./../assets/bag-shopping-svgrepo-com.png')}/>
                <Text style={styles.txt}>Checkout</Text>
            </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    container:{
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        width:240,
        height:50,
        borderRadius:29,
        backgroundColor:'#9E6847',
        marginTop:12
    },
    img:{
        width:30,
        height:30,
        marginRight:5
    },
    txt:{
        fontSize:21,
        fontWeight:'bold',
        color: 'white',
        // marginRight:25,
    }


})

export default CheckoutBtn;