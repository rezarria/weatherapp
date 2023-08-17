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
	lock: 'begin' | 'middle' | 'end'
	action: ReturnType<typeof createAnimation>
}

const createAnimation = (anime: Animated.Value) => {
	return {
		status: Status.SHOW,
		hide: Animated.timing(anime, {
			toValue: 0,
			useNativeDriver: false,
			duration: 300,
		}),
		show: Animated.timing(anime, {
			toValue: 1,
			useNativeDriver: false,
			duration: 300,
		}),
	}
}

const onTouchStart =
	(lastPos: LastPosType) => (event: GestureResponderEvent) => {
		console.info(
			`${event.timeStamp} onTouchStart ${lastPos.lock} ${
				Status[lastPos.action.status]
			}`
		)
	}

const onTouchMove =
	(lastPos: LastPosType) => (event: GestureResponderEvent) => {
		console.info(
			`${event.timeStamp} onTouchMove ${lastPos.lock} ${
				Status[lastPos.action.status]
			}`
		)
	}

const onTouchCancel =
	(lastPos: LastPosType) => (event: GestureResponderEvent) => {
		console.info(
			`${event.timeStamp} onTouchCancel ${lastPos.lock} ${
				Status[lastPos.action.status]
			}`
		)
	}

const onTouchEnd = (lastPos: LastPosType) => (event: GestureResponderEvent) => {
	console.info(
		`${event.timeStamp} onTouchEnd ${lastPos.lock} ${
			Status[lastPos.action.status]
		}`
	)
}

const onScroll =
	(lastPos: LastPosType) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		console.log(event.nativeEvent.contentOffset)
	}

const onScrollBeginDrag =
	(lastPos: LastPosType) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		console.info(
			`${event.timeStamp} onScrollBeginDrag ${lastPos.lock} ${
				Status[lastPos.action.status]
			}`
		)
	}

const onScrollEndDrag =
	(lastPos: LastPosType) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		console.info(
			`${event.timeStamp} onScrollEndDrag ${lastPos.lock} ${
				Status[lastPos.action.status]
			}`
		)
	}

const onScrollToTop =
	(lastPos: LastPosType) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		console.info(
			`${event.timeStamp} onScrollToTop ${lastPos.lock} ${
				Status[lastPos.action.status]
			}`
		)
	}

const onScrollAnimationEnd = () => () => {
	console.info('onScrollAnimationEnd')
}

const onMomentumScrollBegin =
	(lastPos: LastPosType) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		console.info(
			`${event.timeStamp} onMomentumScrollBegin ${lastPos.lock} ${
				Status[lastPos.action.status]
			}`
		)
	}

const onMomentumScrollEnd =
	(lastPos: LastPosType) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		console.info(
			`${event.timeStamp} onMomentumScrollEnd ${lastPos.lock} ${
				Status[lastPos.action.status]
			}`
		)
		if (event.nativeEvent.contentOffset.y === 0) {
			lastPos.action.show.start()
		}
	}

export const createEvents = (anime: Animated.Value) => {
	const lastPos: LastPosType = {
		x: 0,
		y: 0,
		lock: 'begin',
		action: createAnimation(anime),
	}
	return {
		// lastPos: lastPos,
		// onTouchCancel: onTouchCancel(lastPos),
		// onTouchEnd: onTouchEnd(lastPos),
		onScroll: onScroll(lastPos),
		// onTouchStart: onTouchStart(lastPos),
		// onTouchMove: onTouchMove(lastPos),
		// onScrollToTop: onScrollToTop(lastPos),
		// onScrollBeginDrag: onScrollBeginDrag(lastPos),
		// onScrollEndDrag: onScrollEndDrag(lastPos),
		// onScrollAnimationEnd: onScrollAnimationEnd(),
		// onMomentumScrollBegin: onMomentumScrollBegin(lastPos),
		// onMomentumScrollEnd: onMomentumScrollEnd(lastPos),
	}
}

export default createEvents

function isHideSide(lastPos: LastPosType) {
	return (
		lastPos.action.status === Status.HIDDEN ||
		lastPos.action.status === Status.HIDDING
	)
}

function isShowSide(lastPos: LastPosType) {
	return (
		lastPos.action.status === Status.SHOW ||
		lastPos.action.status === Status.SHOWING
	)
}
