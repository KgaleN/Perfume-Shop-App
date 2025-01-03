import React from 'react'
import { StyleSheet, View,Text, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { Alert } from 'react-native'
const register=async ({navigation, email, password, name, streetAddress, city, province, phone, gender})=>{
  await axios.post('http://192.168.1.71:3000/customer/register',{streetAddress, city, province, name, phone, email, password, gender})
     .then(()=>{
        Alert.alert("ligma", "balls")
        //   navigation.navigate('Home')
        }
    ).catch((err)=>{Alert.alert('error', gender)})
}
const Btn=({navigation, email, password, name, streetAddress, city, province, phone, gender})=>{
    return(
    <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={()=>register({navigation, email, password, name, 
        streetAddress, phone, city, province, gender})
        }>
            <Text style={styles.txt}>Sign up</Text>
        </TouchableOpacity>
    </View>
    )
}
const styles = StyleSheet.create({
    btn:{
        backgroundColor:'#9E6847',
        borderRadius:29,
        width:320,
        height:60,
        alignItems:'center',
        justifyContent:'center'

    }, 
    txt:{
        color: 'white',
        fontSize: 23,
        fontWeight:'bold'
    },
    container:{
        padding:5,
        alignItems:'center',
        justifyContent:'center',
    }
})
export default Btn;