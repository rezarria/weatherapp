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
import { useQuery } from '../../data/realm'
import useForecastStore from '../../zustand/store'
import { BSON } from 'realm'
import { Forecast } from '../../data/model'

const NavigationArea = () => {
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
	const currentCity = useForecastStore(e => e.city)
	const [forecasts, setForecasts] = useState<Forecast[]>([])
	const [currentForcast, setCurrentForcast] = useState<Forecast | null>(null)
	const [dayNightTemp, setDayNightTemp] = useState({ day: 0, night: 0 })
	useEffect(() => {
		setForecasts(getTodayForcasts(query, currentCity?._id))
	}, [currentCity?._id, query])
	useEffect(() => {
		setCurrentForcast(getCurrentForecast(forecasts))
	}, [forecasts])
	useEffect(() => {
		if (currentCity == null) {
			return
		}
		const dayForecast = forecasts.filter(
			forecast =>
				forecast.dt >= currentCity.sunrise && forecast.dt <= currentCity.sunset
		)
		setDayNightTemp({
			day: dayForecast
				.map(i => i.main.temp)
				.reduce((a, c, _i, arr) => a + c / arr.length, 0),
			night: forecasts
				.filter(i => !dayForecast.includes(i))
				.map(i => i.main.temp)
				.reduce((a, c, _i, arr) => a + c / arr.length, 0),
		})
	}, [forecasts, currentCity])
	return (
		<>
			{currentForcast && (
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
							temp={currentForcast.main.temp}
							feelLike={currentForcast.main.feels_like}
							weatherName={currentForcast.weather[0].main}
							weatherIcon={currentForcast.weather[0].icon}
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
									dayTemp={10}
									nightTemp={10}
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
	if (id == null) {
		return []
	}
	console.debug('Nạp các forecast hôm nay từ db')
	const time = new Date()
	time.setHours(0, 0, 0, 0)
	const beginDayTimestamp = Math.floor(time.getTime() / 1000)
	time.setHours(24, 0, 0)
	const endDayTimestamp = Math.floor(time.getTime() - 1)
	const result = query.filtered(
		'dt BETWEEN {$0,$1} AND city_id = $2',
		beginDayTimestamp,
		endDayTimestamp,
		id
	)
	console.debug(`số lượng forecast từ db: ${result.length}`)
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

export default NavigationArea
