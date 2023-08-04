import React, { useContext, useRef } from 'react'
import {
	Animated,
	ImageStyle,
	StatusBar,
	StyleSheet,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native'
import SearchBar from './SearchBar'
import CurrentTime from './CurrentTime'
import TempDayNight from './TempDayNight'
import { WeatherFastInfoBar } from '@src/components'
import { MainScreenAnimationContext } from '../../screen/MainScreen'

const NavigationArea = () => {
	const anime = useContext(MainScreenAnimationContext)
	const animatedStyle = useRef<{
		[key: string]: Animated.WithAnimatedObject<
			ViewStyle | TextStyle | ImageStyle
		>
	}>({
		text: {
			color: anime.interpolate({
				inputRange: [0, 1],
				outputRange: ['#000', '#fff'],
			}),
		},
		view: {
			opacity: anime,
		},
	}).current
	return (
		<Animated.View
			style={[
				styles.rounded,
				styles.background,
				{
					borderRadius: anime.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 33],
					}),
				},
			]}
		>
			<Animated.Image
				style={[styles.image, [{ opacity: anime }]]}
				source={require('@assets/img/bg.png')}
			/>
			<StatusBar
				translucent={true}
				backgroundColor={'#0000'}
			/>
			<View style={[styles.container]}>
				<SearchBar />
				<WeatherFastInfoBar />
				<Animated.View
					style={[
						{
							paddingBottom: anime.interpolate({
								inputRange: [0, 1],
								outputRange: [72, 0],
							}),
						},
					]}
				>
					<Animated.View
						style={[
							styles.footer,
							{
								marginTop: anime.interpolate({
									inputRange: [0, 1],
									outputRange: [0, 73],
								}),
							},
						]}
					>
						<CurrentTime
							anime={anime}
							animatedStyle={animatedStyle.view}
						/>
						<TempDayNight
							anime={anime}
							animatedStyle={animatedStyle.view}
						/>
					</Animated.View>
				</Animated.View>
			</View>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: (StatusBar.currentHeight ?? 0) + 8,
		paddingLeft: 23,
		paddingRight: 23,
		paddingBottom: 16,
		flexGrow: 1,
	},
	image: {
		width: '100%',
		left: 0,
		position: 'absolute',
		bottom: 0,
	},
	background: {
		height: null,
		backgroundColor: '#E2D3FA',
	},
	rounded: {
		overflow: 'hidden',
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
	footer: {
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		flexDirection: 'row',
		flexGrow: 1,
		flexBasis: 'auto',
	},
})

export default NavigationArea
