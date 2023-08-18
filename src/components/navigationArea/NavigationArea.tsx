import AppStyle from '@src/style/styles'
import useForecastStore from '@src/zustand/store'
import { Animated, StatusBar, StyleSheet } from 'react-native'
import {
	CurrentTime,
	SearchBar,
	TempDayNight,
	WeatherFastInfoBar,
} from './component'
import {
	useAnimation,
	useShiftToNextForecast,
	useUpdateCurrentForecast,
	useUpdateDayNightTemp,
	useUpdateTodayForecast,
} from './hook'

const NavigationArea = () => {
	const [currentCity] = useForecastStore(e => [e.city])
	const [forecastsInDay] = useUpdateTodayForecast(currentCity)
	const [currentForecast, setCurrentForecast] =
		useUpdateCurrentForecast(forecastsInDay)
	const [dayNightTemp] = useUpdateDayNightTemp(currentCity, forecastsInDay)
	useShiftToNextForecast(currentForecast, forecastsInDay, setCurrentForecast)

	const { animation, animatedStyle } = useAnimation()

	return (
		<>
			<Animated.View style={[styles.container]}>
				<Animated.View
					style={[styles.rounded, styles.background, animation.background]}
				>
					<Animated.Image
						style={[styles.image, animation.image]}
						source={require('@assets/img/bg.png')}
					/>
				</Animated.View>
				<StatusBar
					translucent={true}
					backgroundColor={'#0000'}
				/>
				<Animated.View
					style={[AppStyle.expand, styles.padding, animation.panel]}
				>
					<SearchBar />
					<WeatherFastInfoBar
						temp={currentForecast?.main.temp}
						feelLike={currentForecast?.main.feels_like}
						weatherName={currentForecast?.weather[0].main}
						weatherIcon={currentForecast?.weather[0].icon}
					/>
					<Animated.View style={[animation.paddingBottom]}>
						<Animated.View style={[styles.footer, animation.footer]}>
							<CurrentTime animatedStyle={animatedStyle.view} />
							<TempDayNight
								dayTemp={dayNightTemp?.day}
								nightTemp={dayNightTemp?.night}
								animatedStyle={animatedStyle.view}
							/>
						</Animated.View>
					</Animated.View>
				</Animated.View>
			</Animated.View>
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
