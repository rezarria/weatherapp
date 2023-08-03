import { SkPoint } from '@shopify/react-native-skia'
import { LayoutRectangle, StyleSheet, Text as TextRN, View } from 'react-native'
import { Padding } from '@src/style/layout'
import React, { useState } from 'react'

export type Props = {
	values?: string[]
	valuesBefore?: string[]
	pos: SkPoint
	padding?: Padding
}

const DrawTitleY = (props: Props) => {
	const padding: Padding = {
		top: props.padding?.top ?? 0,
		bottom: props.padding?.bottom ?? 0,
		left: props.padding?.left ?? 0,
		right: props.padding?.right ?? 0,
	}
	return (
		<>
			{props.values && (
				<DrawY
					padding={padding}
					pos={props.pos}
					values={props.values}
					valuesBefore={props.valuesBefore}
				/>
			)}
		</>
	)
}

export default DrawTitleY

type DrawProps = {
	values: string[]
	valuesBefore?: string[]
	pos: SkPoint
	padding: Padding
}

// function DrawYBySkia({ size, pos, values, padding }: DrawProps) {
// 	const step =
// 		(size.height - padding.top! - padding.bottom! - pos.y) /
// 		(values.length - 1);
// 	const fontSize = step * 0.35;
// 	const font = useFont(require('../assets/fonts/OpenSans.ttf'), fontSize);
// 	const x = pos.x + padding.left!;
// 	return (
// 		<>
// 			{values.map((n, i) => {
// 				const y = pos.y + padding.top! + i * step;
// 				return <Text key={i} text={n.toString()} font={font} x={x} y={y} />;
// 			})}
// 		</>
// 	);
// }

function DrawY({ pos, values, valuesBefore, padding }: DrawProps) {
	const [layout, setLayout] = useState<LayoutRectangle>()
	return (
		<View
			onLayout={l => {
				setLayout(l.nativeEvent.layout)
			}}
			style={[
				styles.container,
				{ paddingTop: padding.top! + pos.y, paddingBottom: padding.bottom! },
			]}>
			<View style={styles.section}>
				{valuesBefore?.map((n, i) => (
					<TextRN style={styles.yTitle} key={i}>
						{n}
					</TextRN>
				))}
			</View>
			<View style={[styles.section, styles.main]}>
				{layout &&
					values.map((v, i) => (
						<TextRN style={styles.yTitle} key={i}>
							{v}
						</TextRN>
					))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	section: {
		justifyContent: 'space-between',
	},
	main: {
		minWidth: 45,
	},
	yTitle: {
		padding: 0,
		color: '#000',
		fontFamily: 'ProductSans',
		fontSize: 16,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 16,
	},
})
