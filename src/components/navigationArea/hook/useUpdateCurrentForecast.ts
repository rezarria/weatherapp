import { Forecast } from '@src/data/model'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

function useUpdateCurrentForecast(
	forecastsInDay: Forecast[]
): [Forecast | undefined, Dispatch<SetStateAction<Forecast | undefined>>] {
	const [currentForecast, setCurrentForecast] = useState<Forecast>()
	useEffect(() => {
		const forecast = getCurrentForecast(forecastsInDay)
		setCurrentForecast(forecast)
	}, [forecastsInDay, setCurrentForecast])
	return [currentForecast, setCurrentForecast]
}

const getCurrentForecast = (list: Forecast[]) => {
	if (list.length === 0) {
		return undefined
	}
	const nowTimestamp = Date.now() / 1000
	let minDif = Infinity
	let closest: Forecast | undefined
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
