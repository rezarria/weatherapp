import Logo from '@assets/svg/pressure.svg'
import { useEffect, useRef } from 'react'
import usePrevious from '../../hook/usePrevious'
import { Card } from '../card'
import { switchToStatus, TrendStatus, TrendStatusRef } from '../trendStatus'

export type Props = {
	value: number | undefined
	initValue?: number
}

const Pressure = (props: Props) => {
	const previous = usePrevious(props.value, props.initValue)
	const trendRef = useRef<TrendStatusRef>(null)
	useEffect(() => {
		if (props.value && previous) {
			const diff = props.value - previous
			trendRef.current?.set(
				switchToStatus(diff),
				`${Math.abs(diff).toFixed(0)} hpa`
			)
		}
	}, [previous, props.value])
	return (
		<Card
			title={'Pressure'}
			icon={<Logo />}
			subContext={<TrendStatus ref={trendRef} />}
		>
			{`${props.value?.toString()} hpa`}
		</Card>
	)
}

export default Pressure
