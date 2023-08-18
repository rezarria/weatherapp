import { styles as InputStyle } from '@component/navigationArea/component/SearchBar.Input'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DirectType, direct } from '@src/api/openWeather'
import { City } from '@src/data/model'
import { useQuery, useRealm } from '@src/data/realm'
import AppStyle from '@src/style/styles'
import useForecastStore from '@src/zustand/store'
import { getCountryNameByAlpha2 } from 'country-locale-map'
import {
	Dispatch,
	ForwardedRef,
	SetStateAction,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react'
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
import { BSON } from 'realm'

export type Ref = {
	show: () => void
	hide: () => void
	search: (localtion: string) => void
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

const Section = (props: {
	name: string
	country: string
	onPress?: () => void
}) => (
	<Pressable
		onPress={props.onPress}
		style={event => ({
			marginVertical: 8,
			borderRadius: 8,
			paddingHorizontal: 8,
			flex: 1,
			backgroundColor: event.pressed ? '#ddd' : '#0000',
		})}
	>
		<View style={styles.section}>
			<Text style={[AppStyle.font]}>{props.name}</Text>
			<Text style={[AppStyle.font]}>
				{getCountryNameByAlpha2(props.country)}
			</Text>
		</View>
	</Pressable>
)

const ResultPanel = (_props: Props, ref: ForwardedRef<Ref>) => {
	const { showAnimation, animation, hideAnimation, showAnimated } =
		useAnimation()
	const [results, setResults] = useState<DirectType[]>([])
	const [setCity, setStage] = useForecastStore(s => [s.setCity, s.setStage])
	const cityQuery = useSetupRef(ref, showAnimation, setResults)
	return (
		<Animated.View style={[styles.container, animation.container]}>
			<Animated.View style={[AppStyle.card, styles.panel]}>
				<FlatList
					data={results}
					keyExtractor={i => i.name + i.country + i.state}
					renderItem={({ item }) => (
						<Section
							country={item.country}
							name={item.name}
							onPress={() => {
								const city = cityQuery.filtered(
									'coord.lat == $0 AND coord.lon == $1',
									item.lat.toFixed(2),
									item.lon.toFixed(2)
								)[0]
								if (city == null) {
									throw new Error('không tìm thấy địa điểm trong db')
								}
								hideAnimation.start()
								AsyncStorage.setItem('cityID', city._id.toHexString())
								console.debug(`chọn ${city.name} ${city.country}`)
								setCity(city)
								setStage('need-update-forecast')
								console.debug('chuyển sang stage update forecast')
							}}
						/>
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
function useSetupRef(
	ref: ForwardedRef<Ref>,
	showAnimation: Animated.CompositeAnimation,
	setResults: Dispatch<SetStateAction<DirectType[]>>
) {
	const realm = useRealm()
	const cityQuery = useQuery(City)
	const task = useRef<Promise<any>>()
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
			search: localtion => {
				if (task.current == null) {
					task.current = direct(localtion).then(data => {
						data.forEach(item => {
							if (
								cityQuery.filtered(
									'coord.lat == $0 AND coord.lon == $1',
									item.lat.toFixed(2),
									item.lon.toFixed(2)
								).length === 0
							) {
								realm.write(() => {
									realm.create(City, {
										_id: new BSON.ObjectID(),
										coord: {
											lat: item.lat.toFixed(2),
											lon: item.lon.toFixed(2),
										},
										country: item.country,
										name: item.name,
										population: 0,
										sunrise: 0,
										sunset: 0,
										timezone: 0,
									})
								})
							}
						})
						setResults(data)
						task.current = undefined
					})
				}
			},
		}),
		[cityQuery, realm, setResults, showAnimation]
	)
	return cityQuery
}

function useAnimation() {
	const value = useRef(new Animated.Value(styles.container.height)).current
	const showAnimated = useRef(new Animated.Value(0)).current
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
	const animation = useMemo(
		() => ({
			container: {
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
		}),
		[showAnimated, value]
	)
	return { showAnimation, animation, hideAnimation, showAnimated }
}

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
