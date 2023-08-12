import { PermissionsAndroid } from 'react-native'
import clm from 'country-locale-map'
import { BSON } from 'realm'
import { City } from '../data/model'

export const checkPermission = async () => {
	try {
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
	} catch (error) {
		console.error('có vấn đề ở checkPermission')
		throw error
	}
}

export const setLocaltionToState =
	(
		setLocaltion: (l: string, lat: number, lon: number) => void,
		cityQuery: Realm.Results<City>,
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
				realm.create(City, {
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
