import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Animated} from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import axiosInstance from './jwt';


const {width,length} = Dimensions.get('window')

const CartItem = ({name, gender, quantity, cost, url, id, onItemRemoved})=>{

    async function removeItem(){
    console.log(id, "here")
    await axiosInstance.post(`/carts/removeItem/${id}`).then((response)=>{
    console.log(response,"removeed item");
    onItemRemoved(id);
}).catch((error)=>{
console.log("cart item err")
})
    
}

    function RightAction(prog, drag) {
        const styleAnimation = useAnimatedStyle(() => {
          console.log('showRightProgress:', prog.value);
          console.log('appliedTranslation:', drag.value);
      
          return {
            transform: [{ translateX: drag.value + 50 }],
          };
        });
      
        return (
          <Reanimated.View style={styleAnimation}>
            
                <Text style={styles.rightAction} onPress={()=>removeItem()}>Delete</Text>
            
            
          </Reanimated.View>
        );
      }

return(
   <ReanimatedSwipeable friction={2}
   enableTrackpadTwoFingerGesture
   rightThreshold={40}
   renderRightActions={RightAction}>    
    <View style={styles.container}>      
          <Image style={styles.img} source={{uri: url}}/>
          <View style={styles.container1}>
             <Text style={styles.nameTxt}>{name}</Text>
             <Text style={styles.genderTxt}>{gender}</Text>
             <Text style={styles.quantityTxt}>QYT: {quantity}</Text>
             <Text style={styles.costTxt}>R{Number(cost)*Number(quantity)}.00</Text>
          </View>
    </View>
   </ReanimatedSwipeable>)
}

const styles = StyleSheet.create({

    rightAction: { width: 50, height: 110, backgroundColor: 'red', alignItems:'center',justifyContent:'center', textAlign:'center', textAlignVertical:'center'},

    container:{
        padding:4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        borderBottomWidth:0.25,
        width: width * 1,
    },
    deleteBtn:{
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red',
    },

    img:{
        width:85,
        height:85,
        marginLeft:10
    },
    container1:{
        padding:9,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    nameTxt:{
        fontSize:17,
        fontWeight: 'bold',
        color: 'black',
    },

    genderTxt:{
        fontSize:14,
        color: '#7B7F81',
    },

    quantityTxt:{
        fontSize:14,
        color: '#7B7F81',
    },

    costTxt:{
        fontSize:20,
        fontWeight: 'bold',
        color: 'black',
    }




})

export default CartItem;
