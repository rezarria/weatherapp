export interface Coord {
	lat: number
	lon: number
}

export default interface City {
	name: string
	coord: Coord
	country: string
	population: number
	timezone: number
	sunrise: number
	sunset: number
}
