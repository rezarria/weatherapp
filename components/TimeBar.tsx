import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TimeBar() {
	return (
		<View style={styles.container}>
			<Item title='Today' />
			<Item title='Tomorow' />
			<Item title='10 days' />
		</View>
	);
}

function Item(props: { title: string }) {
	return (
		<View style={styles.item}>
			<Text style={styles.item_text}>{props.title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		borderRadius: 14,
		flex: 1,
		paddingVertical: 9,
		backgroundColor: '#E0B6FF',
	},
	item_text: {
		textAlign: 'center',
		color: '#000',
		fontFamily: 'ProductSans',
		fontSize: 16,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 24,
		letterSpacing: 0.5,
	},
	container: {
		marginTop: 18,
		marginBottom: 8,
		gap: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 16,
	},
});
