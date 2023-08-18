import { Button } from 'react-native'
import useForecastStore from '../zustand/store'
import { useQuery, useRealm } from '../data/realm'
import { City } from '../data/model'
import { direct } from '../api/openWeather'
import { BSON } from 'realm'
import { useEffect, useRef, useState } from 'react'

const Test = () => {
	const [setCity] = useForecastStore(e => [e.setCity])
	const realm = useRealm()
	const cityQuery = useQuery(City)
	const [_tick, setTick] = useState(0)
	const job = useRef<Promise<any>>()
	useEffect(() => {
		if (cityQuery.length < 3) {
			if (job.current == null) {
				job.current = Promise.all([
					fetchCity('vinh', realm),
					fetchCity('thanh hoa', realm),
					fetchCity('london', realm),
				]).then(() => {
					console.log('nạp xong dữ liệu')
					setTick(i => i + 1)
				})
			}
		}
	}, [cityQuery.length, realm])
	return (
		<>
			<Button
				title={'a'}
				onPress={() => {
					const city = cityQuery.filtered('name == $0', 'Vinh')[0]
					console.log('🚀 ~ file: Test.tsx:31 ~ Test ~ city:', city)
					setCity(city)
				}}
			/>
			<Button
				title={'b'}
				onPress={() => {
					const city = cityQuery[1]
					console.log('🚀 ~ file: Test.tsx:39 ~ Test ~ city:', city)
					setCity(city)
				}}
			/>
			<Button
				title={'c'}
				onPress={() => {
					const city = cityQuery[2]
					console.log('🚀 ~ file: Test.tsx:47 ~ Test ~ city:', city)
					setCity(city)
				}}
			/>
		</>
	)
}

export default Test
function fetchCity(localtion: string, realm: Realm) {
	return direct(localtion).then(data => {
		realm.write(() => {
			realm.create(City, {
				_id: new BSON.ObjectId(),
				coord: {
					lat: data[0].lat.toFixed(2),
					lon: data[0].lon.toFixed(2),
				},
				name: data[0].name,
				country: data[0].country,
				population: 0,
				sunrise: 0,
				sunset: 0,
				timezone: 0,
			})
		})
	})
}
