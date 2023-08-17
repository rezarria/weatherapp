import DownArrow from '@assets/svg/down.svg'
import UpArrow from '@assets/svg/up.svg'
import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useState,
} from 'react'
import { StyleSheet, Text, View } from 'react-native'

export enum TrendStatusEnum {
	UP,
	DOWN,
	NIL,
}
export type TrendStatusRef = {
	set: (up: TrendStatusEnum, value: string) => void
}

const TrendStatus = forwardRef<TrendStatusRef>((props, ref) => {
	const [text, setText] = useState('')
	const [upTrend, setUpTrend] = useState(TrendStatusEnum.NIL)
	const iconSelect = useCallback(() => {
		switch (upTrend) {
			case TrendStatusEnum.UP:
				return <UpArrow />
			case TrendStatusEnum.DOWN:
				return <DownArrow />
			case TrendStatusEnum.NIL:
				return <></>
		}
	}, [upTrend])
	useImperativeHandle(
		ref,
		() => ({
			set: (up, value) => {
				setUpTrend(up)
				setText(value)
			},
		}),
		[]
	)
	return (
		<View style={styles.container}>
			<View style={styles.align}>
				{iconSelect()}
				<Text style={styles.sub}>{text}</Text>
			</View>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	align: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	sub: {
		color: '#000',
		fontFamily: 'GoogleSans',
		fontSize: 11,
		fontStyle: 'normal',
		fontWeight: '500',
		lineHeight: 16,
		letterSpacing: 0.5,
	},
})

export function switchToStatus(diff: number): TrendStatusEnum {
	if (diff === 0) {
		return TrendStatusEnum.NIL
	}
	return diff > 0 ? TrendStatusEnum.UP : TrendStatusEnum.DOWN
}

export default TrendStatus
