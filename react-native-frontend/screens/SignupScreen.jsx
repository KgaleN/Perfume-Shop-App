import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import TxtBox from './../textboxes/textBox';
import Btn from '../buttons/signupBtn';

const SignupScreen = ({navigation}) => {
 const [name,setName] = useState('');
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const [gender, setGender] = useState('');
 const [phone, setPhone] = useState('');
 const [streetAddress, setStreetAddress] = useState('');
 const [city,setCity] = useState('');
 const [province, setProvince] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}> 
    <View style={styles.container1}>
     <Text style={styles.login_header}>Sign up</Text>
    </View>
   
    <View style={styles.container2}>
	 <TxtBox inputLabel='Name' setInputValue={setName}/>
     <TxtBox inputLabel='Email' setInputValue={setEmail}/>
	 <TxtBox inputLabel='Password' setInputValue={setPassword}/>
	 <TxtBox inputLabel='Gender' setInputValue={setGender}/>
	 <TxtBox inputLabel='Phone' setInputValue={setPhone}/>
	 <TxtBox inputLabel='Street Address' setInputValue={setStreetAddress}/>
     <TxtBox inputLabel='City' setInputValue={setCity} />
	 <TxtBox inputLabel='Province' setInputValue={setProvince}/>
    </View>
   
    <View style={styles.container3}>
     <Btn 
	 name={name}
	 email={email} 
	 password={password} 
	 gender={gender} 
	 streetAddress={streetAddress} 
	 city={city} 
	 phone={phone}
	 province={province}
	 navigation={navigation}/>
	 
    </View>
     
   
   
     </ScrollView>
  );
};

const styles = StyleSheet.create({
	txt:{
		fontSize:15,
		color:'#000000',
	},
	logo:{
        fontSize:37,
		fontWeight: 'bold',
		paddingBottom:40,
	},
	login_header:{
        fontSize:27,
		fontWeight: 'bold',		
	},
	container: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white'
	   },

	container1: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop:24,
		padding:10
	   },

	container2: {
		padding:10,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop:35
	   },

	   container3: {
		padding:10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop:85
	   },
});


export default SignupScreen;
