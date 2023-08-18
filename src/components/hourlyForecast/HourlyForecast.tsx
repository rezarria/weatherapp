import HourLogo from '@assets/svg/hour.svg'
import { Forecast } from '@src/data/model'
import AppStyle from '@src/style/styles'
import { useMemo } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Item, { Props as ItemProps } from './Item'

export type Props = {
	data?: Forecast[]
}

const HourlyForecast = (props: Props) => {
	const data = useMemo(() => props.data?.map(convert), [props.data])
	return (
		<View style={[AppStyle.card, styles.container]}>
			<View style={styles.header}>
				<HourLogo />
				<Text style={[AppStyle.font]}>Hourly forecast</Text>
			</View>
			{data != null && data.length !== 0 ? (
				<FlatList
					ItemSeparatorComponent={Separator}
					horizontal
					nestedScrollEnabled
					data={data}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => <Item data={item} />}
				/>
			) : (
				<Text>NO DATA</Text>
			)}
		</View>
	)
}

const convert = (item: Forecast): ItemProps['data'] => ({
	icon: item.weather[0]?.icon ?? '',
	time: new Date(item.dt * 1000),
	id: item._id.toHexString(),
	temp: item.main.temp,
})

const Separator = () => <View style={styles.gap} />

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
})

export default HourlyForecast
