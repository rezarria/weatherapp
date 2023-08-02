import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import SearchLogo from '@assets/svg/search.svg';

export type Ref = {};
export type Props = {};

const SearchBar = forwardRef<Ref, Props>((props, ref) => {
	useImperativeHandle(ref, () => ({}), []);
	const [input, setInput] = useState('Kharkiv, Ukraine');
	return (
		<View style={styles.container}>
			<TextInput value={input} onChangeText={setInput} style={styles.input} />
			<SearchLogo style={styles.icon} />
		</View>
	);
});

const styles = StyleSheet.create({
	input: {
		color: '#fff',
		fontFamily: 'ProductSans',
		fontSize: 22,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 28,
	},
	icon: {
		width: 24,
		height: 24,
		flexShrink: 0,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

export default SearchBar;
