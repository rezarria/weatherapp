import { City, Forecast } from '@src/data/model'

export function getMainForecastInDay(data: Forecast[]) {
	if (data.length === 0) {
		return null
	}

	const weatherTypemap = new Map<number, number>()
	data.forEach(item => {
		const k = 100 * Math.floor(item.weather[0].id / 100)
		weatherTypemap.set(k, (weatherTypemap.get(k) ?? 0) + 1)
	})
	const sortedList = Array.from(weatherTypemap.entries()).sort(
		(a, b) => b[1] - a[1]
	)
	const mainForecast = data.find(
		i => Math.floor(i.weather[0].id / 100) * 100 === sortedList[0][0]
	)!
	return {
		id: mainForecast._id,
		dt: mainForecast.dt,
		description: mainForecast.weather[0].description,
		icon: mainForecast.weather[0].icon,
		temp: {
			max: Math.max(...data.map(i => i.main.temp_max)),
			min: Math.min(...data.map(i => i.main.temp_min)),
		},
	}
}

export function divineToGroup(data: Forecast[], city: City) {
	const map = new Map<number, Forecast[]>()
	data.forEach(item => {
		const timestamp = getAdjustedTimestamp(item, city)
		if (!map.has(timestamp)) {
			map.set(timestamp, [])
		}
		map.get(timestamp)!.push(item)
	})
	return Array.from(map.values())
}

function getAdjustedTimestamp(item: Forecast, city: City) {
	const date = new Date((item.dt + city.timezone) * 1000)
	date.setUTCHours(0, 0, 0, 0)
	date.setTime(date.getTime() - city.timezone * 1000)
	return date.getTime()
}
