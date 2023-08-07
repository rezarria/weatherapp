import React, { useEffect, useRef } from 'react'
import Logo from '@assets/svg/wind.svg'
import { TrendStatus, TrendStatusEnum, TrendStatusRef } from '@src/components'
import { Card } from '@src/components/card'
import { Text } from 'react-native'

type Props = {
	value?: string
	unit?: string
}

const WindCard = (props: Props) => {
	const subContextRef = useRef<TrendStatusRef>(null)
	useEffect(() => {
		subContextRef.current?.set(TrendStatusEnum.UP, '100 m/s')
	})
	return (
		<Card
			title={'Wind speed'}
			icon={<Logo />}
			subContext={<TrendStatus ref={subContextRef} />}
		>
			<Text>
				{props.value}
				<Text>{props.unit}</Text>
			</Text>
		</Card>
	)
}

export default WindCard
