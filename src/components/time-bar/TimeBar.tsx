import {
	Dispatch,
	SetStateAction,
	forwardRef,
	useImperativeHandle,
	useRef,
} from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { RouteType } from '../../navigator/TabType'

export type Props = {
	index: number
	setIndex: Dispatch<SetStateAction<number>>
	routes: RouteType[]
}
export type Ref = {
	setY: (n: number) => void
}

const TimeBar = forwardRef<Ref, Props>((props, ref) => {
	useImperativeHandle(
		ref,
		() => ({
			setY: _n => {},
		}),
		[]
	)

	const anime = useRef(new Animated.Value(0)).current

	const isForced = (_index: number) => {
		return {}
	}
	return (
		<Animated.View
			style={[
				styles.container,
				{
					marginTop: anime,
				},
			]}
		>
			{props.routes.map((item, index) => (
				<Pressable
					style={styles.button}
					key={index}
					onPress={() => props.setIndex(index)}
				>
					<View style={[isForced(index)]}>
						<Text style={styles.text}>{item.title}</Text>
					</View>
				</Pressable>
			))}
		</Animated.View>
	)
})

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
		flex: 1,
		borderRadius: 14,
		backgroundColor: '#E0B6FF',
		paddingVertical: 9,
	},
	text: {
		textAlign: 'center',
	},
})

export default TimeBar
