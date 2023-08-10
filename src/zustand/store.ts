import { create } from 'zustand'

type State = {
	localtionName: string
	lat: number
	lon: number
}

type Actions = {
	setLocaltion: (localtion: string, lat: number, pos: number) => void
}

export type ForecastState = State & Actions

const useForecastStore = create<ForecastState>()(set => ({
	localtionName: '',
	lat: 0,
	lon: 0,
	setLocaltion: (localtionName, lat, lon) => {
		set({ localtionName, lat, lon })
	},
}))

export default useForecastStore
