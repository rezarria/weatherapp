import { BSON, List, Object } from 'realm'
import { ForecastModel } from './forecast'

interface Coord {
	lat: number
	lon: number
}

export class CoordRealm extends Object implements Coord {
	lat!: number
	lon!: number

	static schema = {
		name: 'Coord',
		embedded: true,
		properties: {
			lat: 'float',
			lon: 'float',
		},
	}
}

export interface City {
	id: number
	name: string
	coord: Coord
	country: string
	population: number
	timezone: number
	sunrise: number
	sunset: number
}

export class CityModel extends Realm.Object implements City {
	_id!: BSON.ObjectId
	id!: number
	name!: string
	coord!: Coord
	country!: string
	population!: number
	timezone!: number
	sunrise!: number
	sunset!: number
	forecasts?: List<ForecastModel>
	static schema = {
		name: 'City',
		primaryKey: '_id',
		properties: {
			_id: 'objectId',
			id: 'int',
			name: 'string',
			coord: 'Coord',
			country: 'string',
			population: 'int',
			timezone: 'int',
			sunrise: 'int',
			sunset: 'int',
			forecasts: {
				type: 'list',
				objectType: 'Forecast',
				optinal: true,
			},
		},
	}
}
