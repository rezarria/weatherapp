import { Canvas, SkPoint } from '@shopify/react-native-skia'
import AppStyle from '@src/style/styles'
import {
	ForwardedRef,
	forwardRef,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react'
import { LayoutRectangle, StyleSheet, View } from 'react-native'
import DrawCurrentLine, { Ref as DrawCurrentLineRef } from './DrawCurrentLine'
import DrawGrid from './DrawGrid'
import DrawLine from './DrawLine'
import DrawTitleX from './DrawTitleX'
import DrawTitleY from './DrawTitleY'
import NoData from '../../NoData'

type Range = { min: number; max: number }

export type GraphProps = {
	titleX?: string[]
	titleY?: string[]
	titleBeforeX?: string[]
	titleBeforeY?: string[]
	rangeX?: Range
	rangeY?: Range
	points?: SkPoint[]
}

export type GraphRef = DrawCurrentLineRef

const Graph = (props: GraphProps, ref: ForwardedRef<GraphRef>) => {
	const [layoutInfo, setLayoutInfo] = useState<LayoutRectangle>()
	const titleX = useMemo(
		() => props.titleX ?? ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
		[props.titleX]
	)

	const drawCurrentLineRef = useRef<DrawCurrentLineRef>(null)
	useImperativeHandle(
		ref,
		() => ({
			set: (v, d) => {
				drawCurrentLineRef.current?.set(v, d)
			},
		}),
		[]
	)

	return (
		<View style={[AppStyle.expand, styles.container]}>
			<DrawTitleY
				values={props.titleY}
				valuesBefore={props.titleBeforeY}
				pos={{ x: 0, y: 20 }}
				padding={{ left: 0, right: 0, top: 0, bottom: 20 }}
			/>
			<View style={AppStyle.expand}>
				<Canvas
					onLayout={e => {
						const layout = e.nativeEvent.layout
						if (
							layoutInfo == null ||
							layout.height !== layoutInfo.height ||
							layout.width !== layoutInfo.width
						) {
							setLayoutInfo(e.nativeEvent.layout)
						}
					}}
					style={AppStyle.expand}
				>
					{layoutInfo && (
						<>
							<DrawGrid
								nums={props.titleY?.length}
								pos={{ x: 0, y: 20 }}
								padding={{ left: 0, right: 0, top: 0, bottom: 4 }}
								size={layoutInfo}
							/>
							<DrawLine
								points={props.points}
								pos={{ x: 0, y: 20 }}
								padding={{ left: 0, right: 0, top: 0, bottom: 4 }}
								size={layoutInfo}
								x={props.rangeX}
								y={props.rangeY}
							/>
							<DrawCurrentLine
								ref={drawCurrentLineRef}
								pos={{ x: 0, y: 20 }}
								padding={{ left: 0, right: 0, top: 0, bottom: 4 }}
								size={layoutInfo}
								maxValue={props.rangeY?.max ?? 30}
								minValue={props.rangeY?.min ?? 0}
								beginTimestamp={props.rangeX?.min ?? 0}
								endTimestamp={props.rangeX?.max ?? 100}
							/>
						</>
					)}
				</Canvas>
				<DrawTitleX
					height={20}
					values={titleX}
					pos={{ x: 0, y: 0 }}
				/>
				{props.points == null && <NoData />}
			</View>
		</View>
	)
}

export default forwardRef(Graph)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
})
