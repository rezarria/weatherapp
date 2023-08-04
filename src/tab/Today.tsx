import { PropsWithChildren, useCallback, useRef } from 'react'
import { Button, GestureResponderEvent, ScrollView, View } from 'react-native'
import AppStyle from '@src/style/styles'
import {
	WindCard,
	HourlyForecast,
	DayForecast,
	ChanceOfRain,
} from '@src/components'
import { TabParamList } from '../navigator/TabType'
import { TabActionHelpers } from '@react-navigation/native'
import { SceneRendererProps } from 'react-native-tab-view'

export type ParamList = {
	Today: undefined
	Tomorrow: undefined
}

function Group({ children }: PropsWithChildren) {
	return <View style={AppStyle.group}>{children}</View>
}

const TodayScreen = (
	_props: SceneRendererProps & TabActionHelpers<TabParamList>
) => {
	const lastPos = useRef<{ x: number; y: number } | null>(null)
	const lock = useRef(true)
	const onStart = useCallback((e: GestureResponderEvent) => {
		console.info('start')
		lastPos.current = {
			x: e.nativeEvent.locationX,
			y: e.nativeEvent.locationY,
		}
	}, [])
	const onCancel = useCallback((_: GestureResponderEvent) => {
		lastPos.current = null
	}, [])
	const onMove = ({
		nativeEvent: { locationX, locationY },
	}: GestureResponderEvent) => {
		if (lock.current) {
			const _dx = locationX - lastPos.current!.x
			const _dy = locationY - lastPos.current!.y
		} else {
		}
		lastPos.current!.x = locationX
		lastPos.current!.y = locationY
	}
	const scrollViewRef = useRef<ScrollView>(null)

	return (
		<ScrollView
			ref={scrollViewRef}
			onScroll={e => {
				lock.current = e.nativeEvent.contentOffset.y === 0
				console.info(`error: ${lock.current}`)
			}}
			onTouchStart={onStart}
			onTouchMove={onMove}
			onTouchEnd={onCancel}
			onTouchCancel={onCancel}
		>
			<View style={AppStyle.scrollView}>
				<Group>
					<WindCard />
					<WindCard />
				</Group>
				<DayForecast />
				<ChanceOfRain
					data={[
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
						{ time: new Date(), value: 14 },
					]}
				/>
				<HourlyForecast />
				<Group>
					<WindCard />
					<WindCard />
				</Group>
				<Group>
					<WindCard />
					<WindCard />
				</Group>
				<Group>
					<WindCard />
					<WindCard />
				</Group>
				<Group>
					<WindCard />
					<WindCard />
				</Group>
				<Group>
					<WindCard />
					<WindCard />
				</Group>
				<Group>
					<WindCard />
					<WindCard />
				</Group>
				<Group>
					<WindCard />
					<WindCard />
				</Group>
			</View>
		</ScrollView>
	)
}

export default TodayScreen
