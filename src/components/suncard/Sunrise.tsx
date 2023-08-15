import Logo from '@assets/svg/sunrise.svg'
import { Card } from '../card'
import { Text } from 'react-native'
import { convertToTime, when } from './share'

export type Props = {
	time: number | undefined
}

const Sunrise = (props: Props) => {
	return (
		<Card
			title={'Sunrise'}
			icon={<Logo />}
			subContext={<Text>{when(props.time)}</Text>}
		>
			{convertToTime(props.time)}
		</Card>
	)
}

export default Sunrise
