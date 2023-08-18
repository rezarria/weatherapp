import { City } from '@src/data/model'
import { create } from 'zustand'

type Stage = 'do-nothing' | 'first-load' | 'need-update-forecast'

type State = {
	city?: City
	tick: number
	stage: Stage
}

type Actions = {
	setCity: (city: City) => void
	updateTick: () => void
	setStage: (newStage: Stage) => void
}

export type ForecastState = State & Actions

const useForecastStore = create<ForecastState>()(set => ({
	tick: 0,
	stage: 'first-load',
	setCity(city) {
		set({ city })
	},
	updateTick: () =>
		set(state => ({
			tick: state.tick + 1,
		})),
	setStage: newStage => set({ stage: newStage }),
}))

export default useForecastStore
