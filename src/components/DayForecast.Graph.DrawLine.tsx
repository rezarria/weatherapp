import { Path, SkPoint, Skia } from '@shopify/react-native-skia';
import React from 'react';

type DrawLineProps = {
	points: SkPoint[];
	pos: SkPoint;
	size: { width: number; height: number };
	padding: { left: number; right: number; top: number; bottom: number };
	x: {
		min: number;
		max: number;
	};
	y: {
		min: number;
		max: number;
	};
};

export const DrawLine = ({ points, pos, size, padding, x, y }: DrawLineProps) => {
	const realX = pos.x + padding.left;
	const realY = size.height - padding.bottom;
	const stepX = (size.width - realX - padding.right) / (x.max - x.min);
	const stepY = (realY - padding.top - pos.y) / (y.max - y.min);
	const path = Skia.Path.Make();
	const realPotins = points
		.filter(
			point =>
				point.x >= x.min &&
				point.x <= x.max &&
				point.y >= y.min &&
				point.y <= y.max
		)
		.map(point => ({
			x: realX + (point.x - x.min) * stepX,
			y: realY - (point.y - y.min) * stepY,
		}));
	if (realPotins.length !== 0) {
		path.moveTo(realPotins[0].x, realPotins[0].y);
	}
	realPotins.forEach(p => path.lineTo(p.x, p.y));
	return (
		<Path path={path} style={'stroke'} strokeWidth={2} color={'#000000'} />
	);
};
