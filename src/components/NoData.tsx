import { StyleSheet, Text, View } from 'react-native'
import AppStyle from '../style/styles'

const NoData = () => (
	<View style={styles.container}>
		<View style={styles.background}>
			<Text style={[AppStyle.font, styles.text]}>NO DATA</Text>
		</View>
	</View>
)

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		padding: 8,
	},
	background: {
		flex: 1,
		backgroundColor: '#000e',
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#fff',
	},
})

export default NoData
