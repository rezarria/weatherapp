import { View } from 'react-native'
import { ScreenProps } from '../navigator/StackType'
import { Canvas, Circle } from '@shopify/react-native-skia'
import AppStyle from '../style/styles'
import { useEffect, useState } from 'react'
import { useQuery, useRealm } from '../data/realm'
import { firstJob as doFirstJob } from '../job/fetchWeather'
import useForecastStore from '../zustand/store'
import { CityModel } from '../model/city'
import { ForecastModel } from '../model/forecast'

const BeginScreen = (props: ScreenProps<'BeginScreen'>) => {
	const realm = useRealm()
	const cityQuery = useQuery(CityModel)
	const forecastQuery = useQuery(ForecastModel)
	const [size, setSize] = useState({ width: 0, height: 0 })
	const [setLocaltion] = useForecastStore(s => [s.setLocaltion])
	useEffect(() => {
		console.log(props.navigation)
		doFirstJob(realm, setLocaltion, () => {
			props.navigation.navigate('MainScreen')
		})
	}, [props.navigation, realm, setLocaltion])
	return (
		<View
			style={[AppStyle.expand]}
			onLayout={e => {
				setSize({
					width: e.nativeEvent.layout.width,
					height: e.nativeEvent.layout.height,
				})
			}}
		>
			{size.width !== 0 && size.height !== 0 && (
				<Canvas style={[AppStyle.expand]}>
					<Circle
						cx={size.width / 2}
						cy={size.height / 2}
						r={100}
					/>
				</Canvas>
			)}
		</View>
	)
}

export default BeginScreen