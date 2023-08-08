import React, { useContext } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import Icon from '@assets/svg/cloud and sun 1.svg'
import { MainScreenAnimationContext } from '@src/screen/MainScreen'

const WeatherIcon = () => {
	const anime = useContext(MainScreenAnimationContext)
	const size = anime.interpolate({
		inputRange: [0, 1],
		outputRange: [59, 107],
	})
	return (
		<View style={styles.container}>
			<Animated.View
				style={{
					height: size,
					width: size,
				}}
			>
				<Icon
					width={'100%'}
					height={'100%'}
					style={styles.icon}
				/>
			</Animated.View>
			<Animated.Text
				style={[
					styles.text,
					{
						fontSize: anime.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 22],
						}),
						lineHeight: anime.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 28],
						}),
					},
				]}
			>
				Cloudy
			</Animated.Text>
		</View>
	)
}

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
		fontStyle: 'normal',
		fontWeight: '400',
	},
})

export default WeatherIcon
