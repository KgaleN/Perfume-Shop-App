import React from 'react'
import { StyleSheet, View,Text, TouchableOpacity, Alert, Dimensions } from 'react-native'

const {width,height} = Dimensions.get('window');


const returnBtn =async({navigation})=>{
    navigation.navigate('Home')
}


const Btn=({navigation})=>{
    return(
    <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={()=> returnBtn({navigation}) }>
            <Text style={styles.txt}>Return Shopping</Text>
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
        width:width*1
    }
})
export default Btn;