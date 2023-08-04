import MainScreen from '../screen/MainScreen'
import TestScreen from '../screen/TestScreen'
import { Stack } from './StackType'

const StackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName={'MainScreen'}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name={'MainScreen'}
				component={MainScreen}
			/>
			<Stack.Screen
				name={'TestScreen'}
				component={TestScreen}
			/>
		</Stack.Navigator>
	)
}

export default StackNavigator
