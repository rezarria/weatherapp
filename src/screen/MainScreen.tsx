import { Floating } from '@component/etc'
import { NavigationArea } from '@component/index'
import DataWrapper from '@src/job/DataWarpper'
import CustomTabsNavigator from '@src/navigator/CustomTabs'
import { ScreenProps } from '@src/navigator/StackType'
import { createContext, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import ResultPanel, {
	Ref as ResultPanelRef,
} from '../components/navigation-area/SearchBar.Input.ResultPanel'

export const WidthMainScreenAnimatedContext = createContext<Animated.Value>(
	new Animated.Value(0)
)

export const ResultPanelRefContext = createContext<
	React.RefObject<ResultPanelRef> | undefined
>(undefined)

export const MainScreen = ({}: ScreenProps<'MainScreen'>) => {
	const width = useRef(new Animated.Value(0)).current
	const resultPanelRef = useRef<ResultPanelRef>(null)
	return (
		<WidthMainScreenAnimatedContext.Provider value={width}>
			<View style={styles.background}>
				<DataWrapper />
				<ResultPanel ref={resultPanelRef} />
				<Floating zIndex={1}>
					<ResultPanelRefContext.Provider value={resultPanelRef}>
						<NavigationArea />
					</ResultPanelRefContext.Provider>
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
