import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
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
}: PropsWithChildren<{ target: any }>) {
	return (
		<View style={AppStyle.group}>
			{children && target === false && children}
		</View>
	)
}

const TodayScreen = () => {
	const animationEvents = useContext(MainScreenAnimationEventsContext)
	const [_list, setList] = useState<Forecast[]>([])
	const [forecast, setForecast] = useState<Forecast | null>(null)
	const [postion] = useForecastStore(store => [
		{ lat: store.lat, lon: store.lon },
	])
	const query = useQuery(ForecastModel)
	useEffect(() => {
		//getCurrentForecast(query, postion, setList, setForecast)
	}, [postion, query])
	return (
		<ScrollView {...animationEvents}>
			<View style={AppStyle.scrollView}>
				<Group target={forecast}>
					<WindCard />
					<WindCard />
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
				<Group target={forecast}>
					<WindCard />
					<WindCard />
				</Group>
				<Group target={forecast}>
					<WindCard />
					<WindCard />
				</Group>
				<Group target={forecast}>
					<WindCard />
					<WindCard />
				</Group>
				<Group target={forecast}>
					<WindCard />
					<WindCard />
				</Group>
				<Group target={forecast}>
					<WindCard />
					<WindCard />
				</Group>
				<Group target={forecast}>
					<WindCard />
					<WindCard />
				</Group>
				<Group target={forecast}>
					<WindCard />
					<WindCard />
				</Group>
			</View>
		</ScrollView>
	)
}

export default TodayScreen

const getCurrentForecast = (
	query: Realm.Results<ForecastModel>,
	postion: { lat: number; lon: number },
	setList: React.Dispatch<React.SetStateAction<Forecast[]>>,
	setForecast: React.Dispatch<React.SetStateAction<Forecast | null>>
) => {
	const nowTimestamp = Math.floor(Date.now() / 1000)
	query.filtered(
		'$0 >= dt AND dt <= $1 AND coord.lat = $2 AND coord.lon = $3',
		nowTimestamp,
		nowTimestamp + 24 * 60 * 60,
		postion.lat,
		postion.lon
	)
	const list = Array.from(query.values())
	if (list.length > 0) {
		setForecast(list[0])
		setList(list)
	}
}
