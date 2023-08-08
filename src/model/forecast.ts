import { BSON } from 'realm'

export interface Main {
	temp: number
	feels_like: number
	temp_min: number
	temp_max: number
	pressure: number
	sea_level: number
	grnd_level: number
	humidity: number
	temp_kf: number
}

export class MainModel extends Realm.Object implements Main {
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

export interface Clounds {
	all: number
}

export class CloundsModel extends Realm.Object implements Clounds {
	all!: number
	static schema = {
		name: 'Clounds',
		embedded: true,
		properties: {
			all: 'int',
		},
	}
}

export interface Wind {
	speed: number
	deg: number
	gust: number
}

export class WindModel extends Realm.Object implements Wind {
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

export interface Weather {
	id: number
	main: string
	description: string
	icon: string
}

export class WeatherModel extends Realm.Object implements Weather {
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

export interface Rain {
	'3d': number
}

export class RainModel extends Realm.Object implements Rain {
	'3d'!: number
	static schema = {
		name: 'Rain',
		embedded: true,
		properties: { '3d': 'float' },
	}
}

export interface Snow {
	'3d': number
}

export class SnowModel extends Realm.Object implements Snow {
	'3d'!: number
	static schema = {
		name: 'Snow',
		embedded: true,
		properties: { '3d': 'float' },
	}
}

export interface Sys {
	pod: string
}

export class SysModel extends Realm.Object implements Sys {
	pod!: string
	static schema = {
		name: 'Sys',
		embedded: true,
		properties: {
			pod: 'string',
		},
	}
}

export interface Forecast {
	dt: number
	main: Main
	weather: Weather[]
	clounds: Clounds
	wind: Wind
	visibility: number
	pop: number
	rain: Rain
	snow: Snow
	sys: Sys
	dt_txt: string
}

export class ForecastModel extends Realm.Object implements Forecast {
	_id!: BSON.ObjectId
	dt!: number
	main!: Main
	weather!: Weather[]
	clounds!: Clounds
	wind!: Wind
	visibility!: number
	pop!: number
	rain!: Rain
	snow!: Snow
	sys!: Sys
	dt_txt!: string
	static schema = {
		name: 'Forecast',
		properties: {
			_id: 'objectId',
			dt: 'int',
			main: 'Main',
			weather: { type: 'list', objectType: 'Weather' },
			clounds: 'Clounds',
			wind: 'Wind',
			visibility: 'int',
			pop: 'int',
			rain: 'Rain',
			snow: 'Snow',
			sys: 'Sys',
			dt_txt: 'string',
		},
		primaryKey: '_id',
	}
}
