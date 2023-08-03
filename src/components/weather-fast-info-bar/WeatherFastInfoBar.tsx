import React from 'react'
import { StyleSheet, View } from 'react-native'
import WeatherIcon from './WeatherIcon'
import Temp from './Temp'

const WeatherFastInfoBar = () => (
	<View style={styles.container}>
		<Temp
			v={3}
			cv={-2}
		/>
		<WeatherIcon />
	</View>
)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})

export default WeatherFastInfoBar
