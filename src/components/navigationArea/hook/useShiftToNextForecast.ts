import { Forecast } from '@src/data/model'
import { useEffect } from 'react'

const useShiftToNextForecast = (
	currentForecast: Forecast | undefined,
	forecastsInDay: Forecast[],
	setCurrentForecast: React.Dispatch<React.SetStateAction<Forecast | undefined>>
) => {
	useEffect(() => {
		if (currentForecast) {
			const timeAboveTimestamp =
				(currentForecast.dt - Math.floor(Date.now() / 1000)) * 1000
			const task = setInterval(() => {
				const nextForecast = forecastsInDay.at(
					forecastsInDay.indexOf(currentForecast) + 1
				)
				if (nextForecast) {
					setCurrentForecast(nextForecast)
				}
			}, timeAboveTimestamp)
			return () => {
				clearInterval(task)
			}
		}
	}, [currentForecast, forecastsInDay, setCurrentForecast])
}

export default useShiftToNextForecast
