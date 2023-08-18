import { Coord as ICoord, default as ICity } from '@src/model/city'
import { BSON } from 'realm'

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
	lat!: string
	lon!: string

	static schema = {
		name: 'Coord',
		embedded: true,
		properties: {
			lat: 'string',
			lon: 'string',
		},
	}
}
