import SearchLogo from '@assets/svg/search.svg'
import { styles as NavigationAreaStyles } from '@component/navigationArea/NavigationArea'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import React, {
	forwardRef,
	useContext,
	useImperativeHandle,
	useMemo,
} from 'react'
import { Animated, StyleSheet } from 'react-native'
import Input from './SearchBar.Input'

export type Ref = {}
export type Props = {}

const SearchBar = forwardRef<Ref, Props>((props, ref) => {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	useImperativeHandle(ref, () => ({}), [])
	const containerAnimation = useMemo(
		() => ({
			marginBottom: widthAnimated.interpolate({
				inputRange: [0, NavigationAreaStyles.smallContainer.height],
				outputRange: [40, 11],
				extrapolate: 'clamp',
			}),
		}),
		[widthAnimated]
	)
	return (
		<Animated.View style={[styles.container, containerAnimation]}>
			<Input />
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
