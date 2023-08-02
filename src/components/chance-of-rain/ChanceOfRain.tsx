import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import Logo from '@assets/svg/rain.svg';
import { Card2 } from '@src/components/card';
import Line from './Line';

export type ChanceOfRainItemType = {
	time: Date;
	value: number;
};

type ChanceOfRainProps = {
	data: ChanceOfRainItemType[];
};

const ChanceOfRain = (props: ChanceOfRainProps) => (
	<Card2 title={'Chance of rain'} icon={<Logo />}>
		<View style={styles.container}>
			<View style={styles.section}>
				{props.data.map((item, index) => (
					<ShowTime time={item.time} key={index} style={styles.item} />
				))}
			</View>
			<View style={[styles.section, styles.sectionLine]}>
				{props.data.map((item, index) => (
					<Line key={index} value={item.value} />
				))}
			</View>
			<View style={styles.section}>
				{props.data.map((item, index) => (
					<Text key={index} style={[styles.text, styles.item]}>
						{item.value}%
					</Text>
				))}
			</View>
		</View>
	</Card2>
);

export default ChanceOfRain;

const styles = StyleSheet.create({
	container: { flex: 1, flexDirection: 'row' },
	section: {
		gap: 11,
		justifyContent: 'space-between',
	},
	sectionLine: {
		flex: 1,
		marginLeft: 33,
		marginRight: 22,
	},
	item: {
		height: 24,
		textAlignVertical: 'center',
	},
	text: {
		color: '#000',
		fontVariant: ['lining-nums', 'proportional-nums'],
		fontFamily: 'OpenSans',
		fontSize: 15,
		lineHeight: 18.795,
		letterSpacing: 0.15,
		textAlign: 'right',
		fontWeight: '400',
	},
});

function ShowTime(props: { time: Date; style?: StyleProp<TextStyle> }) {
	return (
		<Text style={[styles.text, props.style]}>
			{(props.time.getHours() % 12) + 1}{' '}
			<Text>{props.time.getHours() < 12 ? 'AM' : 'PM'}</Text>
		</Text>
	);
}
