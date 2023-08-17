import SearchLogo from '@assets/svg/search.svg'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import useForecastStore from '@src/zustand/store'
import React, {
	Dispatch,
	forwardRef,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react'
import { Animated, StyleSheet, TextInput } from 'react-native'
import { styles as NavigationAreaStyles } from './NavigationArea'

export type Ref = {}
export type Props = {}

const SearchBar = forwardRef<Ref, Props>((props, ref) => {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)

	useImperativeHandle(ref, () => ({}), [])
	const currentCity = useForecastStore(e => e.city)
	const [input, setInput] = useState(currentCity?.name ?? '')
	return (
		<Animated.View
			style={[
				styles.container,
				{
					marginBottom: widthAnimated.interpolate({
						inputRange: [0, NavigationAreaStyles.smallContainer.height],
						outputRange: [40, 11],
						extrapolate: 'clamp',
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
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const [color, setColor] = useState('#fff')
	const callback = useCallback((v: { value: number }) => {
		const n = (1 - v.value / NavigationAreaStyles.smallContainer.height) * 255
		setColor(`rgb(${n},${n},${n})`)
	}, [])
	useEffect(() => {
		const id = widthAnimated.addListener(callback)
		return () => {
			widthAnimated.removeListener(id)
		}
	}, [callback, widthAnimated])
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
