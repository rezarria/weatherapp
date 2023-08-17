import { SkPoint } from '@shopify/react-native-skia'
import { Padding } from '@src/style/layout'
import AppStyle from '@src/style/styles'
import React, { useState } from 'react'
import { LayoutRectangle, StyleSheet, Text as TextRN, View } from 'react-native'

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
			]}
		>
			<View style={styles.section}>
				{valuesBefore?.map((n, i) => (
					<TextRN
						style={[AppStyle.font, styles.yTitle]}
						key={i}
					>
						{n}
					</TextRN>
				))}
			</View>
			<View style={[styles.section, styles.main]}>
				{layout &&
					values.map((v, i) => (
						<TextRN
							style={[AppStyle.font, styles.yTitle]}
							key={i}
						>
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
		lineHeight: 16,
	},
})
