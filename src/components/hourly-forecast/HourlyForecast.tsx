import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppStyle from '@src/style/styles';
import HourLogo from '@assets/svg/hour.svg';
import DATA from './data';
import Item from './Item';

const HourlyForecast = () => (
	<View style={[AppStyle.card, styles.container]}>
		<View style={styles.header}>
			<HourLogo />
			<Text style={[AppStyle.font]}>Hourly forecast</Text>
		</View>
		<FlatList
			ItemSeparatorComponent={Separator}
			horizontal
			nestedScrollEnabled
			data={DATA}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item }) => <Item data={item} />}
		/>
	</View>
);

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

export default HourlyForecast;
