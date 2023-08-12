import { create } from 'zustand'
import { City } from '../data/model'

type State = {
	city?: City
}

type Actions = {
	setCity: (city: City) => void
}

export type ForecastState = State & Actions

const useForecastStore = create<ForecastState>()(set => ({
	setCity(city) {
		set({ city })
	},
}))

export default useForecastStore
