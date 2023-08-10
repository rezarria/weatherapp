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
import { MainScreenAnimationContext } from '@src/screen/MainScreen'
import { useQuery } from '../../data/realm'
import { ForecastModel } from '../../model/forecast'
import useForecastStore from '../../zustand/store'

const NavigationArea = () => {
	const anime = useContext(MainScreenAnimationContext)
	const query = useQuery(ForecastModel)
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
	const localtion = useForecastStore(e => ({
		lat: e.lat,
		lon: e.lon,
		name: e.localtionName,
	}))
	const currentForcast = getCurrentForecast(query, localtion.lat, localtion.lon)
	console.log(currentForcast)
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

const getCurrentForecast = (
	query: Realm.Results<ForecastModel>,
	lat: number,
	lon: number
) => {
	const result = query.filtered(
		'dt BETWEEN {$0,$1} AND coord.lat == $2 AND coord.lon == $3',
		Date.now() - 60 * 60 * 3,
		Date.now() + 60 * 60 * 6,
		lat,
		lon
	)
	let minDif = Infinity
	let closest: ForecastModel | undefined
	const nowTimestamp = Date.now() / 1000
	for (const forecast of result) {
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
