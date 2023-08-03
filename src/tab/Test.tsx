import React, { memo } from 'react'
import { View } from 'react-native'
import {
	ComposedGesture,
	Gesture,
	GestureType,
	PanGestureHandler,
} from 'react-native-gesture-handler'

export default function TestScreen() {
	const tap = Gesture.Pan()
		.onStart(e => {
			console.log(e)
		})
		.onChange(e => {
			console.log(e)
		})
	return (
		<View style={{ flex: 1 }}>
			<G
				component={View}
				gesture={tap}
				props={{
					style: { flex: 1, backgroundColor: 'blue' },
				}}
			/>
		</View>
	)
}

const G = memo(
	<P, T extends React.ComponentType<any>>(props: {
		component: T
		gesture: ComposedGesture | GestureType
		props: P
	}) => {
		return (
			<PanGestureHandler>
				{React.createElement(props.component, props.props)}
			</PanGestureHandler>
		)
	}
)
