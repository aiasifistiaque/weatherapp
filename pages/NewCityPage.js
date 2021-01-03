import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import HomeWeatherDetails from '../components/HomeWeatherDetails';
import DailyForecastGraph from '../components/DailyForecastGraph';
import SevenDaysButton from '../components/SevenDaysButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spinner } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { unixToHourMin, unixToHourMinSec } from '../functions';
//import { useNavigation } from '@react-navigation/native';

export default function NewCityPage({ navigation, route }) {
	const city = route.params.city;
	console.log(city);
	const apiKey = '71ec2116412340086c7505360fac679d';
	const [weather, setWeather] = useState({});
	const [loading, setLoading] = useState(true);
	//const navigation = useNavigation();

	const getTime = unix => {
		const date = new Date(unix * 1000);
		const hour = date.getHours();
		const min = date.getMinutes();
		return hour + ':' + min;
	};
	const dayImage = {
		uri:
			'http://gm1.ggpht.com/Yuv_NREvMbiv6QVMRkgPUjKatfHJw_iBRG6nip5ADa9k2yq8_ZB8ArAbASdiH8pYx2Tnh2x-bIVQhHtrAFRUNzFpX8RLldOEm_AauCTuw7bGeharzxGod-YikhOxx_0T3DpqJPzOrrKm1wlDDdW6PtCGeBLq7FeEk2X5F43XFZTCCtXP-pUsl0AFod3vwW4mZZ8xT5h3Vhly65PqWNFRli60rrrJBShyzSFqc-tfiL342Solf1qaANaJv25Y8zIydIyaTcREcez1F1xOuZVXxtsXnsU8h_NWL3KIQKijFfOvmAUIzVZ2umRUbt-Md_DK3j-ezHZOVbPpXY3b_ZFXE6IoABjcUFeAgmlUhtUHpTHgYLpDcCCk_hk26vGWoWnL0yx9jldf_eW5bN-Ix8g_8je6wlag8PVtX9FuN3_Q-_Yy0Gdc1XhXxeXDj8cz9qxSvQtjb3vazImGNQPwu2dIoIdf-r3NDIlcZdx00U2QJAEozeCEfYYroI75R9T6mGCISJRUjhW90jLJ-Jw-DgwFINawGJ7bpS1APL2GuD6PlOssoCj6mvb6Rlqb7CAh44rYNaokCXNtH0NSyl6VYaMkP9IG2M0W2zKSF8tMJMrafbh97KFyVdxt8i1lANOqd2zNl9CrS74-ciPYIZuEbez0eS8CfNOFI7FDyJ74fMtqIHn7IwAEUrz2kuI0b6Uu6nt4JDL2y_dWjbffJCzitdrQ5aYLzAK1EamZnb4ua8EpCMm4aanqCUGZuP01Ye5hs-dPrvY3=s0-l75-ft-l75-ft',
	};
	const nightImage = {
		uri:
			'https://images.pexels.com/photos/5345033/pexels-photo-5345033.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	};

	const getHour = unix => {
		const date = new Date(unix * 1000);
		const hour = date.getHours();
		if (hour == 0) return '12AM';
		if (hour == 12) return '12PM';
		if (hour < 12) return hour + 'AM';
		if (hour > 12) return hour - 12 + 'PM';
	};

	const getHourMin = unix => {
		const date = new Date(unix * 1000);
		const hour = date.getHours();
		if (hour == 0)
			return '12:' + date.getMinutes() + ':' + date.getSeconds() + ' AM';
		if (hour == 12)
			return '12:' + date.getMinutes() + ':' + date.getSeconds() + ' PM';
		if (hour < 12)
			return hour + ':' + date.getMinutes() + ':' + date.getSeconds() + ' AM';
		if (hour > 12)
			return (
				hour - 12 + ':' + date.getMinutes() + ':' + date.getSeconds() + ' PM'
			);
	};

	const don = now => {
		if (!loading) {
			if (now >= weather.daily[0].sunrise && now <= weather.daily[0].sunset) {
				return 'day';
			}
			if (now >= weather.daily[1].sunrise && now <= weather.daily[1].sunset) {
				return 'day';
			}
			if (now >= weather.daily[2].sunrise && now <= weather.daily[2].sunset) {
				return 'day';
			}
			if (now >= weather.daily[3].sunrise && now <= weather.daily[3].sunset) {
				return 'day';
			}
			if (now >= weather.current.sunrise && now <= weather.current.sunset) {
				return 'day';
			} else return 'night';
		}
	};

	useEffect(() => {
		setLoading(true);
		fetch(
			'https://api.openweathermap.org/data/2.5/onecall?lat=' +
				city.lat +
				'&lon=' +
				city.lng +
				'&exclude={part}&appid=a6c04bf941e82d855d969d0644aaa228'
		)
			.then(res => res.json())
			.then(res => {
				setWeather(res);
				console.log(res);
				setLoading(false);
			})
			.catch(e => {
				console.log('error', e);
				//setLoading(false);
			});
	}, []);

	let text = 'Waiting for current location..';
	const image = {
		uri:
			'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	};

	if (loading)
		return (
			<View style={styles.container}>
				<ImageBackground
					source={require('../assets/night.jpeg')}
					style={styles.image}>
					<Spinner color='white' />
				</ImageBackground>
			</View>
		);
	else
		return (
			<View style={styles.container}>
				<StatusBar style='light' />

				<ImageBackground
					source={
						!loading && don(weather.current.dt) == 'day'
							? require('../assets/day.jpg')
							: require('../assets/night.jpeg')
					}
					style={styles.image}>
					<SafeAreaView style={styles.topSection}>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'space-between',
								flexDirection: 'row',
								paddingBottom: 20,
							}}>
							<TouchableOpacity
								onPress={() =>
									navigation.reset({
										index: 0,
										routes: [{ name: 'Home' }],
									})
								}>
								<Entypo name='cross' size={25} color='white' />
							</TouchableOpacity>

							{!loading && (
								<Text
									style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
									{weather.timezone}
								</Text>
							)}

							<Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>
								{unixToHourMin(weather.current.dt + weather.timezone_offset)}
							</Text>
						</View>
						<ScrollView>
							<View>
								<View style={styles.topFragments}>
									<View>
										<Text style={styles.topText}>temperature</Text>
										<Text style={styles.topText}>Last updated:</Text>
										{!loading && (
											<Text style={styles.topText}>
												{unixToHourMin(
													weather.current.dt + weather.timezone_offset
												)}
											</Text>
										)}
									</View>

									<View style={styles.tempBox}>
										{!loading && (
											<View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'flex-end',
													}}>
													<Text style={styles.temp}>
														{Math.round(weather.current.temp - 273.15)}
													</Text>
													<Text style={styles.degreeC}>&#x2103;</Text>
												</View>

												<View
													style={{
														flex: 1,
														alignSelf: 'center',
													}}>
													<Text
														style={{
															color: 'whitesmoke',
															fontSize: 18,
															fontWeight: '500',
														}}>
														{weather.current.weather[0].description}
													</Text>
												</View>
											</View>
										)}
									</View>
								</View>
								<View style={styles.topFragmentsTwo}>
									<View style={styles.feel}>
										<Text style={styles.topText}>real feel</Text>
										<Text style={styles.topText}>wind</Text>
										<Text style={styles.topText}>humidity</Text>
									</View>
									{!loading && (
										<View style={styles.feel}>
											<Text style={styles.topText}> </Text>
											<Text style={styles.topText}>
												{weather.current.wind_speed}km/h
											</Text>
											<Text style={styles.topText}>
												{weather.current.humidity}%
											</Text>
										</View>
									)}
									<View style={styles.tempBox}>
										{!loading && (
											<Text style={styles.temp}>
												{Math.round(weather.current.feels_like - 273.15)}
											</Text>
										)}
										<Text style={styles.degreeC}>&#x2103;</Text>
									</View>
								</View>
								{!loading && (
									<DailyForecastGraph weather={weather} getHour={getHour} />
								)}
							</View>
						</ScrollView>
					</SafeAreaView>
					<View style={styles.bottomSection}>
						{!loading && <HomeWeatherDetails weather={weather} />}
						<View style={styles.bottomContainerTwo}>
							<SevenDaysButton
								onPress={() =>
									navigation.navigate('Forecast', {
										forecast: weather.daily,
										image:
											!loading && weather.current.dt < weather.current.sunset
												? dayImage
												: nightImage,
									})
								}
							/>
						</View>
					</View>
				</ImageBackground>
			</View>
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	topSection: {
		flex: 6,
		marginLeft: '5%',
		width: '90%',
		paddingVertical: 10,
	},
	topFragments: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	topFragmentsTwo: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: 50,
	},
	feel: { flex: 1, flexDirection: 'column' },
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
	bottomSection: { flex: 4, width: '100%' },

	bottomContainerTwo: { flex: 1 },

	topText: {
		fontSize: 20,
		color: 'whitesmoke',
		fontWeight: '600',
	},
	tempBox: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
	},
	temp: {
		fontSize: 50,
		fontWeight: '600',
		color: 'whitesmoke',
	},
	degreeC: {
		color: 'whitesmoke',
		marginTop: 10,
		fontSize: 25,
		fontWeight: 'bold',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		width: '100%',
	},
	bottomDescriptions: {
		backgroundColor: 'red',
		flex: 1,
		alignItems: 'center',
	},
});
