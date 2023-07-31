import { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import AppStyle from '../styles';
import WindCard from '../components/WindCard';
import Dayforecast from '../components/DayForecast';
import ChanceOfRain from '../components/ChanceOfRain';
import HourlyForecast from '../components/HourlyForecast';

function Group({ children }: PropsWithChildren) {
	return <View style={AppStyle.group}>{children}</View>;
}

export default function TodayScreen() {
	return (
		<ScrollView>
			<View style={AppStyle.scrollView}>
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
	);
}
