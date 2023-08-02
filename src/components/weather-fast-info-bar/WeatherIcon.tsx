import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '@assets/svg/cloud and sun 1.svg';

const WeatherIcon = () => (
	<View style={styles.container}>
		<Icon style={styles.icon} />
		<Text style={styles.text}>Cloudy</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		gap: 14,
		alignItems: 'center',
	},
	icon: {
		width: 107,
		height: 107,
	},
	text: {
		textAlign: 'center',
		color: '#fff',
		fontFamily: 'ProductSans',
		fontSize: 22,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 28 /* 127.273% */,
	},
});

export default WeatherIcon;
