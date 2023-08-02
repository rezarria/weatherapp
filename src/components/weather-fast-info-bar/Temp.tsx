import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Temp = (props: { v: number; cv?: number }) => (
	<View style={styles.container}>
		<Text style={styles.cals}>{props.v}°</Text>
		{props.cv && <Text style={styles.feelsLike}>Feels like {props.cv}°</Text>}
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'flex-start',
		alignContent: 'flex-end',
		gap: 0,
	},
	cals: {
		color: '#fff',
		fontFamily: 'ProductSans',
		fontSize: 112,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 112,
	},
	feelsLike: {
		marginLeft: -22,
		color: '#fff',
		fontFamily: 'ProductSans',
		fontSize: 18,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 24,
		letterSpacing: 0.15,
	},
});

export default Temp;
