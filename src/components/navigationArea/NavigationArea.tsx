import { WeatherFastInfoBar } from '@src/components'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import AppStyle from '@src/style/styles'
import useForecastStore from '@src/zustand/store'
import { useContext, useRef } from 'react'
import {
	Animated,
	ImageStyle,
	StatusBar,
	StyleSheet,
	TextStyle,
	ViewStyle,
} from 'react-native'
import { TabBarStyle } from '../tabBar'
import CurrentTime from 'src/components/navigationArea/component/CurrentTime'
import SearchBar from 'src/components/navigationArea/component/SearchBar'
import TempDayNight from 'src/components/navigationArea/component/TempDayNight'
import {
	useUpdateTodayForecast,
	useUpdateCurrentForecast,
	useUpdateDayNightTemp,
	useShiftToNextForecast,
} from './hook'

const NavigationArea = () => {
	const [currentCity, tick] = useForecastStore(e => [e.city, e.tick])
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

	const [forecastsInDay] = useUpdateTodayForecast(currentCity)
	const [currentForecast, setCurrentForecast] =
		useUpdateCurrentForecast(forecastsInDay)
	const [dayNightTemp] = useUpdateDayNightTemp(currentCity, forecastsInDay)
	useShiftToNextForecast(currentForecast, forecastsInDay, setCurrentForecast)

	return (
		<>
			{currentCity && tick !== 0 && (
				<Animated.View style={[styles.container]}>
					<Animated.View
						style={[
							styles.rounded,
							styles.background,
							{},
							{
								borderRadius: widthAnimated.interpolate({
									inputRange: [0, styles.smallContainer.height],
									outputRange: [33, 0],
									extrapolate: 'clamp',
								}),
							},
						]}
					>
						<Animated.Image
							style={[
								styles.image,
								{
									height: styles.padding.height + styles.padding.marginTop,
									opacity: widthAnimated.interpolate({
										inputRange: [0, styles.smallContainer.height],
										outputRange: [1, 0],
										extrapolate: 'clamp',
									}),
								},
							]}
							source={require('@assets/img/bg.png')}
						/>
					</Animated.View>
					<StatusBar
						translucent={true}
						backgroundColor={'#0000'}
					/>
					<Animated.View
						style={[
							AppStyle.expand,
							styles.padding,
							{
								height: widthAnimated.interpolate({
									inputRange: [0, styles.smallContainer.height],
									outputRange: [
										styles.padding.height,
										styles.smallContainer.height +
											TabBarStyle.button.height +
											13,
									],
									extrapolate: 'clamp',
								}),
							},
						]}
					>
						<SearchBar />
						<WeatherFastInfoBar
							temp={currentForecast?.main.temp}
							feelLike={currentForecast?.main.feels_like}
							weatherName={currentForecast?.weather[0].main}
							weatherIcon={currentForecast?.weather[0].icon}
						/>
						<Animated.View
							style={[
								{
									paddingBottom: widthAnimated.interpolate({
										inputRange: [0, styles.smallContainer.height],
										outputRange: [72, 0],
										extrapolate: 'clamp',
									}),
								},
							]}
						>
							<Animated.View
								style={[
									styles.footer,
									{
										marginTop: widthAnimated.interpolate({
											inputRange: [0, styles.smallContainer.height],
											outputRange: [73, 0],
											extrapolate: 'clamp',
										}),
									},
								]}
							>
								<CurrentTime animatedStyle={animatedStyle.view} />
								<TempDayNight
									dayTemp={dayNightTemp.day}
									nightTemp={dayNightTemp.night}
									animatedStyle={animatedStyle.view}
								/>
							</Animated.View>
						</Animated.View>
					</Animated.View>
				</Animated.View>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		overflow: 'hidden',
		zIndex: 1,
	},
	smallContainer: {
		height: 176,
	},
	padding: {
		height: 360,
		marginTop: 0,
		paddingTop: StatusBar.currentHeight ?? 0,
		paddingBottom: 16,
		paddingHorizontal: 23,
	},
	image: {
		position: 'absolute',
		width: '100%',
		bottom: 0,
	},
	background: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		height: '100%',
		width: '100%',
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
export { styles }
