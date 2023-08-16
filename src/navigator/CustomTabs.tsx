import { SceneMap, TabView } from 'react-native-tab-view'
import {
	Context,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from 'react'
import { TimeBar } from '@src/components'
import { KeyType, ParamList, RouteType, TabList } from './TabType'
import TodayScreen from '@src/tab/Today'
import { Status } from '@src/tab/animation'
import { MainScreenAnimationEventsContext } from '@src/screen/MainScreen'
import TomorrowScreen from '@src/tab/Tomorrow'

const DATA: ParamList = {
	Today: {
		component: TodayScreen as React.ComponentType<unknown>,
		title: 'Today',
	},
	Tomorrow: {
		component: TomorrowScreen as React.ComponentType<unknown>,
		title: '5 day',
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
const animationObserver: {
	status: Status[]
} = { status: [] }

animationObserver.status.push(
	...Array<Status>(Object.keys(sceneData).length).fill(Status.SHOW)
)

const CustomTabs = () => {
	const animationEvents = useContext(MainScreenAnimationEventsContext)
	const index = useRef(0)
	const [_render, setRender] = useState(0)
	const setIndex = useCallback((v: number) => {
		index.current = v
		setRender(r => r + 1)
	}, [])
	const [routes] = useState<RouteType[]>(routesData)
	const whenChange = useMemo(
		() => onChange(setIndex, animationEvents),
		[animationEvents, setIndex]
	)
	return (
		<>
			<TimeBar
				index={index.current}
				setIndex={setIndex}
				routes={routes}
			/>
			<TabView
				renderScene={renderScene}
				navigationState={{ index: index.current, routes }}
				onIndexChange={whenChange}
				renderTabBar={() => null}
			/>
		</>
	)
}

const onChange =
	(
		setIndex: (n: number) => void,
		animationEvents: typeof MainScreenAnimationEventsContext extends Context<
			infer U
		>
			? U
			: never
	) =>
	(newIndex: number) => {
		// nạp trạng thái của tab tiếp theo
		animationEvents.lastPos.action.status = animationObserver.status[newIndex]

		// thay đổi trạng thái của tab hiện tại thành dạng -ing
		switch (animationEvents.lastPos.action.status) {
			case Status.HIDDEN:
				animationEvents.lastPos.action.hidden.start()
				break
			case Status.HIDDING:
				animationEvents.lastPos.action.hidden.start(finished => {
					if (finished) {
						animationEvents.lastPos.action.status = Status.HIDDEN
					}
				})
				break
			case Status.SHOW:
				animationEvents.lastPos.action.show.start()
				break
			case Status.SHOWING:
				animationEvents.lastPos.action.show.start(finished => {
					if (finished) {
						animationEvents.lastPos.action.status = Status.SHOW
					}
				})
				break
		}
		setIndex(newIndex)
	}

export default CustomTabs
