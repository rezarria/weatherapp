import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

const Floating = (props: { children: ReactNode; zIndex?: number }) => (
	<View
		style={[styles.container, props.zIndex ? { zIndex: props.zIndex } : {}]}
	>
		{props.children}
	</View>
)

const styles = StyleSheet.create({
	container: { position: 'absolute', width: '100%' },
})

export default Floating
