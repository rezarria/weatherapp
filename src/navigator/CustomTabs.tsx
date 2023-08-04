import { SceneMap, TabView } from 'react-native-tab-view'
import TomorrowScreen from '../tab/Tomorrow'
import { useEffect, useState } from 'react'
import { TimeBar } from '../components'
import { KeyType, ParamList, RouteType, TabList } from './TabType'
import TodayScreen from '../tab/Today'

const DATA: ParamList = {
	Today: {
		component: TodayScreen as React.ComponentType<unknown>,
		title: 'Today',
	},
	Tomorrow: {
		component: TomorrowScreen as React.ComponentType<unknown>,
		title: 'Tomorrow',
	},
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
	useEffect(() => {}, [])
	return (
		<>
			<TimeBar
				index={index}
				setIndex={setIndex}
				routes={routes}
			/>
			<TabView
				renderScene={renderScene}
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderTabBar={() => null}
			/>
		</>
	)
}

export default CustomTabs
