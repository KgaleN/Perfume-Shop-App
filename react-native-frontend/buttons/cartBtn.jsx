import React from'react';
import { StyleSheet, View, TouchableOpacity, Image,Text } from 'react-native';
import axiosInstance from '../util/jwt';

async function sendData(navigation,quantity,perfumeId,cartDate,isCheckedOut) {
    try{
        console.log('cart screen2 ',quantity)
        await axiosInstance.post('/carts/addItem',{quantity,perfumeId,cartDate,isCheckedOut}).then((response)=>{
            console.log("item selected")
            navigation.navigate('Cart')
        }).catch((err)=>{console.log(err.message)});
    } catch(err){
        console.log(err.message)
    }
}

 const addToCart =({navigation,quantity, perfumeId})=>{
    // const {quantity, perfumeId} = route.params;
		const cartDate = Date.now();
		const isCheckedOut = false;
		sendData(navigation,quantity,perfumeId,cartDate,isCheckedOut);

        
    }


const CartBtn=({navigation, quantity, perfumeId})=>{
   
    return(
            <TouchableOpacity style={styles.container} onPress={()=>addToCart({navigation, quantity, perfumeId})}>
                <Image style={styles.img} source={require('./../assets/cart-shopping-svgrepo-com.png')}/>
                <Text style={styles.txt}>Add to Cart</Text>
            </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    container:{
        padding:10,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        width:220,
        height:60,
        borderRadius:29,
        backgroundColor:'#9E6847',
    },
    img:{
        width:30,
        height:30,
        marginLeft:20
    },
    txt:{
        fontSize:21,
        fontWeight:'bold',
        color: 'white',
        marginRight:25,
    }


})

export default CartBtn;