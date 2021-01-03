import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	RefreshControl,
} from 'react-native';
import * as Location from 'expo-location';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import HomeWeatherDetails from '../components/HomeWeatherDetails';
import DailyForecastGraph from '../components/DailyForecastGraph';
import SearchBar from '../components/SearchBar';
import SevenDaysButton from '../components/SevenDaysButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spinner } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { unixToHourMin } from '../functions';

const wait = timeout => {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
};

export default function App({ navigation }) {
	const [spin, setSpin] = useState(false);
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [locationDetected, setLocationDetected] = useState(false);
	const apiKey = '71ec2116412340086c7505360fac679d';
	const [weather, setWeather] = useState({});
	const [loading, setLoading] = useState(true);
	const [isSearchActivated, setIsSearchAvtivated] = useState(false);

	const getTime = unix => {
		const date = new Date(unix * 1000);
		const hour = date.getHours();
		const min = date.getMinutes();
		return hour + ':' + min;
	};
	const dayImage = {
		uri:
			'https://gm1.ggpht.com/Yuv_NREvMbiv6QVMRkgPUjKatfHJw_iBRG6nip5ADa9k2yq8_ZB8ArAbASdiH8pYx2Tnh2x-bIVQhHtrAFRUNzFpX8RLldOEm_AauCTuw7bGeharzxGod-YikhOxx_0T3DpqJPzOrrKm1wlDDdW6PtCGeBLq7FeEk2X5F43XFZTCCtXP-pUsl0AFod3vwW4mZZ8xT5h3Vhly65PqWNFRli60rrrJBShyzSFqc-tfiL342Solf1qaANaJv25Y8zIydIyaTcREcez1F1xOuZVXxtsXnsU8h_NWL3KIQKijFfOvmAUIzVZ2umRUbt-Md_DK3j-ezHZOVbPpXY3b_ZFXE6IoABjcUFeAgmlUhtUHpTHgYLpDcCCk_hk26vGWoWnL0yx9jldf_eW5bN-Ix8g_8je6wlag8PVtX9FuN3_Q-_Yy0Gdc1XhXxeXDj8cz9qxSvQtjb3vazImGNQPwu2dIoIdf-r3NDIlcZdx00U2QJAEozeCEfYYroI75R9T6mGCISJRUjhW90jLJ-Jw-DgwFINawGJ7bpS1APL2GuD6PlOssoCj6mvb6Rlqb7CAh44rYNaokCXNtH0NSyl6VYaMkP9IG2M0W2zKSF8tMJMrafbh97KFyVdxt8i1lANOqd2zNl9CrS74-ciPYIZuEbez0eS8CfNOFI7FDyJ74fMtqIHn7IwAEUrz2kuI0b6Uu6nt4JDL2y_dWjbffJCzitdrQ5aYLzAK1EamZnb4ua8EpCMm4aanqCUGZuP01Ye5hs-dPrvY3=s0-l75-ft-l75-ft',
	};
	const nightImage = {
		uri:
			'https://images.pexels.com/photos/5345033/pexels-photo-5345033.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	};

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		//setLoading(true);
		fetch(
			'https://api.openweathermap.org/data/2.5/onecall?lat=23.71&lon=90.41&exclude={part}&appid=a6c04bf941e82d855d969d0644aaa228'
		)
			.then(res => res.json())
			.then(res => {
				setWeather(res);
				setLoading(false);
				setRefreshing(false);
			})
			.catch(e => {
				console.log('error', e);
				//setLoading(false);
			});
	}, []);

	const getHour = unix => {
		const date = new Date(unix * 1000);
		const hour = date.getHours();
		if (hour == 0) return '12AM';
		if (hour == 12) return '12PM';
		if (hour < 12) return hour + 'AM';
		if (hour > 12) return hour - 12 + 'PM';
	};

	const getHourTime = unix => {
		const date = new Date(unix * 1000);
		const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
		const min =
			date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
		const sec =
			date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

		if (hour == 0) return '12:' + min + ' AM';
		if (hour == 12) return '12:' + min + ' PM';
		if (hour < 12) return hour + ':' + min + ' AM';
		if (hour > 12) return hour - 12 + ':' + min + ' PM';
	};

	useEffect(() => {
		setLoading(true);
		fetch(
			'https://api.openweathermap.org/data/2.5/onecall?lat=23.71&lon=90.41&exclude={part}&appid=a6c04bf941e82d855d969d0644aaa228'
		)
			.then(res => res.json())
			.then(res => {
				setWeather(res);
				setLoading(false);
			})
			.catch(e => {
				console.log('error', e);
				//setLoading(false);
			});
	}, []);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let loc = await Location.getCurrentPositionAsync({});
			console.log(loc);
			setLocation(loc);
			if (loc) setLocationDetected(true);
		})();
	}, []);

	let text = 'Waiting for current location..';

	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		console.log(text);
		text = JSON.stringify(location);
	}

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
					{isSearchActivated ? (
						<SearchBar back={() => setIsSearchAvtivated(false)} />
					) : (
						<SafeAreaView style={{ flex: 1 }}>
							<View style={styles.topSection}>
								<View
									style={{
										flexDirection: 'row',
									}}>
									<View style={{ flex: 1 }}>
										<TouchableOpacity
											style={{ paddingHorizontal: 20, paddingVertical: 10 }}
											onPress={() => setIsSearchAvtivated(true)}>
											<Text
												style={{
													color: 'white',
													fontSize: 20,
													fontWeight: '600',
													justifyContent: 'center',
													alignItems: 'center',
												}}>
												+
											</Text>
										</TouchableOpacity>
									</View>

									{!loading && (
										<View
											style={{
												flex: 5,
												alignItems: 'center',
												justifyContent: 'center',
											}}>
											<Text
												style={{
													color: 'white',
													fontSize: 20,
													fontWeight: '600',
												}}>
												{weather.timezone}
											</Text>
										</View>
									)}
									<View
										style={{
											flex: 1.8,
											alignItems: 'center',
											justifyContent: 'center',
										}}>
										<Text
											style={{
												color: 'white',
												fontSize: 15,
												fontWeight: '500',
												paddingRight: 20,
											}}>
											{getHourTime(weather.current.dt)}
										</Text>
									</View>
								</View>
								<ScrollView
									refreshControl={
										<RefreshControl
											refreshing={refreshing}
											onRefresh={onRefresh}
										/>
									}>
									<View
										style={{
											flex: 1,

											alignItems: 'center',
											justifyContent: 'center',
										}}>
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
											<View style={{ width: '90%' }}>
												<DailyForecastGraph
													weather={weather}
													getHour={getHour}
												/>
											</View>
										)}
									</View>
								</ScrollView>
							</View>
							<View style={styles.bottomSection}>
								{!loading && <HomeWeatherDetails weather={weather} />}
								<View style={styles.bottomContainerTwo}>
									<SevenDaysButton
										onPress={() =>
											navigation.navigate('Forecast', {
												forecast: weather.daily,
												image:
													!loading &&
													weather.current.dt < weather.current.sunset
														? dayImage
														: nightImage,
											})
										}
									/>
								</View>
							</View>
						</SafeAreaView>
					)}
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
		paddingTop: 0,
	},
	topSection: {
		flex: 6,
		paddingHorizontal: 0,
		paddingTop: 20,
	},
	topFragments: {
		paddingHorizontal: 20,
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
		marginTop: 40,
		paddingHorizontal: 20,
	},
	feel: { flex: 1, flexDirection: 'column' },

	bottomSection: { flex: 4, width: '100%' },

	bottomContainerTwo: { flex: 1 },

	forcastButtonText: {
		fontSize: 22,
		fontWeight: 'bold',
		color: 'white',
	},
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
