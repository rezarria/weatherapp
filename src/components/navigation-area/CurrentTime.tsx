import React, { forwardRef, useImperativeHandle } from 'react'
import { Animated, StyleSheet, TextStyle } from 'react-native'

const CurrentTime = forwardRef<
	{
		animation(n: number): void
	},
	{
		animatedStyle: Animated.WithAnimatedObject<TextStyle>
		anime: Animated.Value
	}
>((props, ref) => {
	const currentTime = 'January 18, 16:14'
	useImperativeHandle(
		ref,
		() => ({
			animation(_n) {},
		}),
		[]
	)

	return (
		<Animated.View>
			<Animated.Text
				style={[
					styles.text,
					props.animatedStyle,
					{
						lineHeight: props.anime.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 28],
						}),
					},
				]}
			>
				{currentTime}
			</Animated.Text>
		</Animated.View>
	)
})

const styles = StyleSheet.create({
	text: {
		fontFamily: 'ProductSans',
		fontSize: 18,
		color: '#fff',
		fontStyle: 'normal',
		fontWeight: '400',
	},
})

export default CurrentTime
