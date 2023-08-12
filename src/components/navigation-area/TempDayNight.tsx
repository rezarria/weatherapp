import React, { useEffect, useMemo, useState } from 'react'
import { Animated, ViewStyle } from 'react-native'

const TempDayNight = (props: {
	animatedStyle: Animated.WithAnimatedObject<ViewStyle>
	anime: Animated.Value
	dayTemp: number
	nightTemp: number
}) => {
	const [display, setDisplay] = useState<'flex' | 'none'>('flex')
	const styles = useMemo(
		() => ({
			container: {},
			day: {},
			night: {},
			font: {
				color: props.anime.interpolate({
					inputRange: [0, 1],
					outputRange: ['#fff0', '#ffff'],
				}),
				fontFamily: 'ProductSans',
				fontSize: 18,
				fontStyle: 'normal',
				fontWeight: '700',
				lineHeight: props.anime.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 24],
				}),
				letterSpacing: 0.1,
			},
			image: {
				height: props.anime.interpolate({
					inputRange: [0, 1],
					outputRange: [59, 107],
				}),
			},
		}),
		[props.anime]
	)
	useEffect(() => {
		const id = props.anime.addListener(v => {
			if (v.value === 0) {
				setDisplay('none')
			} else {
				setDisplay('flex')
			}
		})
		return () => {
			props.anime.removeListener(id)
		}
	}, [props.anime])
	return (
		<Animated.View
			style={[styles.container, props.animatedStyle, { display: display }]}
		>
			<Animated.Text style={[styles.font, styles.day]}>
				Day {(props.dayTemp - 272.15).toFixed(1)}°
			</Animated.Text>
			<Animated.Text style={[styles.font, styles.night]}>
				Night {(props.nightTemp - 272.15).toFixed(1)}°
			</Animated.Text>
		</Animated.View>
	)
}

export default TempDayNight
