import { Forecast } from '@src/data/model'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

function useUpdateCurrentForecast(
	forecastsInDay: Forecast[]
): [Forecast | null, Dispatch<SetStateAction<Forecast | null>>] {
	const [currentForecast, setCurrentForecast] = useState(() =>
		getCurrentForecast(forecastsInDay)
	)
	useEffect(() => {
		const forecast = getCurrentForecast(forecastsInDay)
		setCurrentForecast(forecast)
	}, [forecastsInDay, setCurrentForecast])
	return [currentForecast, setCurrentForecast]
}

const getCurrentForecast = (list: Forecast[]) => {
	if (list.length === 0) {
		return null
	}
	const nowTimestamp = Date.now() / 1000
	let minDif = Infinity
	let closest: Forecast | null = null
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

export default useUpdateCurrentForecast
