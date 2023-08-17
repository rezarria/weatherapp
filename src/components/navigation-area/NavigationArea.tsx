import { WeatherFastInfoBar } from '@src/components'
import { City, Forecast } from '@src/data/model'
import { useQuery } from '@src/data/realm'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import AppStyle from '@src/style/styles'
import useForecastStore from '@src/zustand/store'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
	Animated,
	ImageStyle,
	StatusBar,
	StyleSheet,
	TextStyle,
	ViewStyle,
} from 'react-native'
import { BSON } from 'realm'
import { TabBarStyle } from '../tab-bar'
import CurrentTime from './CurrentTime'
import SearchBar from './SearchBar'
import TempDayNight from './TempDayNight'

const NavigationArea = () => {
	const [currentCity, tick] = useForecastStore(e => [e.city, e.tick])
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const query = useQuery(Forecast)
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
	const [forecastsInDay, setForecastInDay] = useState<Forecast[]>(() =>
		getTodayForecasts(query, currentCity?._id)
	)
	const [currentForecast, setCurrentForecast] = useState(() =>
		getCurrentForecast(forecastsInDay)
	)

	const [dayNightTemp, setDayNightTemp] = useState(() =>
		calcAvgTemp(currentCity, forecastsInDay)
	)
	console.debug(`số forecast trong ngày: ${forecastsInDay.length}`)
	console.debug(`forecast hiện tại: ${JSON.stringify(currentForecast)}`)
	useEffect(() => {
		setForecastInDay(getTodayForecasts(query, currentCity?._id))
		console.debug('lấy forecast trong ngày...')
	}, [query, currentCity])

	useEffect(() => {
		const forecast = getCurrentForecast(forecastsInDay)
		setCurrentForecast(forecast)
	}, [forecastsInDay])

	useEffect(() => {
		setDayNightTemp(calcAvgTemp(currentCity, forecastsInDay))
	}, [currentCity, forecastsInDay])

	useEffect(() => {
		if (currentForecast) {
			const timeAboveTimestamp =
				(currentForecast.dt - Math.floor(Date.now() / 1000)) * 1000
			const task = setInterval(() => {
				const nextForecast = forecastsInDay.at(
					forecastsInDay.indexOf(currentForecast) + 1
				)
				if (nextForecast) {
					setCurrentForecast(nextForecast)
				}
			}, timeAboveTimestamp)
			return () => {
				clearInterval(task)
			}
		}
	}, [currentForecast, forecastsInDay])

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

const getTodayForecasts = (
	query: Realm.Results<Forecast>,
	id?: BSON.ObjectId
) => {
	console.debug('Nạp các forecast hôm nay từ db')
	const time = new Date()
	time.setHours(0, 0, 0, 0)
	const beginDayTimestamp = Math.floor(time.getTime() / 1000)
	time.setHours(24, 0, 0)
	const endDayTimestamp = Math.floor(time.getTime() - 1)
	return getForecasts(beginDayTimestamp, endDayTimestamp, query, id)
}

const getForecasts = (
	beginDayTimestamp: number,
	endDayTimestamp: number,
	query: Realm.Results<Forecast>,
	id?: BSON.ObjectId
) => {
	if (id == null) {
		return []
	}
	const result = query.filtered(
		'dt BETWEEN {$0,$1} AND city_id = $2',
		beginDayTimestamp,
		endDayTimestamp,
		id
	)
	return [...result]
}

const getCurrentForecast = (list: Forecast[]) => {
	if (list.length === 0) {
		return null
	}
	const nowTimestamp = Date.now() / 1000
	let minDif = Infinity
	let closest: Forecast | null = null
	console.debug('lấy forecast hiện tại')
	for (const forecast of list) {
		let dif = Math.abs(nowTimestamp - forecast.dt)
		if (dif < minDif) {
			minDif = dif
			closest = forecast
		} else if (dif > minDif) {
			break
		}
	}
	return closest
}

const calcAvgTemp = (
	currentCity: City | undefined,
	forecastsInDay: Forecast[]
) => {
	if (currentCity == null) {
		return { day: 0, night: 0 }
	}
	const dayForecast = forecastsInDay.filter(
		forecast =>
			forecast.dt >= currentCity.sunrise && forecast.dt <= currentCity.sunset
	)
	return {
		day: dayForecast
			.map(i => i.main.temp)
			.reduce((a, c, _i, arr) => a + c / arr.length, 0),
		night: forecastsInDay
			.filter(i => !dayForecast.includes(i))
			.map(i => i.main.temp)
			.reduce((a, c, _i, arr) => a + c / arr.length, 0),
	}
}

export default NavigationArea
export { styles }
