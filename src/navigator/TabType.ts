import {
	MaterialTopTabNavigationProp,
	MaterialTopTabScreenProps,
	createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs'

export type TabParamList = {
	Today: undefined
	Tomorrow: undefined
}

export const Tab = createMaterialTopTabNavigator<TabParamList>()

export type NavigationProps<T extends keyof TabParamList> =
	MaterialTopTabNavigationProp<TabParamList, T>
export type ScreenProps<T extends keyof TabParamList> =
	MaterialTopTabScreenProps<TabParamList, T>
