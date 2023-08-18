import { Canvas, Circle } from '@shopify/react-native-skia'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useRealm } from '../data/realm'
import { firstJob as doFirstJob } from '../job/fetchWeather'
import { ScreenProps } from '../navigator/StackType'
import AppStyle from '../style/styles'
import useForecastStore from '../zustand/store'

const BeginScreen = (props: ScreenProps<'BeginScreen'>) => {
	const realm = useRealm()
	const [size, setSize] = useState({ width: 0, height: 0 })
	const [setLocaltion] = useForecastStore(s => [s.setCity])
	useEffect(() => {
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
