import AppStyle from '@src/style/styles'
import { StyleSheet, Text, View } from 'react-native'
import { CardProps, styles as CardStyle } from './Card'

const Card2 = (props: CardProps) => (
	<View
		style={[
			AppStyle.card,
			AppStyle.expand,
			CardStyle.container,
			styles.container,
		]}
	>
		<View style={[styles.header]}>
			<View style={[AppStyle.icon, CardStyle.icon]}>{props.icon}</View>
			<Text style={[AppStyle.font, CardStyle.title]}>{props.title}</Text>
		</View>
		<View style={[CardStyle.body, styles.body]}>{props.children}</View>
	</View>
)

export default Card2

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	header: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
	},
	body: {
		flex: 1,
		alignSelf: 'stretch',
		alignContent: 'stretch',
	},
})
