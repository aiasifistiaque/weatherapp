import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Spinner } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchBar(props) {
	const navigation = useNavigation();
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const [cities, setCities] = useState([]);
	const [searching, setSearching] = useState(false);
	const backend = 'https://weahterbackend.herokuapp.com/city/search';

	useEffect(() => {
		setLoading(true);
		setSearching(true);
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
				setLoading(false);
				setSearching(false);
			});
	}, [text]);

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					width: '100%',
					flexDirection: 'row',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
				}}>
				<MaterialIcons
					name='keyboard-arrow-left'
					size={40}
					color='rgba(255,255,255,.6)'
					onPress={props.back}
				/>
				<TextInput
					style={styles.textInput}
					placeholder='search'
					placeholderTextColor='rgba(255,255,255,.4)'
					onChangeText={text => setText(text)}
					value={text}
				/>
			</View>

			{text.length > 0 ? (
				!loading ? (
					<ScrollView style={styles.addScroll}>
						{cities.length == 0 ? (
							<View
								style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<Text
									style={{
										marginTop: 20,
										fontSize: 25,
										fontWeight: '600',
										color: 'white',
									}}>
									No result found
								</Text>
							</View>
						) : (
							cities.map((city, i) => (
								<TouchableOpacity
									style={styles.searchCity}
									onPress={() =>
										navigation.navigate('Newcity', { city: city })
									}>
									<Text
										style={{ fontSize: 20, fontWeight: '500', color: 'white' }}
										key={i}>
										{city.city}
									</Text>
									<MaterialIcons
										name='keyboard-arrow-right'
										size={30}
										color='rgba(255,255,255,.9)'
									/>
								</TouchableOpacity>
							))
						)}
					</ScrollView>
				) : (
					<Spinner color='white' style={{ marginTop: 100 }} />
				)
			) : (
				<View style={{ flex: 1 }}>
					<Text
						style={{ marginTop: 20, fontSize: 25, fontWeight: '600' }}></Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 20,
	},
	textInput: {
		height: 40,
		paddingHorizontal: 20,
		width: '80%',
		backgroundColor: 'rgba(255,255,255,.15)',
		borderRadius: 500 / 2,
		color: 'white',
	},
	searchCity: {
		padding: 20,
		paddingVertical: 30,
		backgroundColor: 'rgba(255,255,255,.1)',
		width: '100%',
		marginBottom: 10,
		marginTop: 10,

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
		//backgroundColor: 'rgba(0,0,0,.6)',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 5,
	},
});
