import TodayScreen from '../tab/Today'
import TomorrowScreen from '../tab/Tomorrow'
import { Tab } from './TabType'

const TabsNavigator = () => {
	return (
		<Tab.Navigator initialRouteName={'Today'}>
			<Tab.Screen
				name={'Today'}
				component={TodayScreen}
			/>
			<Tab.Screen
				name={'Tomorrow'}
				component={TomorrowScreen}
			/>
		</Tab.Navigator>
	)
}

export default TabsNavigator
