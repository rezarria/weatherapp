import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import SearchBar from './SearchBar';
import { WeatherFastInfoBar } from './WeatherFastInfoBar';
import CurrentTime from './CurrentTime';
import { CalsDayNight } from './CalsDayNight';

export default function NavigationArea() {
	return (
		<View style={[styles.rounded, styles.background]}>
			<Image style={styles.image} source={require('../assets/img/bg.png')} />
			<StatusBar translucent={true} backgroundColor={'#0000'} />
			<View style={styles.containner}>
				<SearchBar />
				<WeatherFastInfoBar />
				<View style={styles.footer}>
					<CurrentTime />
					<CalsDayNight />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	containner: {
		paddingTop: (StatusBar.currentHeight ?? 0) + 8,
		paddingLeft: 23,
		paddingRight: 23,
		paddingBottom: 16,
		flexGrow: 1,
	},
	image: {
		width: '100%',
		height: '100%',
		left: 0,
		position: 'absolute',
		bottom: 0,
	},
	background: {
		height: null,
		aspectRatio: 1.1,
	},
	rounded: {
		overflow: 'hidden',
		borderRadius: 33,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
	footer: {
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		flexDirection: 'row',
		flexGrow: 1,
		flexBasis: 'auto',
	},
});
