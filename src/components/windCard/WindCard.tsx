import Logo from '@assets/svg/wind.svg'
import { TrendStatus, TrendStatusEnum, TrendStatusRef } from '@src/components'
import { Card } from '@src/components/card'
import React, { useEffect, useRef } from 'react'
import { Text } from 'react-native'

type Props = {
	value?: number
	guestValue?: number
	unit?: string
}

const WindCard = (props: Props) => {
	const subContextRef = useRef<TrendStatusRef>(null)
	useEffect(() => {
		const speed = ((props.guestValue ?? 0) * 60 * 60) / 1000
		subContextRef.current?.set(
			speed > 0
				? TrendStatusEnum.UP
				: speed < 0
				? TrendStatusEnum.DOWN
				: TrendStatusEnum.NIL,
			Math.abs(speed).toFixed(2) + ' km/h'
		)
	})
	const windSpeed = (((props.value ?? 0) * 60 * 60) / 1000)
		.toFixed(2)
		.toString()
	return (
		<Card
			title={'Wind speed'}
			icon={<Logo />}
			subContext={<TrendStatus ref={subContextRef} />}
		>
			<Text>
				{windSpeed}
				<Text>{props.unit}</Text>
			</Text>
		</Card>
	)
}

export default WindCard
