import { Text, View } from 'react-native'

const NoData = () => (
	<View
		style={{
			position: 'absolute',
			width: '100%',
			height: '100%',
			padding: 8,
		}}
	>
		<View
			style={{
				flex: 1,
				backgroundColor: '#000e',
				borderRadius: 4,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text style={{ color: '#fff' }}>NO DATA</Text>
		</View>
	</View>
)

export default NoData
