import React from 'react';
import { StyleSheet, Image,Text,TouchableOpacity, View } from 'react-native';
import axios from 'axios'




const Item = ({navigation,id,url,name,cost,gender})=>{
    const ItemScreen =async (id)=>{
        navigation.navigate('ItemSelected',{itemId:id})
       }
    return(
            <TouchableOpacity style={styles.container1} onPress={()=>{
              ItemScreen(id)
            }}>
                <View style={styles.imageContainer}><Image style={styles.img} source={{uri:url}}/></View>
            <Text style={styles.nameTxt}>{name}</Text>
            <Text style={styles.genderTxt}>{gender}</Text>
            <Text style={styles.costTxt}>R{cost}.00</Text>
            </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    container1:{
        padding:10,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        borderTopEndRadius:9,
        borderTopStartRadius:9,
        elevation: 1,
        margin:20
    },
    imageContainer:{
        padding:1,
        borderBottomWidth:1,
        margin:5
    },
    img:{
        width:130,
        height:135,
    },
    nameTxt:{
        fontSize:15,
        color:'#2A2E2F',
    },
    genderTxt:{
        fontSize:15,
        color:'#7B7F81'
    },
    costTxt:{
        fontSize:25,
        fontWeight:'bold',
        color: '#000000'
    }
})

export default Item;