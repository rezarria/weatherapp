import { Line, SkPoint } from '@shopify/react-native-skia'
import { ReactNode } from 'react'

type DrawGridProps = {
	nums?: number
	pos?: SkPoint
	size?: { width: number; height: number }
	padding?: { left: number; right: number; top: number; bottom: number }
}
export default function DrawGrid(props: DrawGridProps) {
	const size = props.size ?? { height: 0, width: 0 }
	const padding = props.padding ?? { bottom: 0, top: 0, left: 0, right: 0 }
	const pos = props.pos ?? { x: 0, y: 0 }
	const nums = props.nums ?? 3

	const step = (size.height - padding.top - padding.bottom - pos.y) / (nums - 1)
	const list: ReactNode[] = []
	for (let i = 0; i < nums; i++) {
		const x = pos.x + padding.left
		const y = pos.y + padding.top + i * step
		list.push(
			<Line
				key={i}
				color={'rgba(0, 0, 0, 0.13)'}
				strokeWidth={2}
				p1={{ x, y }}
				p2={{ x: size.width - padding.right, y }}
			/>
		)
	}
	return <>{list}</>
}
