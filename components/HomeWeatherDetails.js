import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { unixToHourMin } from '../functions';

export default function HomeWeatherDetails({ weather }) {
	const getTime = unix => {
		const date = new Date(unix * 1000);
		const hour = date.getHours();
		const min = date.getMinutes();
		return hour + ':' + min;
	};
	const getHourMin = unix => {
		const date = new Date(unix * 1000);
		const hour = date.getHours();
		if (hour == 0) return '12:' + date.getMinutes() + ' AM';
		if (hour == 12) return '12:' + date.getMinutes() + ' PM';
		if (hour < 12) return hour + ':' + date.getMinutes() + ' AM';
		if (hour > 12) return hour - 12 + ':' + date.getMinutes() + ' PM';
	};

	return (
		<View style={styles.bottomContainerOne}>
			<View style={styles.bottomContainerOneRows}>
				<View style={styles.valuePair}>
					<Text style={styles.bottomContainerOneText}>Sunrise</Text>
					<Text style={styles.bottomContainerOneValue}>
						{unixToHourMin(weather.current.sunrise + weather.timezone_offset)}
					</Text>
				</View>
				<View style={styles.valuePair}>
					<Text style={styles.bottomContainerOneText}>Sunset</Text>
					<Text style={styles.bottomContainerOneValue}>
						{unixToHourMin(weather.current.sunset + weather.timezone_offset)}
					</Text>
				</View>
			</View>
			<View style={styles.bottomContainerOneRows}>
				<View style={styles.valuePair}>
					<Text style={styles.bottomContainerOneText}>Pressure</Text>
					<Text style={styles.bottomContainerOneValue}>
						{weather.current.pressure}
					</Text>
				</View>
				<View style={styles.valuePair}>
					<Text style={styles.bottomContainerOneText}>Humidity</Text>
					<Text style={styles.bottomContainerOneValue}>
						{weather.current.humidity}%
					</Text>
				</View>
			</View>
			<View style={styles.bottomContainerOneRows}>
				<View style={styles.valuePair}>
					<Text style={styles.bottomContainerOneText}>Visibility</Text>
					<Text style={styles.bottomContainerOneValue}>
						{weather.current.visibility / 1000} mi
					</Text>
				</View>
				<View style={styles.valuePair}>
					<Text style={styles.bottomContainerOneText}>UV Index</Text>
					<Text style={styles.bottomContainerOneValue}>
						{weather.current.uvi}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	bottomContainerOne: {
		flex: 3,
		paddingHorizontal: 25,
	},
	bottomContainerOneRows: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	valuePair: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	bottomContainerOneText: {
		color: 'whitesmoke',
		fontSize: 20,
		fontWeight: '600',
	},
	bottomContainerOneValue: {
		color: 'white',
		fontSize: 15,
		fontWeight: '600',
	},
});
