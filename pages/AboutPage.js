import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

export default function AboutPage() {
	return (
		<View style={styles.container}>
			<Text>Temperature</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
});
