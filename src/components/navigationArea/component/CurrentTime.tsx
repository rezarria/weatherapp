import { NavigationAreaStyles } from '@component/navigationArea'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import React, {
	forwardRef,
	useContext,
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
	}
>((props, ref) => {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
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
						lineHeight: widthAnimated.interpolate({
							inputRange: [0, NavigationAreaStyles.smallContainer.height],
							outputRange: [28, 0],
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
