import {
	CornerPathEffect,
	LinearGradient,
	Path,
	Shadow,
	Skia,
	SkPoint,
} from '@shopify/react-native-skia'
import React from 'react'

type DrawLineProps = {
	points?: SkPoint[]
	pos: SkPoint
	size: { width: number; height: number }
	padding: { left: number; right: number; top: number; bottom: number }
	x?: {
		min: number
		max: number
	}
	y?: {
		min: number
		max: number
	}
}

const DrawLine = ({ points, pos, size, padding, x, y }: DrawLineProps) => {
	if (points == null || points.length === 0) {
		return <></>
	}
	const path = calc(pos, padding, size, x, y, points)
	const pathBG = path.copy()
	pathBG.lineTo(size.width - 1, size.height - 1)
	pathBG.lineTo(0, size.height - 1)
	const firstPoint = pathBG.getPoint(0)
	pathBG.lineTo(firstPoint.x, firstPoint.y)
	return (
		<>
			<Path
				path={pathBG}
				strokeWidth={1}
				opacity={0.2}
			>
				<LinearGradient
					colors={['#2B00A5', '#12004500']}
					start={{ x: size.width / 2, y: 0 }}
					end={{ x: size.width / 2, y: size.height }}
				/>
			</Path>
			<Path
				path={path}
				style={'stroke'}
				strokeWidth={2}
				color={'#000000'}
			>
				<CornerPathEffect r={6} />
				<Shadow
					color={'rgba(15, 0, 51, 0.10)'}
					blur={1}
					dx={0}
					dy={0}
				/>
				<Shadow
					color={'rgba(15, 0, 51, 0.10)'}
					blur={2}
					dx={0}
					dy={1}
				/>
				<Shadow
					color={'rgba(15, 0, 51, 0.09)'}
					blur={3}
					dx={0}
					dy={4}
				/>
				<Shadow
					color={'rgba(15, 0, 51, 0.0.5)'}
					blur={4}
					dx={0}
					dy={8}
				/>
				<Shadow
					color={'rgba(15, 0, 51, 0.01)'}
					blur={5}
					dx={0}
					dy={15}
				/>
				<Shadow
					color={'rgba(15, 0, 51, 0)'}
					blur={6}
					dx={0}
					dy={24}
				/>
			</Path>
		</>
	)
}
function calc(
	pos: SkPoint,
	padding: { left: number; right: number; top: number; bottom: number },
	size: { width: number; height: number },
	x?: { min: number; max: number },
	y?: { min: number; max: number },
	points?: SkPoint[]
) {
	const rangeX = { max: x?.max ?? 6, min: x?.min ?? 0 }
	const rangeY = { max: y?.max ?? 30, min: y?.min ?? 0 }
	const realX = pos.x + padding.left
	const realY = size.height - padding.bottom
	const stepX = (size.width - realX - padding.right) / (rangeX.max - rangeX.min)
	const stepY = (realY - padding.top - pos.y) / (rangeY.max - rangeY.min)
	const path = Skia.Path.Make()
	const realPotins: SkPoint[] =
		points
			?.filter(
				point =>
					point.x >= rangeX.min &&
					point.x <= rangeX.max &&
					point.y >= rangeY.min &&
					point.y <= rangeY.max
			)
			.map(point => ({
				x: realX + (point.x - rangeX.min) * stepX,
				y: realY - (point.y - rangeY.min) * stepY,
			})) ?? []
	if (realPotins.length !== 0) {
		path.moveTo(realPotins[0].x, realPotins[0].y)
	}
	realPotins.forEach(p => path.lineTo(p.x, p.y))
	return path
}

export default DrawLine
