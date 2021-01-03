import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './tabnavigator';

export default function Navigator() {
	return (
		<NavigationContainer>
			<TabNavigator />
		</NavigationContainer>
	);
}
