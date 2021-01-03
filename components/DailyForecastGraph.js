import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { unixToHour } from '../functions';

export default function DailyForecastGraph({ weather, getHour }) {
	const size = 12;
	const setStar = now => {
		if (now >= weather.daily[0].sunrise && now <= weather.daily[0].sunset) {
			return (
				<MaterialCommunityIcons
					name='white-balance-sunny'
					size={size}
					color='yellow'
				/>
			);
		}
		if (now >= weather.daily[1].sunrise && now <= weather.daily[1].sunset) {
			return (
				<MaterialCommunityIcons
					name='white-balance-sunny'
					size={size}
					color='yellow'
				/>
			);
		}
		if (now >= weather.daily[2].sunrise && now <= weather.daily[2].sunset) {
			return (
				<MaterialCommunityIcons
					name='white-balance-sunny'
					size={size}
					color='yellow'
				/>
			);
		}
		if (now >= weather.daily[3].sunrise && now <= weather.daily[3].sunset) {
			return (
				<MaterialCommunityIcons
					name='white-balance-sunny'
					size={size}
					color='yellow'
				/>
			);
		}
		if (now >= weather.current.sunrise && now <= weather.current.sunset) {
			return (
				<MaterialCommunityIcons
					name='white-balance-sunny'
					size={size}
					color='yellow'
				/>
			);
		} else return <Entypo name='moon' size={size} color='white' />;
	};

	const highest = weather.daily[0].temp.max;
	const lowest = weather.daily[0].temp.min;
	const diff = highest - lowest;

	const margin = temp => {
		const x = diff + temp - 273.15;
		console.log(x);
		let top = highest;
		if (weather.daily[2].temp.max > weather.daily[1].temp.max) {
			top = weather.daily[2].temp.max;
		} else if (weather.daily[1].temp.max > weather.daily[0].temp.max) {
			top = weather.daily[1].temp.max;
		}
		const difference = top - temp;
		return x * 1.3333;
	};

	return (
		<ScrollView
			horizontal={true}
			style={{
				flex: 1,
				marginVertical: 10,
			}}>
			<View
				style={{
					height: 150,
					flexDirection: 'row',
					alignItems: 'flex-end',
				}}>
				{weather.hourly.map(
					(now, i) =>
						i < 40 && (
							<View
								key={now.dt}
								style={{
									flex: 1,
									paddingHorizontal: 2,
									alignItems: 'center',
								}}>
								<Text
									style={{ color: 'white', paddingBottom: margin(now.temp) }}>
									{setStar(now.dt)}
								</Text>
								<Text style={{ color: 'white' }}>
									{Math.round(now.temp - 273.15)}&#176;
								</Text>
								<Text style={{ color: 'white', paddingVertical: 10 }}>
									{unixToHour(now.dt + weather.timezone_offset)}
								</Text>
							</View>
						)
				)}
			</View>
		</ScrollView>
	);
}
