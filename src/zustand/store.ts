import { create } from 'zustand'
import { Forecast } from '../model/forecast'
import { forecast } from '../api/openWeather'

type State = {
	lat: number
	lon: number
	forecast: Forecast[]
}

type Actions = {
	clear: () => void
	fetch: (lat: number, lon: number) => void
}

type ForecastState = State & Actions

const useForecastStore = create<ForecastState>()(set => ({
	lat: 0,
	lon: 0,
	forecast: [],
	clear: () => {
		set({ lat: 0, lon: 0, forecast: [] })
	},
	fetch: async (lat, lon) => {
		await forecast(lat, lon).then(data =>
			set({ lat, lon, forecast: data.list })
		)
	},
}))

export default useForecastStore
