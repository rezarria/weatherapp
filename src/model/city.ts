interface Coord {
	lat: number
	lon: number
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
