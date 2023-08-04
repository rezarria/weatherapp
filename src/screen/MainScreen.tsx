import { Animated, StyleSheet, View } from 'react-native'
import CustomTabs from '@src/navigator/CustomTabs'
import { NavigationArea } from '@src/components'
import { ScreenProps } from '../navigator/StackType'
import { createContext, useRef } from 'react'

export const MainScreenAnimationContext = createContext<Animated.Value>(
	new Animated.Value(0)
)

const MainScreen = ({}: ScreenProps<'MainScreen'>) => {
	const anime = useRef(new Animated.Value(1)).current
	return (
		<MainScreenAnimationContext.Provider value={anime}>
			<View style={styles.background}>
				<NavigationArea />
				<CustomTabs />
			</View>
		</MainScreenAnimationContext.Provider>
	)
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: '#F6EDFF',
		flex: 1,
	},
})

export default MainScreen
