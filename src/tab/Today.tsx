import { PropsWithChildren, useContext, useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import AppStyle from '@src/style/styles'
import {
	WindCard,
	HourlyForecast,
	DayForecast,
	ChanceOfRain,
	RainChance,
	Pressure,
} from '@src/components'
import { MainScreenAnimationEventsContext } from '@src/screen/MainScreen'
import useForecastStore from '../zustand/store'
import { useQuery } from '../data/realm'
import { BSON } from 'realm'
import { City, Forecast } from '../data/model'

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
	const animationEvents = useContext(MainScreenAnimationEventsContext)
	const query = useQuery(Forecast)
	const currentCity = useForecastStore(store => store.city)
	const list = useMemo(
		() => getCurrentForecast(query, currentCity?._id),
		[currentCity, query]
	)
	const todayForecasts = useMemo(
		() => list.filter(filterTodayForecasts(currentCity)),
		[currentCity, list]
	)
	//------------------------------------
	const currentForecast = findClosestForcast(list)
	let oldForecast: Forecast | undefined
	if (currentForecast != null) {
		const index = list.indexOf(currentForecast)
		if (index !== 0) {
			oldForecast = list[index - 1]
		}
	}
	const show = list.length > 0

	console.debug(`số lượng forecast đã nạp : ${list.length}`)
	console.debug(`số lượng forecast trong ngày : ${todayForecasts.length}`)
	query.forEach(i => console.debug(JSON.stringify(i.rain)))

	return (
		<ScrollView {...animationEvents}>
			<View style={AppStyle.scrollView}>
				<Group target={show}>
					<WindCard
						value={currentForecast?.wind?.speed}
						unit={'km/h'}
						guestValue={
							currentForecast?.wind?.speed ??
							0 -
								(oldForecast?.wind?.speed ?? currentForecast?.wind?.speed ?? 0)
						}
					/>
					<RainChance value={currentForecast?.rain?.['3h']} />
				</Group>
				<Group target={show}>
					<Pressure
						value={currentForecast?.main.pressure}
						initValue={oldForecast?.main.pressure}
					/>
				</Group>
				<DayForecast />
				<ChanceOfRain
					data={todayForecasts.map(i => ({
						time: i.dt,
						value: i.rain?.['3h'] ?? 0,
					}))}
				/>
				<HourlyForecast data={todayForecasts} />
			</View>
		</ScrollView>
	)
}

export default TodayScreen

const getCurrentForecast = (
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
	const now = new Date()
	const fixTimestamp = 1000 * (currentCity?.timezone ?? 0)
	now.setUTCHours(0, 0, 0, 0)
	now.setTime(now.getTime() + fixTimestamp)
	const beginOfDay = Math.floor(now.getTime() / 1000)
	now.setTime(now.getTime() - fixTimestamp)
	now.setUTCHours(23, 59, 59, 999)
	now.setTime(now.getTime() + fixTimestamp)
	const endOfDay = Math.floor(now.getTime() / 1000)
	return (value: Forecast) => value.dt >= beginOfDay && value.dt <= endOfDay
}
