import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppStyle from '@src/style/styles'
export type CardProps = {
	icon?: ReactNode
	title: string
	children?: ReactNode
	subContext?: ReactNode
}

const Card = (props: CardProps) => (
	<View style={[AppStyle.card, styles.container]}>
		<View style={styles.icon}>{props.icon}</View>
		<View style={styles.body}>
			<Text style={styles.title}>{props.title}</Text>
			{props.children && (
				<>
					{typeof props.children === 'string' && (
						<Text style={styles.content}>{props.children}</Text>
					)}
					{typeof props.children !== 'string' && (
						<View style={{ flex: 1 }}>{props.children}</View>
					)}
				</>
			)}
		</View>
		<View style={styles.subContent}>{props.subContext}</View>
	</View>
)

export default Card

export const styles = StyleSheet.create({
	icon: {
		borderRadius: 14,
		width: 28,
		height: 28,
		backgroundColor: '#FFFBFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	body: {
		flex: 1,
		gap: 4,
		justifyContent: 'space-between',
	},
	title: {
		color: '#1E1B1B',
		fontFamily: 'ProductSans',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 24,
		letterSpacing: 0.15,
	},
	content: {
		color: '#1E1B1B',
		fontFamily: 'OpenSans',
		fontSize: 16,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 24,
		letterSpacing: 0.15,
	},
	container: {
		flex: 1,
		flexGrow: 1,
		alignItems: 'center',
		alignContent: 'stretch',
		gap: 8,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignSelf: 'stretch',
		flexWrap: 'wrap',
	},
	subContent: {
		position: 'absolute',
		bottom: 9,
		right: 8,
		alignSelf: 'stretch',
		justifyContent: 'flex-end',
	},
})
