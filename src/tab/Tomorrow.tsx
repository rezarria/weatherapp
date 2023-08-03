import { ScrollView, StyleSheet } from 'react-native'
import { Day } from '@src/components'

const TomorrowScreen = () => (
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

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		marginTop: 10,
		gap: 16,
	},
	item: {},
})

export default TomorrowScreen
