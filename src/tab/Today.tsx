import { PropsWithChildren, memo, useCallback, useRef } from 'react'
import { Button, GestureResponderEvent, ScrollView, View } from 'react-native'
import AppStyle from '@src/style/styles'
import {
	WindCard,
	HourlyForecast,
	DayForecast,
	ChanceOfRain,
} from '@src/components'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'

export type ParamList = {
	Today: undefined
	Tomorrow: undefined
}

function Group({ children }: PropsWithChildren) {
	return <View style={AppStyle.group}>{children}</View>
}

const TodayScreen = ({
	route,
	navigation,
}: MaterialTopTabScreenProps<ParamList, 'Today'>) => {
	console.log('🚀 ~ file: Today.tsx:26 ~ TodayScreen ~ route:', route)
	console.log('🚀 ~ file: Today.tsx:30 ~ TodayScreen ~ navigation:', navigation)
	const lastPos = useRef<{ x: number; y: number } | null>(null)
	const look = useRef(true)
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
	const onMove = useCallback(
		({ nativeEvent: { locationX, locationY } }: GestureResponderEvent) => {
			if (look.current) {
				const _dx = locationX - lastPos.current!.x
				const _dy = locationY - lastPos.current!.y
			} else {
				console.log('.....')
			}
			lastPos.current!.x = locationX
			lastPos.current!.y = locationY
		},
		[]
	)

	return (
		<ScrollView
			onScroll={e => {
				look.current = e.nativeEvent.contentOffset.y === 0
				console.info(`error: ${look.current}`)
			}}
			onTouchStart={onStart}
			onTouchMove={onMove}
			onTouchEnd={onCancel}
			onTouchCancel={onCancel}
		>
			<View style={AppStyle.scrollView}>
				<Button
					title={'123'}
					onPress={() => {
						navigation.navigate('Tomorrow')
					}}
				/>
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

export default memo(TodayScreen)
