/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import NavigationArea from './components/NavigationArea';
import { StyleSheet, View } from 'react-native';
import { PageView } from './screens/PageView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.background}>
				<NavigationArea />
				<PageView />
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		backgroundColor: '#F6EDFF',
		flex: 1,
	},
});

export default App;
