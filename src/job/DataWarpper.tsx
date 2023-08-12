import { ReactNode, useEffect } from 'react'
import useForecastStore from '../zustand/store'
import { checkPermission } from './fetchWeather'
import Geolocation, {
	GeolocationError,
	GeolocationResponse,
} from '@react-native-community/geolocation'
import { useQuery, useRealm } from '../data/realm'
import { ReverseResultType, forecast, reverse } from '../api/openWeather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BSON, Results } from 'realm'
import { City, Forecast } from '../data/model'

const DataWrapper = (props: { children?: ReactNode }) => {
	console.debug('DataWrapper!')
	const [setCity] = useForecastStore(e => [e.setCity])
	const cityQuery = useQuery(City)
	const forecastQuery = useQuery(Forecast)
	const realm = useRealm()
	useEffect(() => {
		loadConfig(cityQuery, forecastQuery, realm, setCity).then(config => {
			console.debug('nạp config xong')
			console.debug(JSON.stringify(config))
			fetchForecastIfNeed(realm, forecastQuery, cityQuery)(config)
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return <>{props.children}</>
}
export default DataWrapper
async function loadConfig(
	cityQuery: Realm.Results<City>,
	forecastQuery: Realm.Results<Forecast>,
	realm: Realm,
	setCity: (city: City) => void
) {
	const id = await AsyncStorage.getItem('cityID')
	if (id == null) {
		console.debug('không tìm thấy id => chuyển sang truy vấn từ tạo độ thực tế')
		return await updateCurrentPlaceByGeo(
			cityQuery,
			forecastQuery,
			realm,
			setCity
		)
	}

	console.debug('tìm thấy id đã lưu => tìm trong db')
	const citesFromCache = cityQuery.filtered(
		'_id == $0',
		BSON.ObjectID.createFromHexString(id)
	)

	if (citesFromCache.length === 0) {
		console.debug(
			'không tìm thấy id trong cache => chuyển sang truy vấn từ tọa độ thực tế'
		)
		return await updateCurrentPlaceByGeo(
			cityQuery,
			forecastQuery,
			realm,
			setCity
		)
	}

	console.debug('tìm thấy id trong cache => cập nhật state 🪄')
	setCity(citesFromCache[0])
	return {
		lat: citesFromCache[0].coord.lat,
		lon: citesFromCache[0].coord.lon,
		id: BSON.ObjectId.createFromHexString(id),
	}
}

const getCurrentPostion = () =>
	new Promise(
		(
			resolve: (position: GeolocationResponse) => void,
			reject: ((error: GeolocationError) => void) | undefined
		) => Geolocation.getCurrentPosition(resolve, reject)
	)

const findCityByCoords = ({
	coords,
}: GeolocationResponse): Promise<ReverseResultType[]> =>
	reverse(coords.latitude, coords.longitude)

const updateCurrentPlaceByGeo = async (
	cityQuery: Realm.Results<City>,
	forecastQuery: Realm.Results<Forecast>,
	realm: Realm,
	setCity: (city: City) => void
) => {
	await checkPermission()
	const geoResult = await getCurrentPostion()
	const cites = await findCityByCoords(geoResult)
	console.debug(`số city tìm thấy ${cites.length}`)
	return saveToDB(cityQuery, realm, setCity)(cites)
}

const fetchForecastIfNeed =
	(realm: Realm, query: Results<Forecast>, city: Results<City>) =>
	async ({ lat, lon, id }: { lat: number; lon: number; id: BSON.ObjectId }) => {
		console.debug(`kiểm tra forecast liên quan đến địa chỉ này ${lat} ${lon}`)
		let forecasts = query.filtered(
			'city_id = $0 AND dt >= $1',
			id,
			Math.floor(Date.now() / 1000)
		)
		console.debug(`số forecast tìm thấy trong db: ${forecast.length}`)
		if (forecasts.length < 32) {
			console.debug('truy vấn thêm từ openweather')
			try {
				const data = await forecast(lat, lon)
				console.debug(`số lượng bản ghi từ api : ${data.list.length}`)
				const cityRecord = city.find(i => i._id === id)!
				realm.write(() => {
					data.list.forEach(item =>
						realm.create(Forecast, {
							_id: new BSON.ObjectId(),
							city_id: id,
							...item,
						})
					)
					cityRecord.sunrise = data.city.sunrise
					cityRecord.sunset = data.city.sunset
				})
			} catch (error) {
				console.debug('có lỗi khi truy vấn api')
				console.debug(error)
			}
		} else {
			console.debug('số liệu có vẻ mới')
		}
	}
function saveToDB(
	cityQuery: Results<City>,
	realm: Realm,
	setCity: (city: City) => void
) {
	return (results: ReverseResultType[]) => {
		if (results.length > 0) {
			const city = results[0]
			let citesQuery = cityQuery.filtered(
				'coord.lat == $0 AND coord.lon == $1',
				city.lat,
				city.lon
			)
			let _id: BSON.ObjectId | null = null
			console.log('kiểm tra địa chỉ đã tồn tại trong db.')
			let cityRecord: City | undefined
			if (citesQuery.length === 0) {
				console.log('địa chỉ không tồn tại => lưu vào db')
				_id = new BSON.ObjectID()
				realm.write(() => {
					cityRecord = realm.create(City, {
						_id: _id!,
						coord: { ...city },
						country: city.country,
						name: city.name,
						population: 0,
						sunrise: 0,
						sunset: 0,
						timezone: 0,
					})
				})
			} else {
				_id = citesQuery[0]._id
			}
			setCity(cityRecord!)
			AsyncStorage.setItem('cityID', _id.toHexString())
			return { lat: city.lat, lon: city.lon, id: _id }
		} else {
			throw new Error('đầu vào rỗng')
		}
	}
}
