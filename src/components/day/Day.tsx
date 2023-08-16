import {
	Image,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
} from 'react-native'

import { DetailButton } from './DetailButton'
import AppStyle from '@src/style/styles'

type Props = {
	time: number
	status: string
	temp: number
	feelLike: number
	icon: string
	styles: StyleProp<ViewStyle>
}

const Day = (props: Props) => (
	<View style={[props.styles, styles.container]}>
		<View style={[AppStyle.expand, styles.main]}>
			<Text style={[AppStyle.font, styles.text]}>
				{new Date(props.time * 1000).toLocaleDateString('en-US', {
					weekday: 'long',
				})}
			</Text>
			<Text style={[AppStyle.font, styles.text, styles.status_text]}>
				{props.status}
			</Text>
		</View>
		<View>
			<Text style={[AppStyle.font, styles.text, styles.temp]}>
				{(props.temp - 272.15).toFixed(0)}°
			</Text>
			<Text style={[AppStyle.font, styles.text, styles.temp]}>
				{(props.feelLike - 272.15).toFixed(0)}°
			</Text>
		</View>
		<View style={styles.vecrticalRow} />
		<Image
			style={styles.image}
			source={{
				uri: `https://openweathermap.org/img/wn/${props.icon}@2x.png`,
			}}
		/>
		<DetailButton />
	</View>
)

export default Day

const styles = StyleSheet.create({
	vecrticalRow: {
		width: 2,
		height: 51,
		backgroundColor: '#4B454D',
	},
	container: {
		borderRadius: 18,
		overflow: 'hidden',
		backgroundColor: '#EBDEFF',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 18,
		paddingVertical: 15,
		gap: 12,
	},
	main: {
		justifyContent: 'space-between',
	},
	image: {
		width: 54,
		height: 54,
	},
	text: {
		color: '#000',
		letterSpacing: 0.15,
		lineHeight: 24,
	},
	status_text: {
		color: '#494649',
	},
	temp: {
		color: '#2E004E',
		textAlign: 'right',
	},
})
