import { Button, ScrollView, StyleSheet } from 'react-native'
import { Day } from '@src/components'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { TabParamList } from '@src/navigator/TabType'
import { useContext } from 'react'
import { MainScreenAnimationEventsContext } from '@src/screen/MainScreen'
import { useQuery } from '../data/realm'
import { Forecast } from '../data/model'
import useForecastStore from '../zustand/store'
type Props = MaterialTopTabScreenProps<TabParamList, 'Tomorrow', 'Tomorrow'>
const TomorrowScreen = (_props: Props) => {
	const animationEvents = useContext(MainScreenAnimationEventsContext)
	const query = useQuery(Forecast)
	const currentId = useForecastStore(e => e.city?._id)
	return (
		<ScrollView
			{...animationEvents}
			style={styles.container}
			contentContainerStyle={{ gap: styles.container.gap }}
		>
			<Button
				title={'a'}
				onPress={() => {
					console.warn(
						query.filtered(
							'city_id = $0 and dt >= $1',
							currentId,
							Math.floor(Date.now() / 1000)
						).length
					)
				}}
			/>
			{Array.from(Array(10).keys()).map(i => (
				<Day
					styles={styles.item}
					key={i}
					feelLike={3}
					temp={3}
					icon={'10d'}
					time={new Date()}
					status={'brub?'}
				/>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		marginTop: 10,
		gap: 16,
	},
	item: {},
})

export default TomorrowScreen
