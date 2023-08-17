import {
	createMaterialTopTabNavigator,
	MaterialTopTabNavigationProp,
	MaterialTopTabScreenProps,
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

export enum TabList {
	Today,
	Tomorrow,
}

export type KeyType = Extract<keyof typeof TabList, string>
export type ParamList = {
	[key in KeyType]: {
		component: React.ComponentType<unknown>
		title: string
	}
}

export type RouteType = {
	key: KeyType
	title: string
}
