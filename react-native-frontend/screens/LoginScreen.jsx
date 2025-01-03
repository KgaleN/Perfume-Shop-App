import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import TxtBox from './../textboxes/textBox';
import Btn from '../buttons/loginBtn';
import SignupLink from './../buttons/lnk';

function LoginScreen({navigation}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	

  return (
    <View style={styles.container}> 
    <View style={styles.container1}>
     <Text style={styles.login_header}>Login</Text>
    </View>
   
    <View style={styles.container2}>
     <TxtBox inputLabel='Email' setInputValue={setEmail}/>
     <TxtBox inputLabel='Password' setInputValue={setPassword}/>
    </View>
   
    <View style={styles.container3}>
     <Btn navigation={navigation} btnLabel='Login' email={email} password={password} />
    </View>
   
    <View style={styles.container4}>
     <Text style={styles.txt}>Don't have an account? </Text><SignupLink navigation={navigation} linkLabel=' Sign up'/>
    </View>
</View>
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
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor:'white'
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
	   
	   container4: {
		padding:10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop:35,
		flexDirection:'row'
	   },
});


export default LoginScreen;
