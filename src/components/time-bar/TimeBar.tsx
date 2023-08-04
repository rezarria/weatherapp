import { Dispatch, SetStateAction, useMemo, useContext } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { RouteType } from '@src/navigator/TabType'
import { MainScreenAnimationContext } from '@src/screen/MainScreen'
import AppStyle from '@src/style/styles'

export type Props = {
	index: number
	setIndex: Dispatch<SetStateAction<number>>
	routes: RouteType[]
}

const TimeBar = (props: Props) => {
	const anime = useContext(MainScreenAnimationContext)

	const container = useMemo(
		() => ({
			backgroundColor: '#0000',
			marginTop: anime.interpolate({
				inputRange: [0, 1],
				outputRange: [-73, 0],
			}),
			marginBottom: 14,
		}),
		[anime]
	)
	return (
		<Animated.View style={[styles.container, container]}>
			{props.routes.map((item, index) => (
				<Pressable
					style={[AppStyle.expand, styles.button]}
					key={index}
					onPress={() => props.setIndex(index)}
				>
					<View style={[]}>
						<Text style={styles.text}>{item.title}</Text>
					</View>
				</Pressable>
			))}
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 18,
		marginBottom: 8,
		flexDirection: 'row',
		marginHorizontal: 16,
		justifyContent: 'space-between',
		alignItems: 'stretch',
		position: 'relative',
		gap: 16,
	},
	button: {
		height: 42,
		borderRadius: 14,
		backgroundColor: '#E0B6FF',
		paddingVertical: 9,
	},
	text: {
		textAlign: 'center',
	},
})

export default TimeBar
