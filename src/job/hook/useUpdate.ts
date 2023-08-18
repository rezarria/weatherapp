import { BSON, Results } from 'realm'
import { City, Forecast } from '@src/data/model'
import { useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Geolocation, {
	GeolocationError,
	GeolocationResponse,
} from '@react-native-community/geolocation'
import { ReverseResultType, forecast, reverse } from '@src/api/openWeather'
import useForecastStore from '@src/zustand/store'
import { useQuery, useRealm } from '@src/data/realm'

const useUpdate = () => {
	const [setCity, updateTick] = useForecastStore(e => [e.setCity, e.updateTick])
	const forecastQuery = useQuery(Forecast)
	const realm = useRealm()
	const cityQuery = useQuery(City)
	const currentTask = useRef<Promise<any>>()
	useEffect(() => {
		if (currentTask.current != null) {
			currentTask.current = loadConfig(cityQuery, forecastQuery, realm).then(
				currentCity => {
					if (currentCity == null) {
						throw new Error('không tìm thấy địa điểm')
					}
					fetchForecastIfNeed(
						realm,
						forecastQuery,
						cityQuery
					)(currentCity).then(() => {
						updateTick()
						setCity(currentCity)
						currentTask.current = undefined
					})
				}
			)
		}
	}, [cityQuery, forecastQuery, realm, setCity, updateTick])
}

async function loadConfig(
	cityQuery: Realm.Results<City>,
	forecastQuery: Realm.Results<Forecast>,
	realm: Realm
) {
	const id = await AsyncStorage.getItem('cityID')
	if (id == null) {
		return await updateCurrentPlaceByGeo(cityQuery, realm)
	}

	const citesFromCache = cityQuery.filtered(
		'_id == $0',
		BSON.ObjectID.createFromHexString(id)
	)

	if (citesFromCache.length === 0) {
		return await updateCurrentPlaceByGeo(cityQuery, realm)
	}

	return citesFromCache[0]
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
}: GeolocationResponse): Promise<ReverseResultType[]> =>
	reverse(coords.latitude, coords.longitude)

const updateCurrentPlaceByGeo = async (
	cityQuery: Realm.Results<City>,
	realm: Realm
) => {
	const geoResult = await getCurrentPostion()
	const cites = await findCityByCoords(geoResult)
	return saveToDB(cityQuery, realm)(cites)
}

const fetchForecastIfNeed =
	(realm: Realm, query: Results<Forecast>, city: Results<City>) =>
	async ({ coord: { lat, lon }, _id }: City) => {
		const nowTimestamp = Math.floor(Date.now() / 1000)
		let forecastsFromDB = query.filtered(
			'city_id == $0 AND dt >= $1',
			_id,
			nowTimestamp
		)
		if (forecastsFromDB.length < 32) {
			try {
				const forecastsFromAPI = await forecast(lat, lon)
				const cityFromDB = city.filtered('_id == $0', _id)[0]
				realm.write(() => {
					forecastsFromAPI.list.forEach(item => {
						realm.create(Forecast, {
							_id: new BSON.ObjectId(),
							city_id: _id,
							...item,
						})
					})
					cityFromDB.sunrise = forecastsFromAPI.city.sunrise
					cityFromDB.sunset = forecastsFromAPI.city.sunset
					cityFromDB.timezone = forecastsFromAPI.city.timezone
				})
			} catch (error) {}
		} else {
		}
	}
function saveToDB(cityQuery: Results<City>, realm: Realm) {
	return (results: ReverseResultType[]) => {
		if (results.length > 0) {
			const city = results[0]
			let citesQuery = cityQuery.filtered(
				'coord.lat == $0 AND coord.lon == $1',
				city.lat,
				city.lon
			)
			let _id: BSON.ObjectId | null = null
			let cityRecord: City | undefined
			if (citesQuery.length === 0) {
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
						coord: { lat: city.lat, lon: city.lon },
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

export default useUpdate
