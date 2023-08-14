import React, { useContext } from 'react'
import { Animated, Image, StyleSheet, View } from 'react-native'
import { MainScreenAnimationContext } from '@src/screen/MainScreen'

type Props = {
	name?: string
	icon?: string
}

const WeatherIcon = ({ name, icon }: Props) => {
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
				{icon && (
					<Image
						style={styles.icon}
						source={{
							uri: `https://openweathermap.org/img/wn/${icon}@4x.png`,
						}}
					/>
				)}
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
				{name}
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
		height: '100%',
		aspectRatio: 1,
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
