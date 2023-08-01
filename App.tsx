/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import NavigationArea from './components/NavigationArea';
import { StyleSheet, View } from 'react-native';
import { PageView } from './components/PageView';

function App() {
	return (
		<View style={styles.background}>
			<NavigationArea />
			<PageView />
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: '#F6EDFF',
		flex: 1,
	},
});

export default App;
