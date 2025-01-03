import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import Item from './../util/Item';

import axiosInstance from '../util/jwt';

const Home = ({navigation}) => {
const [items,setItems] = useState([])
  
useEffect(() => {
  async function fetchData() {
    try {
      const response = await axiosInstance.get(`/perfumes/items`);
      setItems(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }
  fetchData();
}, []); // Re-run effect when `someId` changes


  return (
    <View style={styles.container}> 
    <FlatList data={items} 
	    keyExtractor={(item,index)=>index.toString()}
	    renderItem={({item})=><Item navigation={navigation} id={item.id} url={item.img} name={item.name} cost={item.price} gender={item.gender} />}
	    numColumns={2} />
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
    backgroundColor:'white'
	   },
});

export default Home;
