import {
	Image,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
} from 'react-native';

import { DetailButton } from './Day.DetailButton';

type DayProps = {
	time: Date;
	status: string;
	temp: number;
	feelLike: number;
	icon: string;
	styles: StyleProp<ViewStyle>;
};

export const Day = (props: DayProps) => (
	<View style={[props.styles, styles.container]}>
		<View style={styles.main}>
			<Text style={styles.text}>
				{props.time.toLocaleDateString('en-US', {weekday: 'long'})}
			</Text>
			<Text style={[styles.text, styles.status_text]}>{props.status}</Text>
		</View>
		<View>
			<Text style={[styles.text, styles.temp]}>{props.temp}°</Text>
			<Text style={[styles.text, styles.temp]}>{props.feelLike}°</Text>
		</View>
		<View style={styles.vr}/>
		<Image
			style={styles.image}
			source={{
				uri: `https://openweathermap.org/img/wn/${props.icon}@2x.png`,
			}}
		/>
		<DetailButton/>
	</View>
);

const styles = StyleSheet.create({
	vr: {
		width: 2,
		height: 51,
		backgroundColor: '#4B454D',
	},
	container: {
		borderRadius: 18,
		overflow: 'hidden',
		backgroundColor: '#EBDEFF',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 18,
		paddingVertical: 15,
		gap: 12,
	},
	main: {
		flex: 1,
		justifyContent: 'space-between',
	},
	image: {
		width: 54,
		height: 54,
	},
	text: {
		fontFamily: 'ProductSans',
		color: '#000',
		fontSize: 16,
		letterSpacing: 0.15,
		lineHeight: 24,
	},
	status_text: {
		color: '#494649',
	},
	temp: {
		color: '#2E004E',
		textAlign: 'right',
	},
});
