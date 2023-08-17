import { City } from '@src/data/model'
import { create } from 'zustand'

type State = {
	city?: City
	tick: number
}

type Actions = {
	setCity: (city: City) => void
	updateTick: () => void
}

export type ForecastState = State & Actions

const useForecastStore = create<ForecastState>()(set => ({
	tick: 0,
	setCity(city) {
		set({ city })
	},
	updateTick: () =>
		set(state => ({
			tick: state.tick + 1,
		})),
}))

export default useForecastStore
