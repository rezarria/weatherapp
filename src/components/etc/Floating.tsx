import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

const Floating = (props: { children: ReactNode }) => (
	<View style={[styles.container]}>{props.children}</View>
)

const styles = StyleSheet.create({
	container: { position: 'absolute', width: '100%' },
})

export default Floating
