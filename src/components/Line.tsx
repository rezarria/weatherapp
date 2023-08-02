import {StyleSheet, View} from "react-native";

export const Line = (props: { value: number }) => (
    <View style={lineStyles.container}>
        <View style={lineStyles.background}/>
        <View style={[lineStyles.line, {width: `${props.value}%`}]}/>
    </View>
);

const lineStyles = StyleSheet.create({
	line: {
		position: 'absolute',
		backgroundColor: '#8A20D5',
		height: '100%',
		borderRadius: 24,
		zIndex: 2,
	},
	background: {
		backgroundColor: '#FAEDFF',
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	container: {
		flex: 1,
		height: 24,
		overflow: 'hidden',
		borderRadius: 24,
	},
});
