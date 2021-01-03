import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CitiesPage({ navigation }) {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(true);
	const [cities, setCities] = useState([]);

	const backend = 'https://weahterbackend.herokuapp.com/city/search';

	useEffect(() => {
		setLoading(true);
		fetch(backend, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				searchString: text,
			}),
		})
			.then(res => res.json())
			.then(res => {
				setCities(res.cities);
				console.log(res);
				setLoading(false);
			});
	}, [text]);

	useEffect(() => {
		getAllKeys();
	}, []);

	const getAllCities = async () => {
		try {
			const keys = await AsyncStorage.getAllKeys();
		} catch (e) {
			// read key error
		}
		if (keys) {
			setCities(keys);
		} else {
			setCities([]);
		}
	};

	const storeId = async value => {
		try {
			await AsyncStorage.setItem('@storage_Key', value);
		} catch (e) {
			// saving error
		}
	};

	const storeCity = async value => {
		setCities(...cities, value.city);
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(`${value.city}`, jsonValue);
		} catch (e) {
			// saving error
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.textInput}
				placeholder='search'
				onChangeText={text => setText(text)}
				value={text}
			/>

			{text.length > 0 ? (
				!loading && (
					<ScrollView style={styles.addScroll}>
						{cities.map((city, i) => (
							<View style={styles.searchCity}>
								<Text style={{ fontSize: 20, fontWeight: '500' }} key={i}>
									{city.city}
								</Text>
								<TouchableOpacity
									style={styles.addButton}
									onPress={() =>
										navigation.navigate('Newcity', { city: city })
									}>
									<Text style={{ color: 'white', fontWeight: '600' }}>Add</Text>
								</TouchableOpacity>
							</View>
						))}
					</ScrollView>
				)
			) : (
				<View style={{ flex: 1 }}>
					<Text style={{ marginTop: 20, fontSize: 25, fontWeight: '600' }}>
						My Cities
					</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 20,
		backgroundColor: 'white',
	},
	textInput: {
		height: 50,
		width: '80%',
		paddingHorizontal: 20,

		backgroundColor: 'whitesmoke',
		borderRadius: 500 / 2,
	},
	searchCity: {
		padding: 20,
		paddingVertical: 30,
		backgroundColor: 'whitesmoke',
		width: '100%',
		marginBottom: 10,
		marginTop: 10,
		shadowColor: 'black',
		shadowRadius: 2,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	addScroll: {
		width: '80%',
	},
	addButton: {
		backgroundColor: 'rgba(0,0,0,.6)',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 5,
	},
});
