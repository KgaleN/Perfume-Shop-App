import React from 'react';
import { StyleSheet,Text,TextInput, View } from 'react-native';

const txtBox=({ inputLabel, setInputValue})=>{
    return(
        <View style={styles.container}>
        <Text style={styles.text}>{inputLabel}</Text>
        <TextInput style={styles.input} onChangeText={(text)=>{setInputValue(text)}}/>
        </View>
    )

}

const styles =StyleSheet.create({
    container:{
        padding: 20,
        // paddingLeft:50,
        alignContent:'center',
        justifyContent:'flex-start'
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'#000000'
    },
    input:{
       borderWidth:1,
       borderColor:'#9E6847',
       width:320,
       borderRadius:20
    }
    
})
export default txtBox