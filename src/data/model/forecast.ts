import { BSON, List } from 'realm'
import {
	Clounds as IClounds,
	default as IForecast,
	Main as IMain,
	Rain as IRain,
	Snow as ISnow,
	Sys as ISys,
	Weather as IWeather,
	Wind as IWind,
} from '@src/model/forecast'

export class Forecast
	extends Realm.Object<Forecast>
	implements Omit<IForecast, 'weather'>
{
	_id!: BSON.ObjectId
	city_id!: BSON.ObjectId

	dt!: number
	main!: IMain
	weather!: List<IWeather>
	clounds!: IClounds
	wind!: IWind
	visibility!: number
	pop!: number
	rain!: IRain
	snow!: ISnow
	sys!: ISys
	dt_txt!: string
	static schema = {
		name: 'Forecast',
		primaryKey: '_id',
		properties: {
			_id: 'objectId',
			city_id: 'objectId',
			dt: 'int',
			main: 'Main',
			weather: { type: 'list', objectType: 'Weather' },
			clounds: 'Clounds',
			wind: 'Wind',
			visibility: 'int',
			pop: 'int',
			rain: 'Rain',
			snow: 'Snow?',
			sys: 'Sys',
			dt_txt: 'string',
		},
	}
}

export class Sys extends Realm.Object<Sys> implements ISys {
	pod!: string
	static schema = {
		name: 'Sys',
		embedded: true,
		properties: {
			pod: 'string',
		},
	}
}

export class Snow extends Realm.Object<Snow> implements ISnow {
	'3d'!: number
	static schema = {
		name: 'Snow',
		embedded: true,
		properties: { '3d': 'float' },
	}
}

export class Rain extends Realm.Object<Rain> implements IRain {
	'3d'!: number
	static schema = {
		name: 'Rain',
		embedded: true,
		properties: { '3d': 'float' },
	}
}

export class Weather extends Realm.Object<Weather> implements IWeather {
	id!: number
	main!: string
	description!: string
	icon!: string
	static schema = {
		name: 'Weather',
		embedded: true,
		properties: {
			id: 'int',
			main: 'string',
			description: 'string',
			icon: 'string',
		},
	}
}

export class Wind extends Realm.Object<Wind> implements IWind {
	speed!: number
	deg!: number
	gust!: number
	static schema = {
		name: 'Wind',
		embedded: true,
		properties: {
			speed: 'float',
			deg: 'int',
			gust: 'int',
		},
	}
}

export class Clounds extends Realm.Object<Clounds> implements IClounds {
	all!: number
	static schema = {
		name: 'Clounds',
		embedded: true,
		properties: {
			all: 'int',
		},
	}
}

export class Main extends Realm.Object<Main> implements IMain {
	temp!: number
	feels_like!: number
	temp_min!: number
	temp_max!: number
	pressure!: number
	sea_level!: number
	grnd_level!: number
	humidity!: number
	temp_kf!: number

	static schema = {
		name: 'Main',
		embedded: true,
		properties: {
			temp: 'float',
			feels_like: 'float',
			temp_min: 'float',
			temp_max: 'float',
			pressure: 'int',
			sea_level: 'int',
			grnd_level: 'int',
			humidity: 'int',
			temp_kf: 'float',
		},
	}
}
