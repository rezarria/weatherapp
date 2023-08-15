export default interface Forecast {
	dt: number
	main: Main
	weather: Weather[]
	clounds: Clounds
	wind: Wind
	visibility: number
	pop: number
	rain?: Rain
	snow?: Snow
	sys: Sys
	dt_txt: string
}

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

export interface Clounds {
	all: number
}

export interface Wind {
	speed: number
	deg: number
	gust: number
}

export interface Weather {
	id: number
	main: string
	description: string
	icon: string
}

export interface Rain {
	'3h': number
}

export interface Snow {
	'3h': number
}

export interface Sys {
	pod: string
}
