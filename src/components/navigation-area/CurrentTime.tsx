import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react'
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
	const render = useState(0)[1]
	const currentTime = new Date().toLocaleDateString('vi', {
		day: '2-digit',
		month: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	})
	useImperativeHandle(
		ref,
		() => ({
			animation(_n) {},
		}),
		[]
	)
	useEffect(() => {
		const job = setInterval(() => {
			render(i => i + 1)
		}, 1000)
		return () => {
			clearInterval(job)
		}
	}, [render])
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
