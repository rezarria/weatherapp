import { City, Forecast } from '@src/data/model'
import { useEffect, useState } from 'react'

const useUpdateDayNightTemp = (
	currentCity: City | undefined,
	forecastsInDay: Forecast[]
) => {
	const [dayNightTemp, setDayNightTemp] = useState(() =>
		calcAvgTemp(currentCity, forecastsInDay)
	)
	useEffect(() => {
		setDayNightTemp(calcAvgTemp(currentCity, forecastsInDay))
	}, [currentCity, forecastsInDay, setDayNightTemp])
	return [dayNightTemp]
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

export default useUpdateDayNightTemp
