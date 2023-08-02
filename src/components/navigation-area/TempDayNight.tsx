import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TempDayNight = () => (
	<View style={styles.container}>
		<Text style={[styles.font, styles.day]}>Day 3°</Text>
		<Text style={[styles.font, styles.night]}>Night -1°</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {},
	day: {},
	night: {},
	font: {
		color: '#fff',
		fontFamily: 'ProductSans',
		fontSize: 18,
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: 24,
		letterSpacing: 0.1,
	},
});

export default TempDayNight;
