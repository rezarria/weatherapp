import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CurrentTime = () => {
	const currentTime = 'January 18, 16:14';

	return (
		<View>
			<Text style={styles.text}>{currentTime}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		color: '#fff',
		fontFamily: 'ProductSans',
		fontSize: 18,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 28,
	},
});

export default CurrentTime;
