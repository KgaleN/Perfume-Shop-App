import React from 'react';
import { StyleSheet, Image,Text,TouchableOpacity, View, Dimensions } from 'react-native';
import CheckoutBtn from './../buttons/checkoutBtn'

const { width, height } = Dimensions.get('window');
const CheckoutBar = ({navigation, subTotal, deliveryFee, totalCost})=>{
    return(
        <View style={styles.container}>
            <View style={styles.container1}>

               <View style={styles.container2}>
                <Text style={styles.header}>Sub-Total</Text>
                <Text style={styles.header}>Delivery fee</Text>
               </View>

               <View style={styles.container2}>
                <Text style={styles.costTxt}>{subTotal}</Text>
                <Text style={styles.costTxt}>{deliveryFee}</Text>
               </View>
            </View>

             <View style={styles.container1}>

               <View style={styles.container2}>
                <Text style={styles.header}>Total Cost</Text>
               </View>

               <View style={styles.container2}>
                <Text style={styles.costTxt}>{totalCost}</Text>
               </View>
             </View>

             <View style={styles.container3}>
               <CheckoutBtn navigation={navigation}/>
               </View>
    </View>
             
    )
}

const styles= StyleSheet.create({
    container:{
        padding:5,
        alignItems:'center',
        justifyContent:'space-between',
        borderTopEndRadius:15,
        borderTopStartRadius:15,
        backgroundColor:'#FAF6F2',
        width:width * 1,
        borderWidth:1,
        
    },
    container1:{
        padding:10,
        alignItems:'center',
        justifyContent:'space-between',
        borderTopEndRadius:15,
        borderTopStartRadius:15,
        flexDirection:'row',
        backgroundColor:'#FAF6F2',
        width:width * 0.98,
    },
    container2:{
        alignItems:'flex-start',
        justifyContent:'space-around',
    },
    container3:{
        padding:5
    },
    header:{
        fontSize:25,
        color:'#6B6A6A',
        fontWeight:'medium',
        margin:5,
    },
    costTxt:{
        fontSize:25,
        fontWeight:'medium',
        color: '#000000',
        margin:5
    }
})

export default CheckoutBar;