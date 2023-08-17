import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { Day } from '@src/components'
import { styles as NavigationAreaStyle } from '@src/components/navigation-area/NavigationArea'
import { City, Forecast } from '@src/data/model'
import { useQuery } from '@src/data/realm'
import { TabParamList } from '@src/navigator/TabType'
import { divineToGroup, getMainForecastInDay } from '@src/utility/mainForecast'
import useForecastStore from '@src/zustand/store'
import { useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

type Props = MaterialTopTabScreenProps<TabParamList, 'Tomorrow', 'Tomorrow'>
const TomorrowScreen = (_props: Props) => {
	const currentCity = useForecastStore(e => e.city)
	const query = useQuery(Forecast)
	const [begin, end] = getTimeRange(currentCity, 4)
	const data = useMemo(() => {
		if (currentCity == null) {
			return undefined
		} else {
			return divineToGroup(
				Array.from(
					query.filtered(
						'dt BETWEEN {$0, $1} AND city_id = $2',
						begin,
						end,
						currentCity?._id
					)
				),
				currentCity
			)
				.map(getMainForecastInDay)
				.filter(i => i !== null) as NonNullable<
				ReturnType<typeof getMainForecastInDay>
			>[]
		}
	}, [begin, currentCity, end, query])

	return (
		<ScrollView style={styles.container}>
			<View
				style={{
					paddingTop: NavigationAreaStyle.padding.height,
				}}
			/>
			{data && (
				<FlatList
					scrollEnabled={false}
					data={data}
					keyExtractor={i => i.dt.toString()}
					ItemSeparatorComponent={Gap}
					renderItem={({ item }) => (
						<Day
							styles={styles.item}
							temp={item.temp.max}
							feelLike={item.temp.min}
							icon={item.icon ?? ''}
							time={item.dt}
							status={item.description ?? ''}
						/>
					)}
				/>
			)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		marginTop: 10,
	},
	item: {},
	gap: { paddingTop: 16 },
})

const Gap = () => <View style={styles.gap} />

function getTimeRange(currentCity: City | undefined, day: number) {
	const fixTimestamp = currentCity?.timezone ?? 0
	const time = new Date()
	time.setUTCHours(0, 0, 0, 0)
	const beginTimestamp = Math.floor(time.getTime() / 1000) - fixTimestamp
	time.setUTCHours(23, 59, 59, 999)
	time.setTime(time.getTime() + day * 24 * 60 * 60 * 1000)
	const endTimestamp = Math.floor(time.getTime() / 1000) - fixTimestamp
	return [beginTimestamp, endTimestamp]
}

export default TomorrowScreen
