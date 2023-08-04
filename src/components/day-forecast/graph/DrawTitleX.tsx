import { StyleSheet, Text, View } from 'react-native'
import { Props } from './DrawTitleY'
import AppStyle from '../../../style/styles'

const DrawTitleX = ({
	values,
	height,
}: Props & {
	height?: number
}) => (
	<View style={[styles.container]}>
		{values?.map((n, i) => (
			<Text
				style={[
					AppStyle.font,
					styles.text,
					height ? { lineHeight: height, fontSize: height * 0.77 } : {},
				]}
				key={i}
			>
				{n}
			</Text>
		))}
	</View>
)

export default DrawTitleX

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	text: {
		color: '#000',
		fontSize: 15,
		lineHeight: 20,
		letterSpacing: 0.15,
	},
})
