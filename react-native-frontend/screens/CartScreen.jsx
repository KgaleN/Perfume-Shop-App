import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {StyleSheet,Text, View, Image, Dimensions, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CartItem from './../util/cartItem';
import CheckOutBar from './../util/checkoutBar';
import axiosInstance from '../util/jwt';

const { width, height } = Dimensions.get('window');

const Cart = ({navigation}) => {
	const [cartItems,setCartItems] = useState([])
	const [subTotal,setSubTotal] = useState(0)
	const [total,setTotal] = useState(0)

	async function fetchData() {
		try {
			const response = await axiosInstance.get('/carts/cartItems');
			console.log("Cart Screen 3", response.data.length);
			setCartItems(response.data);
	
			// Calculate subtotal
			let newSubTotal = 0;
			response.data.forEach((item) => {
				newSubTotal += (Number(item.perfume.price)*Number(item.quantity));
			});
	
			setSubTotal(newSubTotal); // Set subtotal once
			setTotal(newSubTotal + 90); // Delivery fee added to total
		} catch (err) {
			console.log(err.message);
		}
	}

	const refreshPriceBar=(id)=>{
		
		let newSubTotal = 0;
		const carts = cartItems.filter(item => item.id !== id);

		carts.forEach((item) => {
			newSubTotal += (Number(item.perfume.price)*Number(item.quantity));
		});
		// console.log("where is the love", newSubTotal)
		setSubTotal(newSubTotal); // Set subtotal once
		setTotal(newSubTotal + 90);
	}
	
	const handleItemRemoved = async(id) => {
	    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
		refreshPriceBar(id)
	};

	useEffect(()=>{

		fetchData()
	},[])

  
  return (
    <GestureHandlerRootView style={styles.container}>

    <FlatList data={cartItems} keyExtractor={(item,index)=>index.toString()} 
    renderItem={({item})=><CartItem name={item.perfume.name} gender={item.perfume.gender} quantity={item.quantity} cost={item.perfume.price} url={item.perfume.img} id={item.id} onItemRemoved={handleItemRemoved}/>} 
    numColumns={1}/>
    <CheckOutBar navigation={navigation} subTotal={`R ${subTotal}.00`} deliveryFee='R90.00' totalCost={`R${total}.00`}/>
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
		padding:1,
		alignItems:'center',
		justifyContent:'center',
		width: width * 1,
		marginBottom:17
	   },
	   txt:{
		fontSize:25,
		fontWeight:'bold'
	   }
});

export default Cart;
