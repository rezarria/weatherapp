import {
	ChanceOfRain,
	DayForecast,
	HourlyForecast,
	Pressure,
	RainChance,
	Sunrise,
	Sunset,
	WindCard,
} from '@src/components'
import { styles as NavigationAreaStyle } from '@src/components/navigationArea/NavigationArea'
import { City, Forecast } from '@src/data/model'
import { useQuery } from '@src/data/realm'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import AppStyle from '@src/style/styles'
import useForecastStore from '@src/zustand/store'
import { PropsWithChildren, useContext, useMemo } from 'react'
import { Animated, NativeScrollEvent, ScrollView, View } from 'react-native'
import { BSON } from 'realm'

export type ParamList = {
	Today: undefined
	Tomorrow: undefined
}

function Group({
	children,
	target = false,
}: PropsWithChildren<{ target: boolean }>) {
	return <View style={AppStyle.group}>{children && target && children}</View>
}

const TodayScreen = () => {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const query = useQuery(Forecast)
	const currentCity = useForecastStore(store => store.city)
	const forecastList = useMemo(
		() => getCurrentAboveForecast(query, currentCity?._id),
		[currentCity, query]
	)
	const todayForecastList = useMemo(
		() => forecastList.filter(filterTodayForecasts(currentCity)),
		[currentCity, forecastList]
	)
	const currentForecast = findClosestForcast(forecastList)
	let oldForecast: Forecast | undefined
	if (currentForecast != null) {
		const index = forecastList.indexOf(currentForecast)
		if (index !== 0) {
			oldForecast = forecastList[index - 1]
		}
	}
	const shouldShow = forecastList.length > 0
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			onScroll={Animated.event<NativeScrollEvent>(
				[
					{
						nativeEvent: {
							contentOffset: {
								y: widthAnimated,
							},
						},
					},
				],
				{
					useNativeDriver: false,
				}
			)}
		>
			<View
				style={{
					paddingTop: NavigationAreaStyle.padding.height,
				}}
			/>

			<View style={AppStyle.scrollView}>
				<Group target={shouldShow}>
					<WindCard
						value={currentForecast?.wind?.speed}
						unit={'km/h'}
						guestValue={
							currentForecast?.wind?.speed ??
							0 -
								(oldForecast?.wind?.speed ?? currentForecast?.wind?.speed ?? 0)
						}
					/>
					<RainChance value={currentForecast?.pop} />
				</Group>
				<Group target={shouldShow}>
					<Pressure
						value={currentForecast?.main.pressure}
						initValue={oldForecast?.main.pressure}
					/>
				</Group>
				<DayForecast />
				<ChanceOfRain
					data={todayForecastList.map(i => ({
						time: i.dt,
						value: i.pop,
					}))}
				/>
				<HourlyForecast data={todayForecastList} />
				<Group target={shouldShow}>
					<Sunrise time={currentCity?.sunrise} />
					<Sunset time={currentCity?.sunset} />
				</Group>
			</View>
		</ScrollView>
	)
}

export default TodayScreen

const getCurrentAboveForecast = (
	query: Realm.Results<Forecast>,
	id?: BSON.ObjectId
) => {
	if (id == null) {
		return []
	}
	const nowTimestamp = Math.floor(Date.now() / 1000)
	query.filtered(
		'$0 >= dt AND city_id = $1 SORT(dt ASC) LIMIT(40)',
		nowTimestamp,
		id
	)
	return Array.from(query.values())
}

const findClosestForcast: (list: Forecast[]) => Forecast | null = list => {
	const nowTimestamp = Math.floor(Date.now() / 1000)
	let minDif = Infinity
	let closestForecast: Forecast | null = null
	list.forEach(forecast => {
		const dif = Math.abs(forecast.dt - nowTimestamp)
		if (dif < minDif) {
			closestForecast = forecast
		}
	})
	return closestForecast
}

const filterTodayForecasts = (currentCity: City | undefined) => {
	console.info(currentCity)
	const now = new Date()
	const fixTimestamp = 1000 * (currentCity?.timezone ?? 0)
	now.setUTCHours(0, 0, 0, 0)
	now.setTime(now.getTime() - fixTimestamp)
	const beginOfDay = Math.floor(now.getTime() / 1000)
	now.setTime(now.getTime() + fixTimestamp)
	now.setUTCHours(23, 59, 59, 999)
	now.setTime(now.getTime() - fixTimestamp)
	const endOfDay = Math.floor(now.getTime() / 1000)
	return (value: Forecast) => value.dt >= beginOfDay && value.dt <= endOfDay
}
