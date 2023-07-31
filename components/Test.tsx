import { Canvas, Circle, Group } from '@shopify/react-native-skia';
import { Text, View } from 'react-native';

export const HelloWorld = () => {
	const size = 256;
	const r = size * 0.33;
	return (
		<View style={{ flex: 1 }}>
			<View style={{ backgroundColor: 'red' }}>
				<Text>a</Text>
			</View>
			<Canvas style={{ flex: 1, height: size }}>
				<Group blendMode='multiply'>
					<Circle cx={r} cy={r} r={r} color='cyan' />
					<Circle cx={size - r} cy={r} r={r} color='magenta' />
					<Circle cx={size / 2} cy={size - r} r={r} color='yellow' />
				</Group>
			</Canvas>
		</View>
	);
};
