import Rain from '@assets/svg/rain.svg'
import usePrevious from '@src/hook/usePrevious'
import AppStyle from '@src/style/styles'
import { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from '../card'
import { switchToStatus, TrendStatus, TrendStatusRef } from '../trendStatus'

export type Props = {
	value: number
	initValue?: number
}

const RainChance = (
	props: Omit<Props, 'value'> & { value?: Props['value'] }
) => {
	if (props.value == null) {
		return (
			<View style={[AppStyle.card, AppStyle.expand, styles.wrapper]}>
				<View style={styles.overlay}>
					<Card
						title={'Rain chance'}
						icon={<Rain />}
					/>
				</View>
				<View style={[AppStyle.card, AppStyle.expand, styles.banner]}>
					<Text style={styles.text}>NO DATA</Text>
				</View>
			</View>
		)
	} else {
		return RainChanceNonNULL({ value: props.value, initValue: props.initValue })
	}
}

const styles = StyleSheet.create({
	wrapper: {
		borderStyle: 'dashed',
		borderWidth: 2,
		paddingVertical: AppStyle.card.paddingVertical - 2,
		paddingHorizontal: AppStyle.card.paddingHorizontal - 2,
	},
	overlay: {
		opacity: 0.5,
		position: 'absolute',
		zIndex: 1,
		width: '100%',
		height: '100%',
		marginTop: AppStyle.card.paddingVertical - 2,
		marginLeft: AppStyle.card.paddingHorizontal - 2,
	},
	banner: { zIndex: 2 },
	text: { textAlign: 'center', fontSize: 22, color: 'black' },
})

const RainChanceNonNULL = (props: Props) => {
	const previous = usePrevious(props.value, props.initValue)
	const trendStatusRef = useRef<TrendStatusRef>(null)
	useEffect(() => {
		const diff = props.value - (previous ?? props.value)

		trendStatusRef.current?.set(
			switchToStatus(diff),
			`${Math.abs(diff).toFixed(2)}%`
		)
	})
	return (
		<Card
			title={'Rain chance'}
			icon={<Rain />}
			subContext={<TrendStatus ref={trendStatusRef} />}
		>
			{`${(props.value * 100).toFixed(0)}%`}
		</Card>
	)
}

export default RainChance
