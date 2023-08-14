import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppStyle from '@src/style/styles'
import Logo from '@assets/svg/clac.svg'
import { Graph, GraphRef } from './graph'
import { Forecast } from '@src/data/model'
import { useQuery } from '@src/data/realm'
import useForecastStore from '@src/zustand/store'

export type Ref = GraphRef

const DayForecast = forwardRef<Ref>((_props, ref) => {
	const graphRef = useRef<GraphRef>(null)
	const [forecastInWeek, setForecastInWeek] = useState<Forecast[]>([])
	const forecastQuery = useQuery(Forecast)
	const city = useForecastStore(e => e.city)
	useEffect(() => {
		const forecastsFromDB = forecastQuery.filtered('city_id = $0', city?._id)
		if (forecastsFromDB.length > 0) {
			setForecastInWeek(Array.from(forecastsFromDB))
		}
	}, [city, forecastQuery])
	useImperativeHandle(
		ref,
		() => ({
			set: (v, d) => {
				graphRef.current?.set(v, d)
			},
		}),
		[]
	)

	const maxTemp = Math.floor(
		Math.max(...forecastInWeek.map(i => i.main.temp_max)) - 272.15 + 1
	)
	const minTemp = Math.floor(
		Math.min(...forecastInWeek.map(i => i.main.temp_min)) - 272.15
	)

	const step = Math.floor((maxTemp - minTemp) / 4)

	const titleY = [maxTemp, maxTemp - step, minTemp + step, minTemp].map(
		i => `${i}°`
	)

	const points = forecastInWeek.map(i => ({ y: i.main.temp, x: i.dt }))

	return (
		<View style={[AppStyle.card, styles.container]}>
			<View style={[styles.header]}>
				<Logo />
				<Text style={[AppStyle.font, styles.title]}>Day forecast</Text>
			</View>
			<Graph
				ref={graphRef}
				rangeY={{ max: maxTemp + 272.15, min: minTemp + 272.15 }}
				rangeX={{
					max: Math.max(...forecastInWeek.map(i => i.dt)),
					min: Math.min(...forecastInWeek.map(i => i.dt)),
				}}
				points={points}
				titleY={titleY}
			/>
		</View>
	)
})

export default DayForecast

const styles = StyleSheet.create({
	container: {
		minHeight: 150,
	},
	header: {
		flexDirection: 'row',
		gap: 8,
	},
	title: {
		lineHeight: 24,
		letterSpacing: 0.15,
	},
})
