import React from 'react';
import { StyleSheet, View } from 'react-native';
import WeatherIcon from './WeatherIcon';
import Cals from './Cals';

export function WeatherFastInfoBar() {
	return (
		<View style={styles.container}>
			<Cals v={3} cv={-2} />
			<WeatherIcon />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
