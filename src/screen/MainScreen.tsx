import { Floating } from '@component/etc'
import { NavigationArea } from '@component/index'
import DataWrapper from '@src/job/DataWarpper'
import CustomTabsNavigator from '@src/navigator/CustomTabs'
import { ScreenProps } from '@src/navigator/StackType'
import { createContext, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

export const WidthMainScreenAnimatedContext = createContext<Animated.Value>(
	new Animated.Value(0)
)

export const MainScreen = ({}: ScreenProps<'MainScreen'>) => {
	const width = useRef(new Animated.Value(0)).current
	return (
		<WidthMainScreenAnimatedContext.Provider value={width}>
			<View style={styles.background}>
				<DataWrapper />
				<Floating>
					<NavigationArea />
				</Floating>
				<CustomTabsNavigator />
			</View>
		</WidthMainScreenAnimatedContext.Provider>
	)
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: '#F6EDFF',
		flex: 1,
	},
})

export default MainScreen
