import SearchLogo from '@assets/svg/search.svg'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import useForecastStore from '@src/zustand/store'
import React, {
	forwardRef,
	useContext,
	useImperativeHandle,
	useState,
} from 'react'
import { Animated, StyleSheet } from 'react-native'
import { styles as NavigationAreaStyles } from 'src/components/navigationArea/NavigationArea'
import Input from '@component/navigationArea/component/SearchBar.Input'

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

const styles = StyleSheet.create({
	icon: {
		width: 24,
		height: 24,
		flexShrink: 0,
	},
	container: {
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 28,
	},
})

export default SearchBar
