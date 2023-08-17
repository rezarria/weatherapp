import AppStyle from '@src/style/styles'
import { Image, StyleSheet, Text, View } from 'react-native'
import { WeatherInfoType } from './WeatherInfoType'

export type Props = {
	data: WeatherInfoType
}

const Item = (props: Props) => (
	<View style={itemStyle.container}>
		<Text style={[AppStyle.font, itemStyle.time]}>
			{props.data.time.getHours()}
			<Text style={[AppStyle.font, itemStyle.meridiem]}>
				{props.data.time.getHours() < 12 ? 'AM' : 'PM'}
			</Text>
		</Text>
		<Image
			source={{
				uri: `https://openweathermap.org/img/wn/${props.data.icon}@2x.png`,
			}}
			style={itemStyle.icon}
		/>
		<Text style={[AppStyle.font, itemStyle.temp]}>
			{(props.data.temp - 272.15).toFixed(1)}°
		</Text>
	</View>
)

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
})

export default Item
