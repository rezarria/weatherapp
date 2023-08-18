import { NavigationAreaStyles } from '@component/navigationArea'
import {
	ResultPanelRefContext,
	WidthMainScreenAnimatedContext,
} from '@src/screen/MainScreen'
import useForecastStore from '@src/zustand/store'
import { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

function Input() {
	const [currentCity] = useForecastStore(e => [e.city])
	const [input, setInput] = useState('')
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const resultPanelRef = useContext(ResultPanelRefContext)
	const [color, setColor] = useState('#fff')
	const callback = useCallback((v: { value: number }) => {
		const n = (1 - v.value / NavigationAreaStyles.smallContainer.height) * 255
		setColor(`rgb(${n},${n},${n})`)
	}, [])
	useEffect(() => {
		setInput(currentCity?.name ?? '')
	}, [currentCity])
	useEffect(() => {
		const id = widthAnimated.addListener(callback)
		return () => {
			widthAnimated.removeListener(id)
		}
	}, [callback, widthAnimated])
	return (
		<>
			<TextInput
				placeholder={'typing some where?'}
				value={input}
				returnKeyType={'search'}
				onChangeText={setInput}
				onSubmitEditing={e => {
					if (e.nativeEvent.text.length !== 0) {
						resultPanelRef?.current?.search(e.nativeEvent.text)
					}
				}}
				style={[styles.input, { color }]}
				onFocus={() => {
					resultPanelRef?.current?.show()
				}}
				onBlur={() => {
					// resultPanelRef?.current?.hide()
				}}
			/>
		</>
	)
}

export const styles = StyleSheet.create({
	input: {
		fontFamily: 'ProductSans',
		fontSize: 22,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 28,
		padding: 0,
		margin: 0,
		flex: 1,
	},
})

export default Input
