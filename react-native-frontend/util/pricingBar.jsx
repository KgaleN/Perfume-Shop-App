import React from 'react';
import { StyleSheet, Image,Text,TouchableOpacity, View, Dimensions } from 'react-native';
import CartBtn from './../buttons/cartBtn'

const { width, height } = Dimensions.get('window');
const PricingBar = ({cost,navigation,perfumeId,quantity})=>{
    return(
            <View style={styles.container1}>
               <View style={styles.container2}>
                <Text style={styles.header}>Total Price</Text>
                <Text style={styles.costTxt}>R{cost}.00</Text>
               </View>

               <View style={styles.container3}>
               <CartBtn navigation={navigation} perfumeId={perfumeId} quantity={quantity}/>
               </View>
            </View>
    )
}

const styles= StyleSheet.create({
    container1:{
        padding:10,
        alignItems:'center',
        justifyContent:'space-between',
        borderTopEndRadius:15,
        borderTopStartRadius:15,
        flexDirection:'row',
        backgroundColor:'#FAF6F2',
        width:width * 0.95,
        borderWidth:0.5,
        shadowRadius:1
    },
    container2:{
        alignItems:'center',
        justifyContent:'space-around',
    },
    container3:{
        padding:5
    },
    header:{
        fontSize:18,
        color:'#6B6A6A',
        fontWeight:'bold'
    },
    costTxt:{
        fontSize:20,
        fontWeight:'bold',
        color: '#000000'
    }
})

export default PricingBar;