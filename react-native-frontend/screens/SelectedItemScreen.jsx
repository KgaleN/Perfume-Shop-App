import React, {useEffect,useState} from 'react';
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native';
import QuantityToggle from './../buttons/quantityToggle';
import PricingBar from './../util/pricingBar';
import axiosInstance from '../util/jwt';
const { width, height } = Dimensions.get('window'); 

const SelectedItem = ({route, navigation}) => {
	const [item,setItem] = useState({});
	const [quantity,setQuantity] = useState(1);
	const [price,setPrice] = useState(0);

	const handleQuantity=(qty)=>{
		setQuantity(qty)
		const price = Number(item.price)*Number(quantity);
		setPrice(price); 
		
	}
	useEffect(()=>{
		async function fetchData(){
			try{
				// console.log("im here");
				const { itemId } = route.params;
				// console.log(itemId)
				const response = await axiosInstance.get(`/perfumes/details/${itemId}`);
				console.log(response.data.id)
				 setItem(response.data);
				 setPrice(response.data.price)

			}catch(error){
				console.log(error.message)
			}
		}

		fetchData();

	},[])
	


  return (
  <View style={styles.container}> 
    <Image style={styles.itemImage} source={{uri:item.img}}/>
	<View style={styles.container1}>
		<Text style={styles.txtGenderRating}>{item.gender}</Text>
		<View style={styles.container2}>
		  <Image style={styles.img} source={require('./../assets/star-svgrepo-com.png')}/>
		  <Text style={styles.txtGenderRating}>{item.rating}</Text>
		</View>
	</View>

	<View style={styles.container3}>
	   <Text style={styles.txtName}>{item.name}</Text>
	</View>

	<View style={styles.container4}>
	   <Text style={styles.header}>Description</Text>
	   <Text style={styles.txtDscrption}>{item.description}</Text>
	</View>

	<View style={styles.container4}>
	   <Text style={styles.header}>Quantity</Text> 
	   <QuantityToggle setQuantity={handleQuantity}/>
	</View>

	<View style={styles.container5}>
	<PricingBar cost={price} navigation={navigation} perfumeId={item.id} quantity={quantity}/>
	</View>

  </View>
  );
};

const styles = StyleSheet.create({

	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop:2,
		backgroundColor:'white'
	   },
	   itemImage:{
		width: width * 0.95, // 50% of screen width
		height: height * 0.40, // 50% of screen height
		resizeMode: 'contain',
		// borderWidth:1,
	   },
	   container1: {
		padding: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop:7,
		flexDirection:'row',
		// borderWidth:1,
		width:width * 0.95
	   },
	   container2: {
		padding: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection:'row'
	   },
	   container3:{
		padding:1,
		alignItems:'flex-start',
		justifyContent:'center',
		width:width * 0.95
	   },
	   container4:{
		padding:1,
		alignItems:'flex-start',
		justifyContent:'center',
		width:width * 0.95,
		marginTop:20
	   },

	   container5:{
		padding:1,
		alignItems:'flex-start',
		justifyContent:'center',
		width:width * 0.95,
		marginTop:70
	   },
	   img:{
		width:30,
		height:30
	   },
	   txtGenderRating:{
		color:'#7B7F81',
		fontSize:17,
	   },
	   txtName:{
		fontSize:25,
		fontWeight:'bold',
		color:'black'
	   },
	   header:{
		fontSize:20,
		fontWeight: 'bold',
		color:'black'
	   },
	   txtDscrption:{
		fontSize:13,
		color:'#716E6E'
	   }


});

export default SelectedItem;
