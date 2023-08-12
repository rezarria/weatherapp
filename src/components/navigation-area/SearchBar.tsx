import React, {
	Dispatch,
	SetStateAction,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react'
import { Animated, StyleSheet, TextInput } from 'react-native'
import SearchLogo from '@assets/svg/search.svg'
import { MainScreenAnimationContext } from '@src/screen/MainScreen'
import useForecastStore from '../../zustand/store'

export type Ref = {}
export type Props = {}

const SearchBar = forwardRef<Ref, Props>((props, ref) => {
	const anime = useContext(MainScreenAnimationContext)

	useImperativeHandle(ref, () => ({}), [])
	const currentCity = useForecastStore(e => e.city)
	const [input, setInput] = useState(currentCity?.name ?? '')
	return (
		<Animated.View
			style={[
				styles.container,
				{
					marginBottom: anime.interpolate({
						inputRange: [0, 1],
						outputRange: [11, 40],
					}),
				},
			]}
		>
			<Input
				input={input}
				setInput={setInput}
			/>
			<SearchLogo style={styles.icon} />
		</Animated.View>
	)
})

function Input(props: {
	input: string
	setInput: Dispatch<SetStateAction<string>>
}) {
	const anime = useContext(MainScreenAnimationContext)
	const [color, setColor] = useState('#fff')
	const callback = useCallback((v: { value: number }) => {
		const n = v.value * 255
		setColor(`rgb(${n},${n},${n})`)
	}, [])
	useEffect(() => {
		const id = anime.addListener(callback)
		return () => {
			anime.removeListener(id)
		}
	}, [callback, anime])
	return (
		<TextInput
			value={props.input}
			onChangeText={props.setInput}
			style={[styles.input, { color: color }]}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		fontFamily: 'ProductSans',
		fontSize: 22,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 28,
		padding: 0,
		margin: 0,
	},
	icon: {
		width: 24,
		height: 24,
		flexShrink: 0,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 28,
	},
})

export default SearchBar
