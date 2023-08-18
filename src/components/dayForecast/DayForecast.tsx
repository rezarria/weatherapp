import Logo from '@assets/svg/clac.svg'
import { Forecast } from '@src/data/model'
import { useQuery } from '@src/data/realm'
import AppStyle from '@src/style/styles'
import useForecastStore from '@src/zustand/store'
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Graph, GraphRef } from './graph'
import { forecast } from '../../api/openWeather'
import { GraphProps } from './graph/Graph'

export type Ref = GraphRef

const DayForecast = forwardRef<Ref>((_props, ref) => {
	const graphRef = useRef<GraphRef>(null)
	const [forecastInWeek, setForecastInWeek] = useState<Forecast[]>([])
	const forecastQuery = useQuery(Forecast)
	const city = useForecastStore(e => e.city)
	useEffect(() => {
		const date = new Date()
		let day = date.getDay()
		date.setDate(date.getDate() - (day === 0 ? 6 : day - 1))
		date.setHours(0, 0, 0, 0)
		const mondayTimestamp = Math.floor(date.getTime() / 1000)
		date.setDate(date.getDate() + 6)
		date.setHours(23, 59, 59, 59)
		const sundayTimestamp = Math.floor(date.getTime() / 1000)
		const forecastsFromDB = forecastQuery.filtered(
			'city_id = $0 AND dt BETWEEN {$1,$2}',
			city?._id,
			mondayTimestamp,
			sundayTimestamp
		)
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

	const maxTemp =
		forecastInWeek.length === 0
			? undefined
			: Math.floor(
					Math.max(...forecastInWeek.map(i => i.main.temp_max)) - 272.15 + 1
			  )

	const minTemp =
		forecast.length === 0
			? undefined
			: Math.floor(
					Math.min(...forecastInWeek.map(i => i.main.temp_min)) - 272.15
			  )

	const step =
		maxTemp && minTemp ? Math.floor((maxTemp - minTemp) / 4) : undefined

	const graphProps: GraphProps | undefined =
		forecastInWeek.length === 0
			? undefined
			: {
					points: forecastInWeek.map(i => ({ y: i.main.temp, x: i.dt })),
					titleY: [maxTemp, maxTemp! - step!, minTemp! + step!, minTemp].map(
						i => `${i}°`
					),

					rangeY: { max: maxTemp! + 272.15, min: minTemp! + 272.15 },

					rangeX: {
						max: Math.max(...forecastInWeek.map(i => i.dt)),
						min: Math.min(...forecastInWeek.map(i => i.dt)),
					},
			  }

	return (
		<View style={[AppStyle.card, styles.container]}>
			<View style={[styles.header]}>
				<Logo />
				<Text style={[AppStyle.font, styles.title]}>Day forecast</Text>
			</View>
			<Graph
				ref={graphRef}
				{...graphProps}
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
