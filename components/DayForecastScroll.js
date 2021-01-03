import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function DayForecastScroll({ weather, loading, getHour }) {
	return (
		<View style={styles.forcast}>
			<ScrollView horizontal={true} style={styles.forecastScroll}>
				{!loading &&
					weather.hourly.map((weather, i) => (
						<View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
							{i == 0 ? (
								<Text style={styles.forecastText}>NOW</Text>
							) : (
								<Text style={styles.forecastText}>{getHour(weather.dt)}</Text>
							)}
							<Text style={styles.forecastText}>{weather.weather[0].main}</Text>
							<Text style={styles.forecastText}>
								{Math.round(weather.temp - 273.15)}&#176;
							</Text>
						</View>
					))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	forcast: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		borderBottomColor: 'whitesmoke',
		borderTopColor: 'whitesmoke',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		alignItems: 'center',
		paddingVertical: 20,
		marginTop: 50,
	},
	forecastScroll: {},
	forecastText: {
		color: 'white',
		fontSize: 18,
	},
});
