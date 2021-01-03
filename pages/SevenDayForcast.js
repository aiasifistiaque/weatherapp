import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SevenDayForcast({ route }) {
	const days = route.params.forecast;
	const getTime = unix => {
		const date = new Date(unix * 1000);
		const hour = date.getHours();
		const min = date.getMinutes();
		const day = date.getDay();
		let dayName = '';
		if (day == 0) {
			return 'Sun';
		} else if (day == 1) {
			return 'Mon';
		} else if (day == 2) {
			return 'Tue';
		} else if (day == 3) {
			return 'Wed';
		} else if (day == 4) {
			return 'Thurs';
		} else if (day == 5) {
			return 'Fri';
		} else if (day == 6) {
			return 'Sat';
		}
	};
	return (
		<View style={styles.container}>
			<ImageBackground
				//source={route.params.image}
				style={{
					flex: 1,
					resizeMode: 'cover',
					justifyContent: 'center',
					width: '100%',
				}}>
				<View style={styles.headerRow}>
					<Text style={styles.temp}>Day</Text>
					<Text style={styles.temp}>Conditions</Text>
					<Text style={styles.temp}>Max / Min</Text>
				</View>
				{days.map(day => (
					<View style={styles.rows} key={day.dt}>
						<Text style={styles.temp}>{getTime(day.dt)}</Text>
						<Text style={styles.temp}>{day.weather[0].main}</Text>
						<Text style={styles.temp}>
							{Math.round(day.temp.max - 273.15)}&#176; /
							{' ' + Math.round(day.temp.min - 273.15)}&#176;
						</Text>
					</View>
				))}
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'dodgerblue',
	},
	rows: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginHorizontal: 50,
	},
	headerRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 0.5,
		borderBottomColor: 'whitesmoke',
		marginBottom: 20,
		marginHorizontal: 50,
	},
	temp: {
		fontSize: 20,
		fontWeight: '600',
		color: 'whitesmoke',
	},
});
