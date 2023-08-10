import { Canvas } from '@shopify/react-native-skia'
import { useState } from 'react'
import { LayoutRectangle, StyleSheet, View } from 'react-native'
import DrawTitleY from './DrawTitleY'
import DrawGrid from './DrawGrid'
import DrawLine from './DrawLine'
import DrawTitleX from './DrawTitleX'
import AppStyle from '../../../style/styles'

type Props = {
	titleX?: string[]
	titleY?: string[]
	titleBeforeX?: string[]
	titleBeforeY?: string[]
}

const Graph = (props: Props) => {
	const [layoutInfo, setLayoutInfo] = useState<LayoutRectangle>()
	return (
		<View style={[AppStyle.expand, styles.container]}>
			{props.titleY && (
				<DrawTitleY
					values={props.titleY}
					valuesBefore={props.titleBeforeY}
					pos={{ x: 0, y: 20 }}
					padding={{ left: 0, right: 0, top: 0, bottom: 20 }}
				/>
			)}
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
								nums={3}
								pos={{ x: 0, y: 20 }}
								padding={{ left: 0, right: 0, top: 0, bottom: 4 }}
								size={layoutInfo}
							/>
							<DrawLine
								points={[...Array(6283).keys()].map((n, i) => ({
									x: (i - 3141) / 100,
									y: Math.tanh((i - 3141) / 100),
								}))}
								pos={{ x: 0, y: 20 }}
								padding={{ left: 0, right: 0, top: 0, bottom: 4 }}
								size={layoutInfo}
								x={{ min: -6.283, max: 6.283 }}
								y={{ min: -1, max: 1 }}
							/>
						</>
					)}
				</Canvas>
				<DrawTitleX
					height={20}
					values={props.titleX}
					pos={{ x: 0, y: 0 }}
				/>
			</View>
		</View>
	)
}

export default Graph

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
})
