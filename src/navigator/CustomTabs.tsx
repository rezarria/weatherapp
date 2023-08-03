import { SceneMap, TabView } from 'react-native-tab-view'
import TodayScreen from '../tab/Today'
import TomorrowScreen from '../tab/Tomorrow'
import { useState } from 'react'

export enum TabList {
	Today,
	Tomorrow,
}

type KeyType = Extract<keyof typeof TabList, string>
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

const DATA: ParamList = {
	Today: { component: TodayScreen, title: 'Today' },
	Tomorrow: { component: TomorrowScreen, title: 'Tomorrow' },
}
const sceneData: { [key: string]: React.ComponentType<unknown> } = {}
const routesData: RouteType[] = []

Object.keys(DATA).forEach(key => {
	if (key in TabList) {
		const realKey = key as KeyType
		sceneData[realKey] = DATA[realKey].component
		routesData.push({ key: realKey, title: DATA[realKey].title })
	}
})

const renderScene = SceneMap(sceneData)

const CustomTabs = () => {
	const [index, setIndex] = useState(0)
	const [routes] = useState<RouteType[]>(routesData)

	return (
		<TabView
			renderScene={renderScene}
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
		/>
	)
}

export default CustomTabs
