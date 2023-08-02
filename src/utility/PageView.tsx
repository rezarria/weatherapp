import React, { ComponentType, createContext, useMemo, useRef } from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import CustomTabBar from '../components/time-bar/TimeBar';
import { TomorrowScreen } from '../tab/Tomorrow';
import { Animated } from 'react-native';
import TestScreen from '../tab/Test';
import TodayScreen from '../tab/Today';

export type MapperType = {
	[key: string]: {
		title: string;
		view: typeof TodayScreen;
	};
};

const data: MapperType = {
	today: {
		title: 'Today',
		view: TodayScreen,
	},
	tomorrow: {
		title: ' Tomorrow',
		view: TomorrowScreen,
	},
	tenDays: {
		title: 'Ten Days',
		view: TestScreen,
	},
};

const a: { [x: string]: ComponentType<unknown> } = {};
const mapper2 = Object.keys(data).reduce((o, k) => {
	o[k] = data[k].view;
	return o;
}, a);

const renderScene = SceneMap(mapper2);

export const AnimationContext = createContext({
	animation: new Animated.Value(0),
});

export const PageViewContext = createContext<{
	index: number;
	setIndex: (n: number) => void;
} | null>(null);

export const PageView = () => {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'today', title: 'Today' },
		{ key: 'tomorrow', title: 'Tomorrow' },
		{ key: 'tenDays', title: '10 Days' },
	]);
	const animationContext = useRef({ animation: new Animated.Value(0) });
	const valueContext = useMemo(
		() => ({ index, setIndex: setIndex }),
		[index, setIndex]
	);
	return (
		<PageViewContext.Provider value={valueContext}>
			<AnimationContext.Provider value={animationContext.current}>
				<TabView
					renderTabBar={d => <CustomTabBar {...d} />}
					renderScene={renderScene}
					navigationState={{ index, routes }}
					onIndexChange={setIndex}
				/>
			</AnimationContext.Provider>
		</PageViewContext.Provider>
	);
};
