import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Animated, ViewStyle } from 'react-native'

const TempDayNight = (props: {
	animatedStyle: Animated.WithAnimatedObject<ViewStyle>
	dayTemp?: number
	nightTemp?: number
}) => {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const [display, setDisplay] = useState<'flex' | 'none'>('flex')
	const styles = useMemo(
		() => ({
			container: {},
			day: {},
			night: {},
			font: {
				color: widthAnimated.interpolate({
					inputRange: [0, 360],
					outputRange: ['#fff0', '#ffff'],
				}),
				fontFamily: 'ProductSans',
				fontSize: 18,
				fontStyle: 'normal',
				fontWeight: '700',
				lineHeight: widthAnimated.interpolate({
					inputRange: [0, 360],
					outputRange: [0, 24],
				}),
				letterSpacing: 0.1,
			},
			image: {
				height: widthAnimated.interpolate({
					inputRange: [0, 360],
					outputRange: [59, 107],
				}),
			},
		}),
		[widthAnimated]
	)
	useEffect(() => {
		const id = widthAnimated.addListener(v => {
			if (v.value === 0) {
				setDisplay('none')
			} else {
				setDisplay('flex')
			}
		})
		return () => {
			widthAnimated.removeListener(id)
		}
	}, [widthAnimated])
	return (
		<Animated.View
			style={[styles.container, props.animatedStyle, { display: display }]}
		>
			<Animated.Text style={[styles.font, styles.day]}>
				Day {((props.dayTemp ?? 272.15) - 272.15).toFixed(1)}°
			</Animated.Text>
			<Animated.Text style={[styles.font, styles.night]}>
				Night {((props.nightTemp ?? 272.15) - 272.15).toFixed(1)}°
			</Animated.Text>
		</Animated.View>
	)
}

export default TempDayNight
