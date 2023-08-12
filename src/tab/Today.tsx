import { PropsWithChildren, useContext, useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import AppStyle from '@src/style/styles'
import {
	WindCard,
	HourlyForecast,
	DayForecast,
	ChanceOfRain,
} from '@src/components'
import { MainScreenAnimationEventsContext } from '@src/screen/MainScreen'
import useForecastStore from '../zustand/store'
import { useQuery } from '../data/realm'
import { BSON } from 'realm'
import { Forecast } from '../data/model'

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
	const currentForecast = findClosestForcast(list)
	let oldForecast: Forecast | undefined
	if (currentForecast != null) {
		const index = list.indexOf(currentForecast)
		if (index !== 0) {
			oldForecast = list[index - 1]
		}
	}
	const show = list.length > 0
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
