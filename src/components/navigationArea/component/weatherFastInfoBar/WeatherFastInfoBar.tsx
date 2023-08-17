import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import Temp from '@component/navigationArea/component/weatherFastInfoBar/Temp'
import WeatherIcon from '@component/navigationArea/component/weatherFastInfoBar/WeatherIcon'

const WeatherFastInfoBar = (props: {
	temp?: number
	feelLike?: number
	weatherName?: string
	weatherIcon?: string
}) => {
	return (
		<Animated.View style={[styles.container, {}]}>
			<Temp
				v={props.temp}
				cv={props.feelLike}
			/>
			<WeatherIcon
				icon={props.weatherIcon}
				name={props.weatherName}
			/>
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
