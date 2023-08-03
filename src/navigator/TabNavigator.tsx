import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TodayScreen from '../tab/Today'
import TomorrowScreen from '../tab/Tomorrow'

export type TabsParamList = {
	Today: undefined
	Tomorrow: undefined
}

const Tabs = createMaterialTopTabNavigator<TabsParamList>()

const TabsNavigator = () => {
	return (
		<Tabs.Navigator initialRouteName={'Today'}>
			<Tabs.Screen
				name={'Today'}
				component={TodayScreen}
			/>
			<Tabs.Screen
				name={'Tomorrow'}
				component={TomorrowScreen}
			/>
		</Tabs.Navigator>
	)
}

export default TabsNavigator
