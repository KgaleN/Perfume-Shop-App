import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const HyprLnk=({linkLabel, navigation})=>{
    return(
        <View style={styles.container}>
        <TouchableOpacity style={styles.link} onPress={()=>navigation.navigate('Signup')}>
                <Text style={styles.txt}>{linkLabel}</Text>
        </TouchableOpacity> 
     </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:1,
    },
    txt:{
        color: '#9E6847',
        fontSize:15,
        textDecorationLine:'underline',
    },
    link:{
        padding:1,
        alignItems:'center',
        justifyContent:'center'
    },
    
})
export default HyprLnk;