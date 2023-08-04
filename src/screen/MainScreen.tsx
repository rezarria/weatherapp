import { StyleSheet, View } from 'react-native'
import CustomTabs from '@src/navigator/CustomTabs'
import { NavigationArea } from '@src/components'
import { ScreenProps } from '../navigator/StackType'

const MainScreen = (_props: ScreenProps<'MainScreen'>) => {
	return (
		<View style={styles.background}>
			<NavigationArea />
			<CustomTabs />
		</View>
	)
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: '#F6EDFF',
		flex: 1,
	},
})

export default MainScreen
