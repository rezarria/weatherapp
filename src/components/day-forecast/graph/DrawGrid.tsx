import { Line, SkPoint } from '@shopify/react-native-skia'
import { ReactNode } from 'react'

type DrawGridProps = {
	nums: number
	pos: SkPoint
	size: { width: number; height: number }
	padding: { left: number; right: number; top: number; bottom: number }
}
export default function DrawGrid({ nums, pos, size, padding }: DrawGridProps) {
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
