import AsyncStorage from '@react-native-async-storage/async-storage'
import Geolocation, {
	GeolocationError,
	GeolocationResponse,
} from '@react-native-community/geolocation'
import { forecast, reverse, ReverseResultType } from '@src/api/openWeather'
import { City, Forecast } from '@src/data/model'
import { useQuery, useRealm } from '@src/data/realm'
import { ReactNode, useEffect } from 'react'
import { BSON, Results } from 'realm'
import useForecastStore from '../zustand/store'

const DataUpdate = (props: { children?: ReactNode }) => {
	const updateTick = useForecastStore(e => e.updateTick)
	const [setCity] = useForecastStore(e => [e.setCity])
	const cityQuery = useQuery(City)
	const forecastQuery = useQuery(Forecast)
	const realm = useRealm()
	useEffect(() => {
		loadConfig(cityQuery, forecastQuery, realm, setCity)
			.then(config => {
				fetchForecastIfNeed(realm, forecastQuery, cityQuery)(config)
			})
			.then(() => {
				updateTick()
			})
	}, [cityQuery, forecastQuery, realm, setCity, updateTick])
	return <>{props.children}</>
}
export default DataUpdate
async function loadConfig(
	cityQuery: Realm.Results<City>,
	forecastQuery: Realm.Results<Forecast>,
	realm: Realm,
	setCity: (city: City) => void
) {
	const id = await AsyncStorage.getItem('cityID')
	if (id == null) {
		return await updateCurrentPlaceByGeo(
			cityQuery,
			forecastQuery,
			realm,
			setCity
		)
	}

	const citesFromCache = cityQuery.filtered(
		'_id == $0',
		BSON.ObjectID.createFromHexString(id)
	)

	if (citesFromCache.length === 0) {
		return await updateCurrentPlaceByGeo(
			cityQuery,
			forecastQuery,
			realm,
			setCity
		)
	}

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
	forecastQuery: Realm.Results<Forecast>,
	realm: Realm,
	setCity: (city: City) => void
) => {
	const geoResult = await getCurrentPostion()
	const cites = await findCityByCoords(geoResult)
	return saveToDB(cityQuery, realm, setCity)(cites)
}

const fetchForecastIfNeed =
	(realm: Realm, query: Results<Forecast>, city: Results<City>) =>
	async ({ lat, lon, id }: { lat: number; lon: number; id: BSON.ObjectId }) => {
		const nowTimestamp = Math.floor(Date.now() / 1000)
		let forecastsFromDB = query.filtered(
			'city_id = $0 AND dt >= $1',
			id,
			nowTimestamp
		)
		if (forecastsFromDB.length < 32) {
			try {
				const forecastsFromAPI = await forecast(lat, lon)
				const cityFromDB = city.filtered('_id = $0', id)[0]
				realm.write(() => {
					forecastsFromAPI.list.forEach(item => {
						realm.create(Forecast, {
							_id: new BSON.ObjectId(),
							city_id: id,
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
			AsyncStorage.setItem('cityID', _id.toHexString()).then(() =>
				setCity(cityRecord!)
			)
			return { lat: city.lat, lon: city.lon, id: _id }
		} else {
			throw new Error('đầu vào rỗng')
		}
	}
}
