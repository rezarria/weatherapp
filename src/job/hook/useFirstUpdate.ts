import AsyncStorage from '@react-native-async-storage/async-storage'
import Geolocation, {
	GeolocationError,
	GeolocationResponse,
} from '@react-native-community/geolocation'
import { ReverseResultType, forecast, reverse } from '@src/api/openWeather'
import { City, Forecast } from '@src/data/model'
import { useQuery, useRealm } from '@src/data/realm'
import useForecastStore from '@src/zustand/store'
import { useEffect, useRef } from 'react'
import { BSON, Results } from 'realm'

const useFirstUpdate = () => {
	const [setCity, setStage, stage] = useForecastStore(e => [
		e.setCity,
		e.setStage,
		e.stage,
	])
	const forecastQuery = useQuery(Forecast)
	const realm = useRealm()
	const cityQuery = useQuery(City)
	const currentTask = useRef<Promise<any>>()
	useEffect(() => {
		if (currentTask.current == null && stage === 'first-load') {
			console.debug('Bắt đầu lấy thông tin về địa điểm và thời tiết')
			currentTask.current = loadConfig(cityQuery, forecastQuery, realm)
				.then(currentCity => {
					if (currentCity == null) {
						throw new Error('không tìm thấy địa điểm')
					}
					AsyncStorage.setItem('cityID', currentCity._id.toHexString()).then(
						() => {
							setCity(currentCity)
							setStage('need-update-forecast')
							console.debug('xong')
						}
					)
				})
				.finally(() => {
					currentTask.current = undefined
				})
		}
	}, [cityQuery, forecastQuery, realm, setCity, setStage, stage])
}

async function loadConfig(
	cityQuery: Realm.Results<City>,
	forecastQuery: Realm.Results<Forecast>,
	realm: Realm
) {
	let city: City | undefined
	console.debug('kiểm tra id từ lần trước')
	let id = await AsyncStorage.getItem('cityID')
	if (id == null) {
		console.debug('không tìm thấy id từ lần trước, sử dụng định vị để lấy')
		city = await updateCurrentPlaceByGeo(cityQuery, realm)
	} else {
		console.debug('tìm thấy, bổ sung thông tin từ db')
		const citiesFromDB = cityQuery.filtered(
			'_id == $0',
			BSON.ObjectID.createFromHexString(id)
		)

		if (citiesFromDB.length === 0) {
			console.debug('db không không tìm thấy thông tin, sử dụng định vị để lấy')
			city = await updateCurrentPlaceByGeo(cityQuery, realm)
		} else {
			city = citiesFromDB[0]
		}
	}
	console.debug(`city: ${city?._id} ${city?.name}`)
	return city
}

const getCurrentPostion = () =>
	new Promise(
		(
			resolve: (position: GeolocationResponse) => void,
			reject: ((error: GeolocationError) => void) | undefined
		) =>
			Geolocation.requestAuthorization(
				() =>
					Geolocation.getCurrentPosition(resolve, reject, {
						enableHighAccuracy: true,
					}),
				reject
			)
	)

const findCityByCoords = ({
	coords,
}: GeolocationResponse): Promise<ReverseResultType[]> => {
	console.debug(`truy vấn tọa độ ${coords.latitude} ${coords.longitude}`)
	return reverse(coords.latitude, coords.longitude)
}

const updateCurrentPlaceByGeo = async (
	cityQuery: Realm.Results<City>,
	realm: Realm
) => {
	const geoResult = await getCurrentPostion()
	try {
		const cities = await findCityByCoords(geoResult)
		console.debug(`số lượng địa điểm tìm thấy từ api : ${cities.length}`)
		return saveToDB(cityQuery, realm)(cities)
	} catch (error) {
		console.debug('có lỗi khi truy vấn api')
		return undefined
	}
}

export const fetchForecastIfNeed =
	(realm: Realm, forecastQuery: Results<Forecast>, cityQuery: Results<City>) =>
	async (lat: string, lon: string, _id: BSON.ObjectId) => {
		const nowTimestamp = Math.floor(Date.now() / 1000)
		let forecastsFromDB = forecastQuery.filtered(
			'city_id == $0 AND dt >= $1',
			_id,
			nowTimestamp
		)
		console.debug(`Số lương bản tin lấy từ db : ${forecastsFromDB.length}`)
		if (forecastsFromDB.length < 32) {
			try {
				console.debug('Số lượng bản tin không đủ 5 ngày, lấy thêm từ api')
				const forecastsFromAPI = await forecast(
					parseFloat(lat),
					parseFloat(lon)
				)
				console.debug(`Số lượng lấy từ api ${forecastsFromAPI.list.length}`)
				const cityFromDB = cityQuery.filtered('_id == $0', _id)[0]
				realm.write(() => {
					const timeList = forecastsFromDB.map(i => i.dt)
					forecastsFromAPI.list
						.filter(i => !timeList.includes(i.dt))
						.forEach(item => {
							realm.create(Forecast, {
								_id: new BSON.ObjectId(),
								city_id: _id,
								...item,
							})
						})
					cityFromDB.sunrise = forecastsFromAPI.city.sunrise
					cityFromDB.sunset = forecastsFromAPI.city.sunset
					cityFromDB.timezone = forecastsFromAPI.city.timezone
					console.debug('lưu vào db và cập nhật thông tin về city')
				})
			} catch (error) {}
		}
	}
function saveToDB(cityQuery: Results<City>, realm: Realm) {
	return (results: ReverseResultType[]) => {
		console.debug('lưu địa điểm vào db')
		if (results.length > 0) {
			const city = results[0]
			console.debug(`kiểm tra địa điểm ${city.name} tồn tại trong db không?`)
			let citesQuery = cityQuery.filtered(
				'coord.lat == $0 AND coord.lon == $1',
				city.lat.toFixed(2),
				city.lon.toFixed(2)
			)
			let _id: BSON.ObjectId | null = null
			let cityRecord: City | undefined
			if (citesQuery.length === 0) {
				console.debug('city không tồn tại, lưu vào db')
				_id = new BSON.ObjectID()
				realm.write(() => {
					cityRecord = realm.create(City, {
						_id: _id!,
						country: city.country,
						name: city.name,
						population: 0,
						sunrise: 0,
						sunset: 0,
						timezone: 0,
						coord: { lat: city.lat.toFixed(2), lon: city.lon.toFixed(2) },
					})
				})
			} else {
				_id = citesQuery[0]._id
			}

			return cityRecord
		} else {
			throw new Error('đầu vào rỗng')
		}
	}
}

export default useFirstUpdate
