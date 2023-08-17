import {
	Animated,
	Dimensions,
	FlatList,
	Keyboard,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { styles as InputStyle } from './SearchBar.Input'
import AppStyle from '@src/style/styles'
import {
	ForwardedRef,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from 'react'

export type Ref = {
	show: () => void
	hide: () => void
	setText: (text: string) => void
	search: () => void
}
type Props = {}

const Gap = () => (
	<View style={gapStyle.container}>
		<View style={gapStyle.line} />
	</View>
)

const gapStyle = StyleSheet.create({
	container: { width: '100%' },
	line: {
		paddingTop: 2,
		backgroundColor: '#0009',
		borderRadius: 2,
	},
})

const ResultPanel = (_props: Props, ref: ForwardedRef<Ref>) => {
	const value = useRef(new Animated.Value(styles.container.height)).current
	const showAnimated = useRef(new Animated.Value(1)).current
	const showAnimation = useMemo(
		() =>
			Animated.timing(showAnimated, {
				toValue: 1,
				duration: 200,
				useNativeDriver: false,
			}),
		[showAnimated]
	)
	const hideAnimation = useMemo(
		() =>
			Animated.timing(showAnimated, {
				toValue: 0,
				duration: 200,
				useNativeDriver: false,
			}),
		[showAnimated]
	)
	useImperativeHandle(
		ref,
		() => ({
			show: () => {
				showAnimation.stop()
				showAnimation.start()
			},
			hide: () => {
				showAnimation.stop()
				showAnimation.reset()
			},
			search: () => {},
			setText: () => {},
		}),
		[showAnimation]
	)
	useEffect(() => {
		const show = Keyboard.addListener('keyboardDidShow', e => {
			value.stopAnimation(() => {
				Animated.timing(value, {
					toValue: styles.container.height - e.endCoordinates.height,
					duration: 200,
					useNativeDriver: false,
				}).start()
			})
		})
		const hide = Keyboard.addListener('keyboardDidHide', () => {
			value.stopAnimation(() => {
				Animated.timing(value, {
					toValue: styles.container.height,
					duration: 200,
					useNativeDriver: false,
				}).start()
			})
		})
		return () => {
			Keyboard.removeSubscription(show)
			Keyboard.removeSubscription(hide)
		}
	}, [showAnimated, value])
	return (
		<Animated.View
			style={[
				styles.container,
				{
					height: value,
					transform: [
						{
							translateY: showAnimated.interpolate({
								inputRange: [0, 1],
								outputRange: [Dimensions.get('window').height, 0],
								extrapolate: 'clamp',
							}),
						},
					],
					opacity: showAnimated,
				},
			]}
		>
			<Animated.View style={[AppStyle.card, styles.panel]}>
				<FlatList
					data={Array.from(Array(100).keys())}
					keyExtractor={i => i.toString()}
					renderItem={() => (
						<Pressable
							style={event => ({
								marginVertical: 8,
								borderRadius: 8,
								paddingHorizontal: 8,
								flex: 1,
								backgroundColor: event.pressed ? '#ddd' : '#0000',
							})}
						>
							<View style={styles.section}>
								<Text>Hà nội</Text>
								<Text>Việt Nam</Text>
							</View>
						</Pressable>
					)}
					ItemSeparatorComponent={Gap}
				/>
				{exitButton(showAnimated, hideAnimation)}
			</Animated.View>
		</Animated.View>
	)
}

export default forwardRef<Ref, Props>(ResultPanel)

export const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		padding: 16,
		width: '100%',
		height:
			Dimensions.get('window').height -
			InputStyle.input.lineHeight -
			(StatusBar?.currentHeight ?? 0),
		paddingBottom: 32,
		top: InputStyle.input.lineHeight + (StatusBar?.currentHeight ?? 0) + 16,
		zIndex: 4,
	},
	panel: {
		backgroundColor: '#fff',
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	section: {
		paddingVertical: 8,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
})
function exitButton(
	showAnimated: Animated.Value,
	hideAnimation: Animated.CompositeAnimation
) {
	return (
		<Pressable
			style={exitButtonStyles.container}
			onPress={() => {
				showAnimated.stopAnimation(() => hideAnimation.start())
			}}
		>
			<Text style={exitButtonStyles.text}>EXIT</Text>
		</Pressable>
	)
}

const exitButtonStyles = StyleSheet.create({
	text: { textAlign: 'center', fontSize: 18, fontWeight: '800' },
	container: { paddingVertical: 8 },
})
