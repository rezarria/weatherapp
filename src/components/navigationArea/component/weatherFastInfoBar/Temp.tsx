import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import React, { useContext, useMemo } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import { styles as NavigationAreaStyles } from '@component/navigationArea/NavigationArea'

const Temp = (props: { v: number; cv?: number }) => {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const color = useMemo(
		() =>
			widthAnimated.interpolate({
				inputRange: [0, NavigationAreaStyles.smallContainer.height],
				outputRange: ['#fff', '#000'],
			}),
		[widthAnimated]
	)
	return (
		<View style={styles.container}>
			<Animated.Text
				style={[
					styles.temp,
					{
						color,
						fontSize: widthAnimated.interpolate({
							inputRange: [0, NavigationAreaStyles.smallContainer.height],
							outputRange: [112, 57],
							extrapolate: 'clamp',
						}),
						lineHeight: widthAnimated.interpolate({
							inputRange: [0, NavigationAreaStyles.smallContainer.height],
							outputRange: [112, 64],
							extrapolate: 'clamp',
						}),
					},
				]}
			>
				{(props.v - 272.15).toFixed(1)}°
			</Animated.Text>
			{props.cv && (
				<Animated.Text
					style={[
						styles.feelsLike,
						{
							color,
							fontSize: widthAnimated.interpolate({
								inputRange: [0, NavigationAreaStyles.smallContainer.height],
								outputRange: [16, 18],
								extrapolate: 'clamp',
							}),
						},
					]}
				>
					Feels like {(props.cv - 272.15).toFixed(1)}°
				</Animated.Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
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
		color: '#fff',
		fontFamily: 'ProductSans',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 24,
		letterSpacing: 0.15,
	},
})

export default Temp
