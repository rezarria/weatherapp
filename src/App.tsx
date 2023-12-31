/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { RealmProvider } from './data/realm'
import StackNavigator from './navigator/StackNavigator'

function App() {
	return (
		<RealmProvider>
			<NavigationContainer>
				<GestureHandlerRootView style={styles.container}>
					<StackNavigator />
				</GestureHandlerRootView>
			</NavigationContainer>
		</RealmProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		backgroundColor: '#F6EDFF',
		flex: 1,
	},
})

export default App
