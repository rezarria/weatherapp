import { styles as NavigationAreaStyle } from '@src/components/navigationArea/NavigationArea'
import { RouteType } from '@src/navigator/TabType'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import AppStyle from '@src/style/styles'
import { useContext, useMemo } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'

export type Props = {
	index: number
	setIndex: (n: number) => void
	routes: RouteType[]
}

const TabBar = (props: Props) => {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)

	const container = useMemo(
		() => ({
			marginTop: widthAnimated.interpolate({
				inputRange: [0, NavigationAreaStyle.smallContainer.height],
				outputRange: [0, -8],
				extrapolate: 'clamp',
			}),
		}),
		[widthAnimated]
	)

	return (
		<Animated.View
			style={[
				styles.container,
				container,
				{
					top: widthAnimated.interpolate({
						inputRange: [0, NavigationAreaStyle.smallContainer.height],
						outputRange: [
							NavigationAreaStyle.padding.height +
								NavigationAreaStyle.padding.marginTop,
							NavigationAreaStyle.smallContainer.height,
						],
						extrapolate: 'clamp',
					}),
				},
			]}
		>
			{props.routes.map((item, index) => (
				<Pressable
					style={[AppStyle.expand, styles.button]}
					key={index}
					onPress={() => props.setIndex(index)}
				>
					<View style={[]}>
						<Text style={[AppStyle.font, styles.text]}>{item.title}</Text>
					</View>
				</Pressable>
			))}
		</Animated.View>
	)
}

export const styles = StyleSheet.create({
	container: {
		height: 58,
		backgroundColor: '#0000',
		paddingTop: 8,
		paddingBottom: 8,
		flexDirection: 'row',
		paddingHorizontal: 16,
		justifyContent: 'space-between',
		alignItems: 'stretch',
		position: 'relative',
		left: 0,
		gap: 16,
		marginBottom: 0,
		zIndex: 2,
	},
	button: {
		height: 42,
		borderRadius: 14,
		backgroundColor: '#E0B6FF',
		paddingVertical: 9,
		alignItems: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: 16,
		letterSpacing: 0.5,
		color: '#2E004E',
	},
})

export default TabBar
