import { StyleSheet, Text, View } from 'react-native'
import { Props } from './DrawTitleY'

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
					styles.text,
					height ? { lineHeight: height, fontSize: height * 0.77 } : {},
				]}
				key={i}>
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
		fontFamily: 'Product Sans',
		fontSize: 15,
		fontWeight: '400',
		lineHeight: 20,
		letterSpacing: 0.15,
	},
})
