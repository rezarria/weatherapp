/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { PropsWithChildren } from 'react';

import NavigationArea from './components/NavigationArea';
import { ScrollView, StyleSheet, View } from 'react-native';
import WindCard from './components/WindCard';
import TimeBar from './components/TimeBar';
import HourlyForecast from './components/HourlyForecast';
import Dayforecast from './components/DayForecast';
import ChanceOfRain from './components/ChanceOfRain';
import { NavigationContainer } from '@react-navigation/native';

function App() {
	return (
		<NavigationContainer>
			<View style={styles.background}>
				<NavigationArea />
				<TimeBar />
				<ScrollView>
					<View style={styles.scrollView}>
						<Group>
							<WindCard />
							<WindCard />
						</Group>
						<Dayforecast />
						<ChanceOfRain
							data={[
								{ time: new Date(), value: 14 },
								{ time: new Date(), value: 14 },
								{ time: new Date(), value: 14 },
								{ time: new Date(), value: 14 },
								{ time: new Date(), value: 14 },
								{ time: new Date(), value: 14 },
								{ time: new Date(), value: 14 },
							]}
						/>
						<Group>
							<WindCard />
							<WindCard />
						</Group>
						<Group>
							<WindCard />
							<WindCard />
						</Group>
						<HourlyForecast />
						<Group>
							<WindCard />
							<WindCard />
						</Group>
						<Group>
							<WindCard />
							<WindCard />
						</Group>
						<Group>
							<WindCard />
							<WindCard />
						</Group>
						<Group>
							<WindCard />
							<WindCard />
						</Group>
						<Group>
							<WindCard />
							<WindCard />
						</Group>
					</View>
				</ScrollView>
			</View>
		</NavigationContainer>
	);
}

export default App;

function Group({ children }: PropsWithChildren) {
	return <View style={styles.group}>{children}</View>;
}

const styles = StyleSheet.create({
	scrollView: {
		padding: 16,
		paddingTop: 8,
		gap: 8,
	},
	background: {
		backgroundColor: '#F6EDFF',
		flex: 1,
	},
	group: {
		flexDirection: 'row',
		gap: 16,
	},
});
