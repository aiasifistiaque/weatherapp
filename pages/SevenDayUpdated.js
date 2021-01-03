import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDayName } from '../functions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function SevenDayUpdated({ route, navigation }) {
	const days = route.params.forecast;
	const getTime = unix => {
		const date = new Date(unix * 1000);
		const hour = date.getHours();
		const min = date.getMinutes();
		const day = date.getDay();
		const dayName = getDayName(day);
		return dayName;
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/ForecastBackground.jpg')}
				style={{
					flex: 1,
					resizeMode: 'cover',
					justifyContent: 'center',
					width: '100%',
				}}>
				<SafeAreaView
					style={{
						flex: 2,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Text style={{ color: 'white', fontSize: 38, fontWeight: '600' }}>
						7 DAY FORECAST
					</Text>
				</SafeAreaView>
				<View style={{ flex: 3 }}>
					<ScrollView horizontal>
						{days.map((day, i) => (
							<View style={styles.rows} key={day.dt}>
								<ImageBackground
									source={require('../assets/box.jpg')}
									style={{
										resizeMode: 'cover',
										width: '100%',
										alignItems: 'center',
										height: '100%',
									}}>
									<View
										style={{
											width: '100%',
											backgroundColor:
												i == 0 ? '#EA7E00' : 'rgba(255,255,255,.9)',
											flex: 1,
											alignItems: 'center',
											justifyContent: 'center',
											borderTopRightRadius: 2,
											borderTopLeftRadius: 2,
											borderBottomWidth: 6,
											borderBottomColor: '#EA7E00',
										}}>
										<Text
											style={[
												styles.temp,
												{ color: i == 0 ? 'white' : 'black', fontSize: 30 },
											]}>
											{getTime(day.dt)}
										</Text>
									</View>
									<View
										style={{
											flex: 4,
											alignItems: 'center',
											justifyContent: 'space-around',
											paddingBottom: 20,
											paddingTop: 2,
										}}>
										<Text
											style={{
												color: 'whitesmoke',
												fontSize: 20,
												fontWeight: '500',
											}}>
											{day.weather[0].main}
										</Text>
										<GetWeatherIcon data={day} />
										<View
											style={{
												alignItems: 'center',
												justifyContent: 'center',
											}}>
											<Text style={styles.max}>
												{Math.round(day.temp.max - 273.15)}
											</Text>
											<Text style={styles.min}>
												{Math.round(day.temp.min - 273.15)}
											</Text>
										</View>
									</View>
								</ImageBackground>
							</View>
						))}
					</ScrollView>
				</View>
				<View
					style={{
						flex: 2,
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
					}}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.backButton}>
						<Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
							Go Back
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
}

const GetWeatherIcon = ({ data }) => {
	const size = 60;
	if (data.weather[0].id == 800)
		return (
			<Image
				source={require('../assets/sunny.png')}
				fadeDuration={0}
				style={{ width: size, height: size, marginTop: -10 }}
			/>
		);
	else if (data.weather[0].id > 800)
		return (
			<Image
				source={require('../assets/cloudy.png')}
				fadeDuration={0}
				style={{ width: 90, height: size, marginTop: -10 }}
			/>
		);
	else if (data.weather[0].id < 800)
		return (
			<Image
				source={require('../assets/rainy.png')}
				style={{ width: 90, height: size, marginTop: -10 }}
			/>
		);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
	},
	rows: {
		width: 94,
		flexDirection: 'column',
		marginHorizontal: 5,
		borderRadius: 5,
		alignItems: 'center',
	},
	headerRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		//borderBottomWidth: 0.5,
		//borderBottomColor: 'whitesmoke',

		marginHorizontal: 50,
	},
	temp: {
		fontSize: 20,
		fontWeight: '600',
		color: 'whitesmoke',
		margin: 0,
	},
	max: {
		fontSize: 40,
		fontWeight: '700',
		color: 'whitesmoke',
		margin: 0,
	},
	min: {
		fontSize: 30,
		fontWeight: '400',
		color: 'whitesmoke',
		margin: 0,
		padding: 0,
		marginTop: -5,
	},
	backButton: {
		backgroundColor: 'rgba(0,0,0,.35)',
		paddingHorizontal: 120,
		paddingVertical: 18,
		width: '90%',
		borderRadius: 5,
	},
});
