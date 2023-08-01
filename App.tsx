/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import NavigationArea from './components/NavigationArea';
import { StyleSheet, View } from 'react-native';
import TodayScreen from './screens/Today';
import { SceneMap, TabView } from 'react-native-tab-view';
import { CustomTabBar } from './components/TimeBar';
import { TomorrowScreen } from './screens/Tomorrow';

function App() {
	return (
		<View style={styles.background}>
			<NavigationArea />
			<PageView />
		</View>
	);
}

const renderScence = SceneMap({
	today: TodayScreen,
	tomorrow: TomorrowScreen,
	tenDay: TodayScreen,
});

function PageView() {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'today', title: 'Today' },
		{ key: 'tomorrow', title: 'Tomorrow' },
		{ key: 'tenDay', title: '10 Days' },
	]);

	return (
		<TabView
			renderTabBar={d => <CustomTabBar {...d} />}
			renderScene={renderScence}
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
		/>
	);
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: '#F6EDFF',
		flex: 1,
	},
});

export default App;
