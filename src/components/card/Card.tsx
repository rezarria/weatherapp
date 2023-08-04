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
	<View style={[AppStyle.card, AppStyle.expand, styles.container]}>
		<View style={[AppStyle.icon, styles.icon]}>{props.icon}</View>
		<View style={[AppStyle.expand, styles.body]}>
			<Text style={[AppStyle.font, styles.title]}>{props.title}</Text>
			{props.children && (
				<>
					{typeof props.children === 'string' && (
						<Text style={[AppStyle.font, styles.content]}>
							{props.children}
						</Text>
					)}
					{typeof props.children !== 'string' && (
						<View style={[AppStyle.expand]}>{props.children}</View>
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
	},
	body: {
		gap: 4,
		justifyContent: 'space-between',
	},
	title: {
		color: '#1E1B1B',
	},
	content: {
		color: '#1E1B1B',
		fontFamily: 'OpenSans',
		fontSize: 16,
	},
	container: {
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
