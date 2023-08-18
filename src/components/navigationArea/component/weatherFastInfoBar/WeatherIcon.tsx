import Logo from '@assets/svg/question exchange.svg'
import React from 'react'
import { Animated, Image, StyleSheet, View } from 'react-native'
import { useAnimation } from './hook/useAnimation'

type Props = {
	name?: string
	icon?: string
}

const WeatherIcon = ({ name, icon }: Props) => {
	const animation = useAnimation()

	if (icon == null) {
		return <Logo fill={'#fff'} />
	}

	return (
		<View style={styles.container}>
			<Animated.View style={animation.icon}>
				<Image
					style={styles.icon}
					source={{
						uri: `https://openweathermap.org/img/wn/${icon}@4x.png`,
					}}
				/>
			</Animated.View>
			<Animated.Text style={[styles.text, animation.text]}>
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
