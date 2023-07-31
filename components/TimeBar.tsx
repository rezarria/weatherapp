import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationState, SceneRendererProps } from 'react-native-tab-view';

export function CustomTabBar(
	props: SceneRendererProps & {
		navigationState: NavigationState<{
			key: string;
			title: string;
		}>;
	}
) {
	return (
		<View style={customTabBarStyles.container}>
			{props.navigationState.routes.map(i => (
				<Pressable
					style={customTabBarStyles.button}
					key={i.key}
					onPress={() => props.jumpTo(i.key)}>
					<View>
						<Text style={customTabBarStyles.text}>{i.title}</Text>
					</View>
				</Pressable>
			))}
		</View>
	);
}

const customTabBarStyles = StyleSheet.create({
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
