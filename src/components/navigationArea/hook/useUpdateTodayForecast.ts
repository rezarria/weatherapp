import { City, Forecast } from '@src/data/model'
import { useEffect, useState } from 'react'
import { useQuery } from '@src/data/realm'
import { BSON } from 'realm'

const useUpdateTodayForecast = (currentCity: City | undefined) => {
	const query = useQuery(Forecast)
	const [forecastsInDay, setForecastInDay] = useState<Forecast[]>(() =>
		getTodayForecasts(query, currentCity?._id)
	)
	useEffect(() => {
		setForecastInDay(getTodayForecasts(query, currentCity?._id))
	}, [query, currentCity, setForecastInDay])
	return [forecastsInDay]
}

const getTodayForecasts = (
	query: Realm.Results<Forecast>,
	id?: BSON.ObjectId
) => {
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
		'dt BETWEEN {$0,$1} AND city_id == $2',
		beginDayTimestamp,
		endDayTimestamp,
		id
	)
	return [...result]
}

export default useUpdateTodayForecast
