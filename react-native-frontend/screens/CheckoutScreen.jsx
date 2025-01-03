import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {StyleSheet,Text, View, Image, Dimensions, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CartItem from './../util/cartItem';
import axiosInstance from '../util/jwt';
import AddressItem from './../util/addressItem';
import ReturnBtn from './../buttons/returnShoppingBtn'

const { width, height } = Dimensions.get('window');

const Checkout = ({navigation}) => {
	const [cartItems,setCartItems] = useState([])
    const [address,setAddress] = useState({})

	async function fetchData() {
		try {
			const response = await axiosInstance.get('/cartCheckout/checkoutDetails');
			console.log("Cart Screen 3-----", response.data.updatedSelectedPerfumeItems.length);
			setCartItems(response.data.updatedSelectedPerfumeItems);
            console.log("Cart Screen 4-----", response.data.address.city);
            setAddress(response.data.address);
	
		} catch (err) {
			console.log(err.message);
		}
	}

	useEffect(()=>{

		fetchData()
	},[])

  
  return (
    <GestureHandlerRootView style={styles.container}>
<AddressItem streetAddress={address.streetAddress} city={address.city} province={address.province}/>

	<Text style={styles.header}> Order List</Text>
    <FlatList data={cartItems} keyExtractor={(item,index)=>index.toString()} 
    renderItem={({item})=><CartItem name={item.perfume.name} gender={item.perfume.gender} quantity={item.quantity} cost={item.perfume.price} url={item.perfume.img} id={item.id}/>} 
    numColumns={1}/>

<ReturnBtn navigation={navigation}></ReturnBtn>

    {/* <CheckOutBar navigation={navigation} subTotal={`R ${subTotal}.00`} deliveryFee='R90.00' totalCost={`R${total}.00`}/> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop:2,
		backgroundColor:'white'
	   },
	   header:{
		fontSize:21,
		fontWeight:'bold',
		marginLeft:40,
		marginBottom:20
	
	   },
	   container1:{
		// borderWidth:3,
		flex:1,
		width:width*1,
		

	   }
});

export default Checkout;
