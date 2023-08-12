import { BSON } from 'realm'
import { default as ICity, Coord as ICoord } from '@src/model/city'

export class City extends Realm.Object<City> implements ICity {
	_id!: BSON.ObjectId
	name!: string
	coord!: ICoord
	country!: string
	population!: number
	timezone!: number
	sunrise!: number
	sunset!: number
	static schema = {
		name: 'City',
		primaryKey: '_id',
		properties: {
			_id: 'objectId',
			name: 'string',
			coord: 'Coord',
			country: 'string',
			population: 'int',
			timezone: 'int',
			sunrise: 'int',
			sunset: 'int',
		},
	}
}

export class Coord extends Realm.Object<Coord> implements ICoord {
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
