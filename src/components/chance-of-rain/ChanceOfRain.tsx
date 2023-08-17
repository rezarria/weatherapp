import Logo from '@assets/svg/rain.svg'
import { Card2 } from '@src/components/card'
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Line from './Line'

export type ChanceOfRainItemType = {
	time: number
	value: number
}

type Props = {
	data: ChanceOfRainItemType[]
}

const gap = () => <View style={styles.gap} />
const ChanceOfRain = (props: Props) => {
	return (
		<Card2
			title={'Chance of rain'}
			icon={<Logo />}
		>
			<View style={styles.container}>
				<View style={styles.section}>
					<FlatList
						data={props.data}
						keyExtractor={i => i.time.toString()}
						scrollEnabled={false}
						renderItem={({ item }) => (
							<ShowTime
								time={item.time}
								style={styles.item}
							/>
						)}
						ItemSeparatorComponent={gap}
					/>
				</View>
				<View style={[styles.section, styles.sectionLine]}>
					<FlatList
						scrollEnabled={false}
						data={props.data}
						keyExtractor={i => i.time.toString()}
						renderItem={({ item }) => <Line value={item.value * 100} />}
						ItemSeparatorComponent={gap}
					/>
				</View>
				<View style={styles.section}>
					<FlatList
						scrollEnabled={false}
						data={props.data}
						keyExtractor={i => i.time.toString()}
						renderItem={({ item }) => (
							<Text style={[styles.text, styles.item]}>
								{(item.value * 100).toFixed(0)}%
							</Text>
						)}
						ItemSeparatorComponent={gap}
					/>
				</View>
			</View>
		</Card2>
	)
}

export default ChanceOfRain

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
	gap: { paddingTop: 11 },
})

function ShowTime(props: { time: number; style?: StyleProp<TextStyle> }) {
	const dateTime = new Date(props.time * 1000)
	const hour = dateTime.getHours()
	return (
		<Text style={[styles.text, props.style]}>
			{hour > 12 ? hour % 12 : hour}{' '}
			<Text>{dateTime.getHours() < 13 ? 'AM' : 'PM'}</Text>
		</Text>
	)
}
