import axios from 'axios'
import City from '../model/city'
import Forecast from '../model/forecast'

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
				lat: lat.toFixed(2),
				lon: lon.toFixed(2),
			},
		})
		.then(res => {
			if (res.status === 200) {
				return res.data
			} else {
				throw new Error(JSON.stringify(res.config))
			}
		})

export type ReverseResultType = {
	name: string
	local_names: {
		[key: string]: string
	}
	lat: number
	lon: number
	state: string
	country: string
}

const reverse = (lat: number, lon: number, limit: number = 5) => {
	console.debug(`tìm kiếm địa điểm từ tọa độ ${lat} ${lon}`)
	return openWeather
		.get<ReverseResultType[]>('/geo/1.0/reverse', {
			params: { lat, lon, limit },
		})
		.then(res => {
			if (res.status === 200) {
				return res.data
			} else {
				throw res
			}
		})
		.catch(r => {
			console.debug(`có lỗi phát sinh khi gọi api lấy địa điểm, mess: ${r}`)
			throw r
		})
}

export { forecast, reverse }
export default openWeather
