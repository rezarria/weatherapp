import { Canvas } from '@shopify/react-native-skia';
import { useState } from 'react';
import { LayoutRectangle, StyleSheet, View } from 'react-native';
import DrawTitleY from './DayForecast.Graph.DrawTitleY';
import DrawGrid from './DayForecast.Graph.DrawGrid';
import { DrawLine } from './DayForecast.Graph.DrawLine';
import DrawTitleX from './DayForecast.Graph.DrawTitleX';

type GarphProp = {
	titleX?: string[];
	titleY?: string[];
	titleBeforeX?: string[];
	titleBeforeY?: string[];
};

export default function Graph(props: GarphProp) {
	const [layoutInfo, setLayoutInfo] = useState<LayoutRectangle>();
	return (
		<View style={styles.container}>
			{props.titleY && (
				<DrawTitleY
					values={props.titleY}
					valuesBefore={props.titleBeforeY}
					pos={{ x: 0, y: 20 }}
					padding={{ left: 0, right: 0, top: 0, bottom: 20 }}
				/>
			)}
			<View style={styles.group}>
				<Canvas
					onLayout={e => {
						const layout = e.nativeEvent.layout;
						if (
							layoutInfo == null ||
							layout.height !== layoutInfo.height ||
							layout.width !== layoutInfo.width
						) {
							setLayoutInfo(e.nativeEvent.layout);
						}
					}}
					style={styles.canvas}>
					{layoutInfo && (
						<>
							<DrawGrid
								nums={3}
								pos={{ x: 0, y: 20 }}
								padding={{ left: 0, right: 0, top: 0, bottom: 4 }}
								size={layoutInfo}
							/>
							<DrawLine
								points={[...Array(6283).keys()].map((n, i) => ({
									x: (i - 3141) / 100,
									y: Math.sin((i - 3141) / 100),
								}))}
								pos={{ x: 0, y: 20 }}
								padding={{ left: 0, right: 0, top: 0, bottom: 4 }}
								size={layoutInfo}
								x={{ min: -6.283, max: 6.283 }}
								y={{ min: -1, max: 1 }}
							/>
						</>
					)}
				</Canvas>
				<DrawTitleX height={20} values={props.titleX} pos={{ x: 0, y: 0 }} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flex: 1,
	},
	canvas: {
		flex: 1,
	},
	group: {
		flex: 1,
	},
});
