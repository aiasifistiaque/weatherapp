import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from '../../pages/HomePage';
import AboutScreen from '../../pages/AboutPage';
import SevenDayForcast from '../../pages/SevenDayUpdated';
import { createStackNavigator } from '@react-navigation/stack';
import CitiesPage from '../../pages/CitiesPage';
import NewCityPage from '../../pages/NewCityPage';

const Stack = createStackNavigator();

export function BasicStackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='Forecast' component={SevenDayForcast} />
			<Stack.Screen name='About' component={AboutScreen} />
			<Stack.Screen name='Cities' component={CitiesPage} />
			<Stack.Screen name='Newcity' component={NewCityPage} />
		</Stack.Navigator>
	);
}
