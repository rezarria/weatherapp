import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
	createNativeStackNavigator,
} from '@react-navigation/native-stack'

export type StackParamList = {
	MainScreen: undefined
	BeginScreen: undefined
}

export const Stack = createNativeStackNavigator<StackParamList>()

export type NavigationProps<T extends keyof StackParamList> =
	NativeStackNavigationProp<StackParamList, T>
export type ScreenProps<T extends keyof StackParamList> =
	NativeStackScreenProps<StackParamList, T>
