import { Button, StyleSheet, Text, View } from 'react-native'
import { ScreenProps } from '../navigator/StackType'

const TestScreen = (props: ScreenProps<'TestScreen'>) => {
	return (
		<View style={styles.container}>
			<Text>TEST</Text>
			<Button
				title={'BACK'}
				onPress={() => {}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'red',
	},
})

export default TestScreen
