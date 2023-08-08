import {
	Animated,
	GestureResponderEvent,
	NativeScrollEvent,
	NativeSyntheticEvent,
} from 'react-native'

export enum Status {
	HIDDEN,
	HIDDING,
	SHOW,
	SHOWING,
}

type LastPosType = {
	x: number
	y: number
	lock: boolean
	action: ReturnType<typeof createAnimation>
}

const createAnimation = (anime: Animated.Value) => {
	return {
		status: Status.SHOW,
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
	}
}

const onStart = (lastPos: LastPosType) => (event: GestureResponderEvent) => {
	lastPos.x = event.nativeEvent.locationX
	lastPos.y = event.nativeEvent.locationY
}

const onMove = (_lastPos: LastPosType) => () => {}

const onCancel = (lastPos: LastPosType) => () => {
	lastPos.lock = false
}

const onScroll =
	(lastPos: LastPosType) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		lastPos.lock = event.nativeEvent.contentOffset.y === 0
		if (lastPos.lock) {
			if (
				lastPos.action.status === Status.HIDDEN ||
				lastPos.action.status === Status.HIDDING
			) {
				if (lastPos.action.status === Status.HIDDING) {
					lastPos.action.hidden.stop()
				}
				lastPos.action.status = Status.SHOWING
				lastPos.action.show.start(() => (lastPos.action.status = Status.SHOW))
			}
		} else {
			if (lastPos.action.status === Status.SHOWING) {
				lastPos.action.show.stop()
			}
			lastPos.action.status = Status.HIDDING
			lastPos.action.hidden.start(() => (lastPos.action.status = Status.HIDDEN))
		}
	}

export const createEvents = (anime: Animated.Value) => {
	const lastPos: LastPosType = {
		x: 0,
		y: 0,
		lock: false,
		action: createAnimation(anime),
	}
	return {
		lastPos: lastPos,
		onTouchCancel: onCancel(lastPos),
		onTouchEnd: onCancel(lastPos),
		onScroll: onScroll(lastPos),
		onTouchStart: onStart(lastPos),
		onTouchMove: onMove(lastPos),
	}
}

export default createEvents
