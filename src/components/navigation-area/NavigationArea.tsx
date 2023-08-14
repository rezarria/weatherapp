import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { MainScreenAnimationContext } from '@src/screen/MainScreen'
import { useQuery } from '@src/data/realm'
import useForecastStore from '@src/zustand/store'
import { BSON } from 'realm'
import { City, Forecast } from '@src/data/model'

const NavigationArea = () => {
	const [currentCity, tick] = useForecastStore(e => [e.city, e.tick])
	const anime = useContext(MainScreenAnimationContext)
	const query = useQuery(Forecast)
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
	const [forecastsInDay, setForecastInDay] = useState<Forecast[]>(() =>
		getTodayForcasts(query, currentCity?._id)
	)
	const [currentForcast, setCurrentForcast] = useState(() =>
		getCurrentForecast(forecastsInDay)
	)
	const [dayNightTemp, setDayNightTemp] = useState(() =>
		calacAvgTemp(currentCity, forecastsInDay)
	)
	console.debug(`số forecast trong ngày: ${forecastsInDay.length}`)
	console.debug(`forecast hiện tại: ${JSON.stringify(currentForcast)}`)
	useEffect(() => {
		setForecastInDay(getTodayForcasts(query, currentCity?._id))
		console.debug('lấy forecast trong ngày...')
	}, [query, currentCity])

	useEffect(() => {
		setCurrentForcast(getCurrentForecast(forecastsInDay))
	}, [forecastsInDay])

	useEffect(() => {
		setDayNightTemp(calacAvgTemp(currentCity, forecastsInDay))
	}, [currentCity, forecastsInDay])

	useEffect(() => {
		if (currentForcast) {
			const timeAboveTimestamp =
				(currentForcast.dt - Math.floor(Date.now() / 1000)) * 1000
			const task = setInterval(() => {
				const nextForecast = forecastsInDay.at(
					forecastsInDay.indexOf(currentForcast) + 1
				)
				if (nextForecast) {
					setCurrentForcast(nextForecast)
				}
			}, timeAboveTimestamp)
			return () => {
				clearInterval(task)
			}
		}
	}, [currentForcast, forecastsInDay])

	return (
		<>
			{currentCity && tick !== 0 && (
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
						<WeatherFastInfoBar
							temp={currentForcast?.main.temp}
							feelLike={currentForcast?.main.feels_like}
							weatherName={currentForcast?.weather[0].main}
							weatherIcon={currentForcast?.weather[0].icon}
						/>
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
									dayTemp={dayNightTemp.day}
									nightTemp={dayNightTemp.night}
									anime={anime}
									animatedStyle={animatedStyle.view}
								/>
							</Animated.View>
						</Animated.View>
					</View>
				</Animated.View>
			)}
		</>
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

const getTodayForcasts = (
	query: Realm.Results<Forecast>,
	id?: BSON.ObjectId
) => {
	console.debug('Nạp các forecast hôm nay từ db')
	const time = new Date()
	time.setHours(0, 0, 0, 0)
	const beginDayTimestamp = Math.floor(time.getTime() / 1000)
	time.setHours(24, 0, 0)
	const endDayTimestamp = Math.floor(time.getTime() - 1)
	return getForcasts(beginDayTimestamp, endDayTimestamp, query, id)
}

const getForcasts = (
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

const calacAvgTemp = (
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
