import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function SevenDaysButton(props) {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{
				backgroundColor: 'rgba(0,0,0,.3)',
				padding: 15,
				paddingVertical: 15,
				paddingHorizontal: 20,
				width: '90%',
				alignSelf: 'center',
				//marginHorizontal: 50,
				marginBottom: 5,
				borderRadius: 5,
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Text
				style={{
					fontSize: 20,
					color: 'whitesmoke',
					fontWeight: '600',
				}}>
				7 Day Forcast
			</Text>
		</TouchableOpacity>
	);
}
