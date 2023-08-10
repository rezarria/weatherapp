import BeginScreen from '../screen/BeginScreen'
import MainScreen from '../screen/MainScreen'
import { Stack } from './StackType'

const StackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName={'BeginScreen'}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name={'MainScreen'}
				component={MainScreen}
			/>
			<Stack.Screen
				name={'BeginScreen'}
				component={BeginScreen}
			/>
		</Stack.Navigator>
	)
}

export default StackNavigator
