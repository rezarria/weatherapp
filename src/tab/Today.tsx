import { PropsWithChildren, useContext, useMemo } from 'react'
import { Falsy, ScrollView, View } from 'react-native'
import AppStyle from '@src/style/styles'
import {
	WindCard,
	HourlyForecast,
	DayForecast,
	ChanceOfRain,
} from '@src/components'
import { MainScreenAnimationEventsContext } from '@src/screen/MainScreen'
import { Forecast, ForecastModel } from '../model/forecast'
import useForecastStore from '../zustand/store'
import { useQuery } from '../data/realm'

export type ParamList = {
	Today: undefined
	Tomorrow: undefined
}

function Group({
	children,
	target = false,
}: PropsWithChildren<{ target: object | Falsy }>) {
	return <View style={AppStyle.group}>{children && target && children}</View>
}

const TodayScreen = () => {
	const animationEvents = useContext(MainScreenAnimationEventsContext)
	const query = useQuery(ForecastModel)
	const [postion] = useForecastStore(store => [
		{ lat: store.lat, lon: store.lon },
	])
	const list = useMemo(
		() => getCurrentForecast(query, postion),
		[postion, query]
	)
	const currentForecast = findClosestForcast(list)
	const oldForecast =
		currentForecast && list.indexOf(currentForecast) !== 0
			? list[list.indexOf(currentForecast) - 1]
			: null
	return (
		<ScrollView {...animationEvents}>
			<View style={AppStyle.scrollView}>
				<Group target={currentForecast}>
					<WindCard
						value={currentForecast!.wind.speed}
						unit={'km/h'}
						guestValue={
							currentForecast!.wind.speed -
							(oldForecast?.wind.speed ?? currentForecast!.wind.speed)
						}
					/>
				</Group>
				<DayForecast />
				<ChanceOfRain
					data={[
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
					]}
				/>
				<HourlyForecast />
			</View>
		</ScrollView>
	)
}

export default TodayScreen

const getCurrentForecast = (
	query: Realm.Results<ForecastModel>,
	postion: { lat: number; lon: number }
) => {
	const nowTimestamp = Math.floor(Date.now() / 1000)
	query.filtered(
		'$0 >= dt AND coord.lat = $1 AND coord.lon = $2 SORT(dt ASC) LIMIT(40)',
		nowTimestamp,
		postion.lat,
		postion.lon
	)
	return Array.from(query.values())
}
const findClosestForcast: (
	list: ForecastModel[]
) => ForecastModel | null = list => {
	const nowTimestamp = Math.floor(Date.now() / 1000)
	let minDif = Infinity
	let closestForecast: ForecastModel | null = null
	list.forEach(forecast => {
		const dif = Math.abs(forecast.dt - nowTimestamp)
		if (dif < minDif) {
			closestForecast = forecast
		}
	})
	return closestForecast
}
