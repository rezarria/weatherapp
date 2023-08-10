import axios from 'axios'
import { City } from '../model/city'
import { Forecast } from '../model/forecast'

const openWeather = axios.create({
	baseURL: 'http://api.openweathermap.org',
	params: {
		appid: '2884d119cff52f16358765715e53c9b6',
	},
	responseType: 'json',
})

const forecast = (lat: number, lon: number) =>
	openWeather
		.get<{
			cod: string
			message: number
			cnt: number
			list: Forecast[]
			city: City
		}>('/data/2.5/forecast', {
			params: {
				lat,
				lon,
			},
		})
		.then(res => {
			if (res.status === 200) {
				return res.data
			} else {
				throw res
			}
		})

type ResultType = {
	name: string
	local_names: {
		[key: string]: string
	}
	lat: number
	lon: number
	state: string
	country: string
}

const reverse = (lat: number, lon: number, limit: number = 5) =>
	openWeather
		.get<ResultType[]>('/geo/1.0/reverse', {
			params: { lat, lon, limit },
		})
		.then(res => {
			if (res.status === 200) {
				return res.data
			} else {
				throw res
			}
		})

export { forecast, reverse }
export default openWeather
