import React from 'react'
import { StyleSheet, View,Text, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'
import  AsyncStorage  from "@react-native-async-storage/async-storage";


const login=async({navigation, email, password})=>{
     console.log(password)
await axios.post('http://192.168.1.71:3000/customer/login',{email, password}).then(async(response)=>{
    console.log(response.data)
    const {token}= response.data;
    await AsyncStorage.setItem('jwtToken',token)
    navigation.navigate('Home')}).catch(()=>{
        Alert.alert("Login Error","The username or password you entered is incorrect.")
       console.log('Failure')
    })

    
}
const Btn=({navigation, email, password})=>{
    return(
    <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={()=> login({navigation, email, password}) }>
            <Text style={styles.txt}>Login</Text>
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