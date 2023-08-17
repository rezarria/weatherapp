import { TabBar } from '@src/components'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { TabView } from 'react-native-tab-view'
import { renderScene, routesData } from './SetupCustomTabsNavigator'
import { RouteType } from './TabType'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import { Animated } from 'react-native'

const CustomTabsNavigator = () => {
	const index = useRef(0)
	const [_render, setRender] = useState(0)
	const currentValue = useRef(0)
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const setIndex = useCallback((v: number) => {
		index.current = v
		setRender(r => r + 1)
	}, [])
	const [routes] = useState<RouteType[]>(routesData)
	useEffect(() => {
		const id = widthAnimated.addListener(event => {
			console.debug('update current animated value!')
			currentValue.current = event.value
		})
		return () => {
			widthAnimated.removeListener(id)
		}
	}, [widthAnimated])
	const animation = useRef<Animated.CompositeAnimation>()
	const oldValue = useRef(0)
	const onChange = useCallback(
		(newIndex: number) => {
			console.log('change')
			widthAnimated.stopAnimation(v => {
				const toValue = oldValue.current
				oldValue.current = v
				animation.current = Animated.timing(widthAnimated, {
					toValue,
					useNativeDriver: false,
					duration: 300,
				})
			})
			setIndex(newIndex)
		},
		[setIndex, widthAnimated]
	)
	return (
		<>
			<TabBar
				index={index.current}
				setIndex={onChange}
				routes={routes}
			/>
			<TabView
				onSwipeStart={() => {
					console.log('start')
				}}
				onSwipeEnd={() => {
					animation.current?.start(() => {
						animation.current = undefined
					})
				}}
				renderScene={renderScene}
				navigationState={{ index: index.current, routes }}
				onIndexChange={onChange}
				renderTabBar={() => null}
			/>
		</>
	)
}

export default CustomTabsNavigator
