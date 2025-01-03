import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ItemScreen from './screens/SelectedItemScreen';
import CartScreen from './screens/CartScreen'; 
import CheckoutScreen from './screens/CheckoutScreen';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Tab from './util/tab'

const loadFonts = async () => {
	await Font.loadAsync({
	  'CustomFont': require('./assets/fonts/Kalam-Bold.ttf'),
	});
  };

const Stack = createStackNavigator();


export default function App() {

		  const [fontsLoaded, setFontsLoaded] = useState(false);
	
		  if (!fontsLoaded) {
			return (
			  <AppLoading
				startAsync={loadFonts}
				onFinish={() => setFontsLoaded(true)}
				onError={console.warn}
			  />
			);
		  };
	
	return(
		<NavigationContainer>
	<Stack.Navigator initialRouteName='Login'>
		<Stack.Screen  name='Login' component={LoginScreen} options={{
			headerTitle:'Tega Scent',
			headerTitleAlign:'center',
			headerTitleStyle: {
				fontSize:35,
				fontFamily:'CustomFont',
			  },
			headerShadowVisible:false	
		}}/>
		<Stack.Screen name='Signup' component={SignupScreen} options={{
			headerTitle:'Tega Scent',
			headerTitleAlign:'center',
			headerTitleStyle: {
				fontSize:35,
				fontFamily:'CustomFont',
			  },
			  headerShadowVisible:false
		}}/>
		<Stack.Screen name='Home' component={HomeScreen} options={({ navigation }) => ({
        headerLeft: () => null,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        header: () => <Tab navigation={navigation} />, // Pass navigation prop here
    })}/>
		<Stack.Screen name='Cart' component={CartScreen}/>
		<Stack.Screen name='ItemSelected' component={ItemScreen}/>	
		<Stack.Screen name='Checkout' component={CheckoutScreen}/>	
	</Stack.Navigator>
</NavigationContainer>
	)

}



