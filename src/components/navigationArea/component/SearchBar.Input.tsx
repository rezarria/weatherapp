import {
	Dispatch,
	SetStateAction,
	useContext,
	useState,
	useCallback,
	useEffect,
} from 'react'
import { StyleSheet, TextInput } from 'react-native'
import {
	ResultPanelRefContext,
	WidthMainScreenAnimatedContext,
} from '@src/screen/MainScreen'
import { styles as NavigationAreaStyles } from 'src/components/navigationArea/NavigationArea'

function Input(props: {
	input: string
	setInput: Dispatch<SetStateAction<string>>
}) {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const resultPanelRef = useContext(ResultPanelRefContext)
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
		<>
			<TextInput
				value={props.input}
				returnKeyType={'search'}
				onChangeText={props.setInput}
				onSubmitEditing={e => {
					resultPanelRef?.current?.search(e.nativeEvent.text)
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
