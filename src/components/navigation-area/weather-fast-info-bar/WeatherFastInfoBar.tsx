import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import WeatherIcon from './WeatherIcon'
import Temp from './Temp'

const WeatherFastInfoBar = () => {
	return (
		<Animated.View style={[styles.container, {}]}>
			<Temp
				v={3}
				cv={-2}
			/>
			<WeatherIcon />
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})

export default WeatherFastInfoBar