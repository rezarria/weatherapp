import { Animated, StyleSheet, View } from 'react-native'
import CustomTabs from '@src/navigator/CustomTabs'
import { NavigationArea } from '@src/components'
import { ScreenProps } from '@src/navigator/StackType'
import { createContext, useRef } from 'react'
import createEvents from '@src/tab/animation'
import DataWrapper from '../job/DataWarpper'

export const MainScreenAnimationEventsContext = createContext<
	ReturnType<typeof createEvents>
>(createEvents(new Animated.Value(0)))

export const MainScreenAnimationContext = createContext<Animated.Value>(
	new Animated.Value(0)
)

const MainScreen = ({}: ScreenProps<'MainScreen'>) => {
	const anime = useRef(new Animated.Value(1)).current
	const animationEvents = useRef(createEvents(anime)).current
	return (
		<MainScreenAnimationContext.Provider value={anime}>
			<MainScreenAnimationEventsContext.Provider value={animationEvents}>
				<View style={styles.background}>
					<DataWrapper />
					<NavigationArea />
					<CustomTabs />
				</View>
			</MainScreenAnimationEventsContext.Provider>
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
