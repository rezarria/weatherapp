interface Main {
	temp: number
	feels_like: number
	temp_min: number
	temp_max: number
	pressure: number
	sea_level: number
	grnd_level: number
	humidity: number
	tempKf: number
}

interface Clounds {
	all: number
}

interface Wind {
	speed: number
	deg: number
	gust: number
}

interface Weather {
	id: number
	main: string
	description: string
	icon: string
}

interface Rain {
	'3d': number
}

interface Snow {
	'3d': number
}

interface Sys {
	pod: string
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
