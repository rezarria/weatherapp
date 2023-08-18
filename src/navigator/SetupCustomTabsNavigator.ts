import TodayScreen from '@src/tab/Today'
import TomorrowScreen from '@src/tab/Tomorrow'
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import { KeyType, ParamList, RouteType, TabList } from './TabType'

export const DATA: ParamList = {
	Today: {
		component: TodayScreen as React.ComponentType<unknown>,
		title: 'Today',
	},
	Tomorrow: {
		component: TomorrowScreen as React.ComponentType<unknown>,
		title: '5 day',
	},
}
export const sceneData: { [key: string]: React.ComponentType<unknown> } = {}
export const routesData: RouteType[] = []

Object.keys(DATA).forEach(key => {
	if (key in TabList) {
		const realKey = key as KeyType
		sceneData[realKey] = DATA[realKey].component
		routesData.push({ key: realKey, title: DATA[realKey].title })
	}
})

export const renderScene = SceneMap(sceneData)
