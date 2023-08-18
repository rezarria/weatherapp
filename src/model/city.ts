export interface Coord {
	lat: string
	lon: string
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
