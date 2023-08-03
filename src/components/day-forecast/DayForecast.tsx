import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppStyle from '@src/style/styles'
import Logo from '@assets/svg/clac.svg'
import { Graph } from './graph'

const DayForecast = () => {
	const days = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun']
	const temps = [1, 0, 1].reverse().map(t => `${t}°`)
	const subs = ['-', '', '']
	return (
		<View style={[AppStyle.card, styles.container]}>
			<View style={[styles.header]}>
				<Logo />
				<Text style={[AppStyle.font, styles.title]}>Day forecast</Text>
			</View>
			<Graph
				titleX={days}
				titleY={temps}
				titleBeforeY={subs}
			/>
		</View>
	)
}

export default DayForecast

const styles = StyleSheet.create({
	container: {
		minHeight: 150,
	},
	header: {
		flexDirection: 'row',
		gap: 8,
	},
	title: {
		lineHeight: 24,
		letterSpacing: 0.15,
	},
})
