import { ScrollView, StyleSheet } from 'react-native'
import { Day } from '@src/components'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { TabsParamList } from '../navigator/TabNavigator'
import { memo } from 'react'
type Props = MaterialTopTabScreenProps<TabsParamList, 'Tomorrow', 'Tomorrow'>
const TomorrowScreen = (props: Props) => {
	console.log('🚀 ~ file: Tomorrow.tsx:8 ~ TomorrowScreen ~ props:', props)
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ gap: styles.container.gap }}
		>
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

export default memo(TomorrowScreen)
