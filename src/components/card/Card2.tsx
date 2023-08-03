import { StyleSheet, Text, View } from 'react-native'
import { styles as CardStyle, CardProps } from './Card'
import AppStyle from '@src/style/styles'

const Card2 = (props: CardProps) => (
	<View style={[AppStyle.card, CardStyle.container, styles.container]}>
		<View style={[styles.header]}>
			<View style={[CardStyle.icon]}>{props.icon}</View>
			<Text style={[CardStyle.title]}>{props.title}</Text>
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
