import Arrow from '@assets/svg/downArrow.svg'
import { Pressable, StyleSheet } from 'react-native'

export const DetailButton = () => (
	<Pressable style={styles.container}>
		<Arrow />
	</Pressable>
)

export default DetailButton

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: '#FFFBFF',
		width: 20,
		height: 20,
		borderRadius: 10,
		overflow: 'hidden',
	},
})
