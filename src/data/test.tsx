import { BSON } from 'realm'
import { CityModel } from '../model/city'

export function test(realm: Realm) {
	realm.write(() => {
		realm.create(CityModel, {
			_id: new BSON.ObjectID(),
			id: 1,
			country: 'VN',
			name: 'BR',
			population: 100,
			timezone: 9,
			sunrise: 1,
			sunset: 2,
			coord: { lat: 12.4, lon: 13 },
		})
	})
}
