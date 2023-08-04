import { PropsWithChildren, useCallback, useRef, useContext } from 'react'
import { Animated, GestureResponderEvent, ScrollView, View } from 'react-native'
import AppStyle from '@src/style/styles'
import {
	WindCard,
	HourlyForecast,
	DayForecast,
	ChanceOfRain,
} from '@src/components'
import { MainScreenAnimationContext } from '../screen/MainScreen'

export type ParamList = {
	Today: undefined
	Tomorrow: undefined
}

function Group({ children }: PropsWithChildren) {
	return <View style={AppStyle.group}>{children}</View>
}
enum Status {
	hidden,
	show,
	hidding,
	showing,
}
const TodayScreen = () => {
	const scrollViewRef = useRef<ScrollView>(null)
	const anime = useContext(MainScreenAnimationContext)
	const action = useRef({
		status: Status.show,
		hidden: Animated.timing(anime, {
			toValue: 0,
			useNativeDriver: false,
			duration: 400,
		}),
		show: Animated.timing(anime, {
			toValue: 1,
			useNativeDriver: false,
			duration: 300,
		}),
	})
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
	const onMove = ({ nativeEvent }: GestureResponderEvent) => {
		if (lock.current) {
			const dy = nativeEvent.locationY - lastPos.current!.y
			if (dy > 0) {
				if (
					action.current.status !== Status.show &&
					action.current.status !== Status.showing
				) {
					if (action.current.status === Status.hidding) {
						action.current.hidden.stop()
					}

					action.current.status = Status.showing
					action.current.show.start(() => (action.current.status = Status.show))
				}
			}
		} else if (
			action.current.status !== Status.hidden &&
			action.current.status !== Status.hidding
		) {
			if (action.current.status === Status.showing) {
				action.current.show.stop()
			}
			action.current.status = Status.hidding
			action.current.hidden.start(() => (action.current.status = Status.hidden))
		}
		lastPos.current!.y = nativeEvent.locationY
	}

	return (
		<ScrollView
			ref={scrollViewRef}
			onScroll={e => {
				lock.current = e.nativeEvent.contentOffset.y === 0
				if (lock.current) {
					if (
						action.current.status === Status.hidden ||
						action.current.status === Status.hidding
					) {
						if (action.current.status === Status.hidding) {
							action.current.hidden.stop()
						}
						action.current.status = Status.showing
						action.current.show.start(
							() => (action.current.status = Status.hidden)
						)
					}
				} else {
					if (action.current.status === Status.showing) {
						action.current.show.stop()
					}
					action.current.status = Status.hidding
					action.current.hidden.start(
						() => (action.current.status = Status.hidden)
					)
				}
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
