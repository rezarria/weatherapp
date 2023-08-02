import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationState, SceneRendererProps } from 'react-native-tab-view';

const TimeBar = (
	props: SceneRendererProps & {
		navigationState: NavigationState<{
			key: string;
			title: string;
		}>;
	}
) => {
	const isForced = (index: number) => {
		return {
			backgroundColor: props.navigationState.index === index ? 'white' : 'red',
		};
	};
	return (
		<Animated.View style={[styles.container]}>
			{props.navigationState.routes.map((item, index) => (
				<Pressable
					style={styles.button}
					key={item.key}
					onPress={() => props.jumpTo(item.key)}>
					<View style={[isForced(index)]}>
						<Text style={styles.text}>{item.title}</Text>
					</View>
				</Pressable>
			))}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 18,
		marginBottom: 8,
		flexDirection: 'row',
		marginHorizontal: 16,
		justifyContent: 'space-between',
		alignItems: 'stretch',
		position: 'relative',
		gap: 16,
	},
	button: {
		flex: 1,
		borderRadius: 14,
		backgroundColor: '#E0B6FF',
		paddingVertical: 9,
	},
	text: {
		textAlign: 'center',
	},
});

export default TimeBar;
