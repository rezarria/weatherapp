import { StyleSheet } from 'react-native'

const AppStyle = StyleSheet.create({
	scrollView: {
		padding: 16,
		paddingTop: 8,
		gap: 8,
	},
	card: {
		paddingVertical: 9,
		paddingHorizontal: 11,
		borderRadius: 16,
		backgroundColor: 'rgba(208, 188, 255, 0.30)',
	},
	font: {
		color: '#000',
		fontFamily: 'ProductSans',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 24,
		letterSpacing: 0.15,
	},
	group: {
		flexDirection: 'row',
		gap: 16,
	},
})

export default AppStyle
