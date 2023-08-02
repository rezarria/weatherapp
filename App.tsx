/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PageView } from '@src/utility/PageView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationArea } from '@src/components';

function App() {
	return (
		<NavigationContainer>
			<GestureHandlerRootView style={styles.container}>
				<View style={styles.background}>
					<NavigationArea />
					<PageView />
				</View>
			</GestureHandlerRootView>
		</NavigationContainer>
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
