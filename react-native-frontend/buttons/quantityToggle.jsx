import React,{useState, useEffect} from'react';
import {View, TouchableOpacity, Image, StyleSheet,Text} from'react-native';

 
const QuantityToggle =({setQuantity})=>{

    const [qntty,setQntty]= useState(1)
    const AddQuantity=()=>{

        const newQntty= qntty+1;
        setQntty(newQntty);
        setQuantity(newQntty);

    }

    const minusQuantity=()=>{
if(qntty>1){        
        const newQntty= qntty-1;
        setQntty(newQntty);
        setQuantity(newQntty);
    }

}

useEffect(()=>{
    setQuantity(qntty)
    
},[qntty])
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={()=>AddQuantity()}>
                <Text style={styles.txt}>+</Text>
            </TouchableOpacity>
              <View style={styles.display}>
                <Text style={styles.txt}>{qntty}</Text>
              </View>
            <TouchableOpacity style={styles.btn}  onPress={()=>minusQuantity()}>
                <Text style={styles.txt}>-</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        padding: 4,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    btn:{
        padding: 1,
        width:37,
        height:37,
        borderRadius:7,
        backgroundColor:'#9E6847',
        alignItems:'center',
        justifyContent:'center'
    },
    display:{
        padding:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        width:41,
        height:37,
    },
    txt:{
        fontSize:20,
        fontWeight:'bold',
    }

})

export default QuantityToggle;