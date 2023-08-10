import Geolocation from '@react-native-community/geolocation'
import { PermissionsAndroid } from 'react-native'
import {
	forecast as fetchForecast,
	reverse as callApiReverse,
} from '../api/openWeather'
import clm from 'country-locale-map'
import { CityModel } from '../model/city'
import { ForecastModel } from '../model/forecast'
import { BSON } from 'realm'

export const fetchWeather = (realm: Realm) => {
	console.log(realm.isEmpty)
}

export const firstJob = (
	realm: Realm,
	forecastQuery: Realm.Results<ForecastModel>,
	setLocaltion: (l: string, lat: number, lon: number) => void,
	callback: () => void
) =>
	checkPermission().then(() =>
		Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) =>
			callApiReverse(latitude, longitude)
				.then(setLocaltionToState(setLocaltion, cityQuery, realm))
				.then(updateForecast(realm, forecastQuery))
				.then(callback)
				.catch(console.error)
		)
	)

export const checkPermission = async () => {
	const grant = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
		{
			title: 'Location permission',
			buttonPositive: 'OK',
			message: 'PLS',
		}
	)
	if (grant !== PermissionsAndroid.RESULTS.GRANTED) {
		throw grant
	}
}

const updateForecast =
	(realm: Realm, query: Realm.Results<ForecastModel>) =>
	async ({ lat, lon }: { lat: number; lon: number }) => {
		const nowTimestamp = Math.floor(Date.now() / 1000)
		const fiveDay = new Date()
		fiveDay.setUTCDate(fiveDay.getUTCDate() + 5)
		fiveDay.setUTCHours(23, 0, 0, 0)
		const fiveDayTimestamp = Math.floor(fiveDay.getTime() / 1000)
		if (
			query.filtered(
				'$0 >= dt AND dt <= $1 AND coord.lat == $2 AND coord.lon == $3',
				nowTimestamp,
				fiveDayTimestamp,
				lat,
				lon
			).length < 32
		) {
			const forecastDate = await fetchForecast(lat, lon)
			realm.write(() => {
				forecastDate.list.forEach(item => {
					realm.create(ForecastModel, {
						_id: new BSON.ObjectID(),
						coord: { lat, lon },
						...item,
					})
				})
			})
		}
	}

export const setLocaltionToState =
	(
		setLocaltion: (l: string, lat: number, lon: number) => void,
		cityQuery: Realm.Results<CityModel>,
		realm: Realm
	) =>
	(
		result: {
			name: string
			local_names: { [key: string]: string }
			lat: number
			lon: number
			state: string
			country: string
		}[]
	) => {
		const localtion = result[0]
		setLocaltion(
			`${localtion.local_names.en}, ${clm.getCountryNameByAlpha2(
				localtion.country
			)}`,
			localtion.lat,
			localtion.lon
		)
		if (
			cityQuery.filtered(
				'country == $0 AND name == $1',
				localtion.country,
				localtion.name
			).length === 0
		) {
			realm.write(() => {
				realm.create(CityModel, {
					_id: new BSON.ObjectID(),
					coord: { lat: localtion.lat, lon: localtion.lon },
					country: localtion.country,
					name: localtion.name,
					population: 0,
					sunrise: 0,
					sunset: 0,
					timezone: 0,
				})
			})
		}
		return localtion
	}
