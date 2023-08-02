import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import AppStyle from '../styles';
import HourLogo from '../assets/svg/hour.svg';
type WeatherInfo = {
	id: number;
	idType: number;
	temp: number;
	time: Date;
	status: string;
	iconId: string;
};

const DATA: WeatherInfo[] = [
	{
		id: 1,
		idType: 500,
		temp: 14,
		time: new Date(),
		status: 'Rain',
		iconId: '10d',
	},
	{
		id: 2,
		idType: 500,
		temp: 14,
		time: new Date(),
		status: 'Rain',
		iconId: '10d',
	},
	{
		id: 3,
		idType: 500,
		temp: 14,
		time: new Date(),
		status: 'Rain',
		iconId: '10d',
	},
	{
		id: 4,
		idType: 500,
		temp: 14,
		time: new Date(),
		status: 'Rain',
		iconId: '10d',
	},
	{
		id: 5,
		idType: 500,
		temp: 14,
		time: new Date(),
		status: 'Rain',
		iconId: '10d',
	},
	{
		id: 6,
		idType: 500,
		temp: 14,
		time: new Date(),
		status: 'Rain',
		iconId: '10d',
	},
	{
		id: 7,
		idType: 500,
		temp: 14,
		time: new Date(),
		status: 'Rain',
		iconId: '10d',
	},
	{
		id: 8,
		idType: 500,
		temp: 14,
		time: new Date(),
		status: 'Rain',
		iconId: '10d',
	},
	{
		id: 9,
		idType: 500,
		temp: 14,
		time: new Date(),
		status: 'Rain',
		iconId: '10d',
	},
	{
		id: 10,
		idType: 500,
		temp: 14,
		time: new Date(),
		status: 'Rain',
		iconId: '10d',
	},
];

type ItemProps = {
	data: WeatherInfo;
};

const Item = (props: ItemProps) => (
	<View style={itemStyle.container}>
		<Text style={[AppStyle.font, itemStyle.time]}>
			{props.data.time.getHours()}
			<Text style={[AppStyle.font, itemStyle.meridiem]}>
				{props.data.time.getHours() < 12 ? 'AM' : 'PM'}
			</Text>
		</Text>
		<Image
			source={{
				uri: `https://openweathermap.org/img/wn/${props.data.iconId}@2x.png`,
			}}
			style={itemStyle.icon}
		/>
		<Text style={[AppStyle.font, itemStyle.temp]}>{props.data.temp}°</Text>
	</View>
);

const itemStyle = StyleSheet.create({
	time: {
		textAlign: 'center',
		fontVariant: ['lining-nums', 'proportional-nums'],
		fontFamily: 'OpenSans',
		fontSize: 13.157,
		fontWeight: '400',
		lineHeight: 18.795,
		letterSpacing: 0.132,
	},
	meridiem: {
		fontSize: 9.398,
	},
	icon: {
		width: 30,
		height: 50,
	},
	temp: {
		textAlign: 'center',
		fontFamily: 'OpenSans',
		fontSize: 18.795,
		fontVariant: ['lining-nums', 'proportional-nums'],
	},
	container: {
		alignItems: 'center',
		alignContent: 'center',
	},
});

export default () => (
	<View style={[AppStyle.card, styles.container]}>
		<View style={styles.header}>
			<HourLogo/>
			<Text style={[AppStyle.font]}>Hourly forecast</Text>
		</View>
		<FlatList
			ItemSeparatorComponent={Separator}
			horizontal
			nestedScrollEnabled
			data={DATA}
			keyExtractor={item => item.id.toString()}
			renderItem={({item}) => <Item data={item}/>}
		/>
	</View>
)

const Separator = () => <View style={styles.gap} />;

const styles = StyleSheet.create({
	container: {},
	gap: {
		paddingLeft: 33,
	},
	header: {
		flexDirection: 'row',
		gap: 8,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
});
