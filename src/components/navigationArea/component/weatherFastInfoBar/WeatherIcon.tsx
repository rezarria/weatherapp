import { styles as NavigationAreaStyles } from '@component/navigation-area/NavigationArea'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import React, { useContext } from 'react'
import { Animated, Image, StyleSheet, View } from 'react-native'

type Props = {
	name?: string
	icon?: string
}

const WeatherIcon = ({ name, icon }: Props) => {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const size = widthAnimated.interpolate({
		inputRange: [0, NavigationAreaStyles.smallContainer.height],
		outputRange: [107, 59],
		extrapolate: 'clamp',
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
						fontSize: widthAnimated.interpolate({
							inputRange: [0, NavigationAreaStyles.smallContainer.height],
							outputRange: [22, 0],
							extrapolate: 'clamp',
						}),
						lineHeight: widthAnimated.interpolate({
							inputRange: [0, NavigationAreaStyles.smallContainer.height],
							outputRange: [28, 0],
							extrapolate: 'clamp',
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
