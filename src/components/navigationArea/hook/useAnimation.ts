import { TabBarStyle } from '@component/tabBar'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import { useContext, useMemo, useRef } from 'react'
import { Animated, ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { styles } from '../NavigationArea'

export function useAnimation() {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const animatedStyle = useRef<{
		[key: string]: Animated.WithAnimatedObject<
			ViewStyle | TextStyle | ImageStyle
		>
	}>({
		text: {
			color: widthAnimated.interpolate({
				inputRange: [0, styles.smallContainer.height],
				outputRange: ['#000', '#fff'],
				extrapolate: 'clamp',
			}),
		},
		view: {
			opacity: widthAnimated.interpolate({
				inputRange: [0, styles.smallContainer.height],
				outputRange: [1, 0],
				extrapolate: 'clamp',
			}),
		},
	}).current
	const animation = useMemo(
		() => ({
			panel: {
				height: widthAnimated.interpolate({
					inputRange: [0, styles.smallContainer.height],
					outputRange: [
						styles.padding.height,
						styles.smallContainer.height + TabBarStyle.button.height + 13,
					],
					extrapolate: 'clamp',
				}),
			},
			paddingBottom: {
				paddingBottom: widthAnimated.interpolate({
					inputRange: [0, styles.smallContainer.height],
					outputRange: [72, 0],
					extrapolate: 'clamp',
				}),
			},
			footer: {
				marginTop: widthAnimated.interpolate({
					inputRange: [0, styles.smallContainer.height],
					outputRange: [73, 0],
					extrapolate: 'clamp',
				}),
			},
			image: {
				height: styles.padding.height + styles.padding.marginTop,
				opacity: widthAnimated.interpolate({
					inputRange: [0, styles.smallContainer.height],
					outputRange: [1, 0],
					extrapolate: 'clamp',
				}),
			},
			background: {
				borderRadius: widthAnimated.interpolate({
					inputRange: [0, styles.smallContainer.height],
					outputRange: [33, 0],
					extrapolate: 'clamp',
				}),
			},
		}),
		[widthAnimated]
	)
	return { animation, animatedStyle }
}
