import { PropsWithChildren, useCallback, useContext, useRef } from 'react';
import { Button, GestureResponderEvent, ScrollView, View } from 'react-native';
import AppStyle from '@src/style/styles';
import { PageViewContext } from '@src/utility/PageView';
import {
	WindCard,
	HourlyForecast,
	DayForecast,
	ChanceOfRain,
} from '@src/components';

function Group({ children }: PropsWithChildren) {
	return <View style={AppStyle.group}>{children}</View>;
}

const TodayScreen = () => {
	const lastPos = useRef<{ x: number; y: number } | null>(null);
	const navigation = useContext(PageViewContext);
	const look = useRef(true);
	const onStart = useCallback((e: GestureResponderEvent) => {
		console.info('start');
		lastPos.current = {
			x: e.nativeEvent.locationX,
			y: e.nativeEvent.locationY,
		};
	}, []);
	const onCancel = useCallback((_: GestureResponderEvent) => {
		lastPos.current = null;
	}, []);
	const onMove = useCallback(
		({ nativeEvent: { locationX, locationY } }: GestureResponderEvent) => {
			if (look.current) {
				const dx = locationX - lastPos.current!.x;
				const dy = locationY - lastPos.current!.y;
			} else {
				console.log('.....');
			}
			lastPos.current!.x = locationX;
			lastPos.current!.y = locationY;
		},
		[]
	);

	return (
		<ScrollView
			onScroll={e => {
				look.current = e.nativeEvent.contentOffset.y === 0;
				console.info(`error: ${look.current}`);
			}}
			onTouchStart={onStart}
			onTouchMove={onMove}
			onTouchEnd={onCancel}
			onTouchCancel={onCancel}>
			<View style={AppStyle.scrollView}>
				<Button
					title={'123'}
					onPress={() => {
						navigation?.setIndex(1);
					}}
				/>
				<Group>
					<WindCard />
					<WindCard />
				</Group>
				<DayForecast />
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
};
export default TodayScreen;
