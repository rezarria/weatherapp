import { ReactNode, useEffect } from 'react'
import useForecastStore from '../zustand/store'
import { checkPermission } from './fetchWeather'
import Geolocation from '@react-native-community/geolocation'
import { useQuery, useRealm } from '../data/realm'
import { CityModel } from '../model/city'
import { forecast, reverse } from '../api/openWeather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BSON } from 'realm'
import { getCountryNameByAlpha2 } from 'country-locale-map'

const DataWrapper = (props: { children: ReactNode }) => {
	console.debug('DataWrapper!')
	const [setLocaltion] = useForecastStore(e => [e.setLocaltion])
	const cityQuery = useQuery(CityModel)
	const realm = useRealm()
	useEffect(() => {
		loadConfig(cityQuery, realm, setLocaltion)
	}, [cityQuery, realm, setLocaltion])
	return <>{props.children}</>
}
export default DataWrapper
async function loadConfig(
	cityQuery: Realm.Results<CityModel>,
	realm: Realm,
	setLocaltion: (localtion: string, lat: number, pos: number) => void
) {
	const id = await AsyncStorage.getItem('cityID')
	if (id == null) {
		console.debug('không tìm thấy id => chuyển sang truy vấn từ tạo độ thực tế')
		getCurrentPlace(cityQuery, realm, setLocaltion)
	} else {
		console.debug('tìm thấy id có sẵn => tìm trong cache')
		const cites = cityQuery.filtered(
			'_id == $0',
			BSON.ObjectID.createFromHexString(id)
		)
		if (cites.length === 0) {
			console.debug(
				'không tìm thấy id trong cache => chuyển sang truy vấn từ tạo độ thực tế'
			)
			getCurrentPlace(cityQuery, realm, setLocaltion)
		} else {
			console.debug('tìm thấy id trong cache => cập nhật state 🪄')
			console.debug(cites[0])
			setLocaltion(
				`${cites[0].name}, ${getCountryNameByAlpha2(cites[0].country)}`,
				cites[0].coord.lat,
				cites[0].coord.lon
			)
		}
	}
}

async function getCurrentPlace(
	cityQuery: Realm.Results<CityModel>,
	realm: Realm,
	setLocaltion: (localtion: string, lat: number, pos: number) => void
) {
	await checkPermission()
	let lat: number = 0,
		lon: number = 0
	Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
		lat = latitude
		lon = longitude
	})
	const result = await reverse(lat, lon)
	if (result.length > 0) {
		const city = result[0]
		let query = cityQuery.filtered(
			'coord.lat == $0 AND coord.lon == $1',
			city.lat,
			city.lon
		)
		let _id: BSON.ObjectId | null = null
		if (query.length === 0) {
			_id = new BSON.ObjectID()
			realm.create(CityModel, {
				_id,
				coord: { lat: city.lat, lon: city.lon },
				country: city.country,
				name: city.name,
				population: 0,
				sunrise: 0,
				sunset: 0,
				timezone: 0,
			})
		} else {
			_id = query[0]._id
		}
		setLocaltion(
			`${city.name}, ${getCountryNameByAlpha2(city.country)}`,
			city.lat,
			city.lon
		)
		AsyncStorage.setItem('cityID', _id.toHexString())
		return { lat: city.lat, lon: city.lon }
	} else {
		throw new Error('không tìm thấy địa điểm theo toạ độ hiện tại')
	}
}
