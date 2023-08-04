import React, { useContext, useMemo } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { MainScreenAnimationContext } from '../../../screen/MainScreen'

const Temp = (props: { v: number; cv?: number }) => {
	const anime = useContext(MainScreenAnimationContext)
	const color = useMemo(
		() =>
			anime.interpolate({
				inputRange: [0, 1],
				outputRange: ['#000', '#fff'],
			}),
		[anime]
	)
	return (
		<View style={styles.container}>
			<Animated.Text
				style={[
					styles.temp,
					{
						color,
						fontSize: anime.interpolate({
							inputRange: [0, 1],
							outputRange: [57, 112],
						}),
						lineHeight: anime.interpolate({
							inputRange: [0, 1],
							outputRange: [64, 112],
						}),
					},
				]}
			>
				{props.v}°
			</Animated.Text>
			{props.cv && (
				<Animated.Text
					style={[
						styles.feelsLike,
						{
							color,
							fontSize: anime.interpolate({
								inputRange: [0, 1],
								outputRange: [16, 18],
							}),
						},
					]}
				>
					Feels like {props.cv}°
				</Animated.Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'flex-start',
		alignContent: 'flex-end',
		gap: 0,
	},
	temp: {
		color: '#fff',
		fontFamily: 'ProductSans',
		fontStyle: 'normal',
		fontWeight: '400',
	},
	feelsLike: {
		marginLeft: -15,
		color: '#fff',
		fontFamily: 'ProductSans',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 24,
		letterSpacing: 0.15,
	},
})

export default Temp