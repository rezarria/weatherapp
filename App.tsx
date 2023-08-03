/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationArea } from '@src/components';
import CustomTabs from './src/navigator/CustomTabs';

function App() {
	return (
		<NavigationContainer>
			<GestureHandlerRootView style={styles.container}>
				<View style={styles.background}>
					<NavigationArea />
					<CustomTabs />
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
