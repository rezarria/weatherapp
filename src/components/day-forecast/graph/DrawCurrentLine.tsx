import { Line, SkPoint } from '@shopify/react-native-skia'
import { forwardRef, useImperativeHandle, useState } from 'react'

type Props = {
	pos: SkPoint
	size: { width: number; height: number }
	padding: { left: number; right: number; top: number; bottom: number }
	maxValue: number
	minValue: number
	beginTimestamp: number
	endTimestamp: number
}

export type Ref = { set: (value: number, dt: number) => void }

const DrawCurrentLine = forwardRef<Ref, Props>((props, ref) => {
	const [dt, setDt] = useState(props.beginTimestamp)
	const [value, setValue] = useState(props.minValue)
	useImperativeHandle(
		ref,
		() => ({
			set: (v, d) => {
				setValue(v)
				setDt(d)
			},
		}),
		[]
	)
	const height = props.size.height - props.padding.top - props.padding.bottom
	const yRatio =
		(props.size.height -
			props.padding.top -
			props.padding.bottom -
			props.pos.y) /
		(props.maxValue - props.minValue)

	const xRatio =
		(props.size.width -
			props.padding.left -
			props.padding.right -
			props.pos.x) /
		(props.endTimestamp - props.beginTimestamp)
	const y = yRatio * (props.maxValue - value)
	const x = xRatio * (dt - props.beginTimestamp)
	const paddingTop = props.padding.top + props.pos.y + y
	console.log(x)
	return (
		<Line
			p1={{ x, y: paddingTop }}
			p2={{ x, y: height }}
			color={'red'}
			strokeWidth={2}
		/>
	)
})

export default DrawCurrentLine
