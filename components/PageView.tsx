import React, { createContext, useRef } from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import { CustomTabBar } from './TimeBar';
import TodayScreen from '../screens/Today';
import { TomorrowScreen } from '../screens/Tomorrow';
import { Animated } from 'react-native';

const renderScence = SceneMap({
	today: TodayScreen,
	tomorrow: TomorrowScreen,
	tenDay: TodayScreen,
});

export const AnimationContext = createContext({
	animation: new Animated.Value(0),
});

export function PageView() {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'today', title: 'Today' },
		{ key: 'tomorrow', title: 'Tomorrow' },
		{ key: 'tenDay', title: '10 Days' },
	]);
	const context = useRef({ animation: new Animated.Value(0) });
	return (
		<AnimationContext.Provider value={context.current}>
			<TabView
				renderTabBar={d => <CustomTabBar {...d} />}
				renderScene={renderScence}
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
			/>
		</AnimationContext.Provider>
	);
}
