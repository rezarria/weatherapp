import { TabBar } from '@src/components'
import { useCallback, useRef, useState } from 'react'
import { TabView } from 'react-native-tab-view'
import { renderScene, routesData } from './SetupCustomTabsNavigator'
import { RouteType } from './TabType'

const CustomTabsNavigator = () => {
	const index = useRef(0)
	const [_render, setRender] = useState(0)
	const setIndex = useCallback((v: number) => {
		index.current = v
		setRender(r => r + 1)
	}, [])
	const [routes] = useState<RouteType[]>(routesData)

	return (
		<>
			<TabBar
				index={index.current}
				setIndex={setIndex}
				routes={routes}
			/>
			<TabView
				renderScene={renderScene}
				navigationState={{ index: index.current, routes }}
				onIndexChange={setIndex}
				renderTabBar={() => null}
			/>
		</>
	)
}

export default CustomTabsNavigator
