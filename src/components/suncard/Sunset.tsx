import Logo from '@assets/svg/sunset.svg'
import { Text } from 'react-native'
import { Card } from '../card'
import { convertToTime, when } from './share'

interface Props {
	time: number | undefined
}

const Sunset = ({ time }: Props) => {
	return (
		<Card
			title={'Sunset'}
			icon={<Logo />}
			subContext={<Text>{when(time)}</Text>}
		>
			{convertToTime(time)}
		</Card>
	)
}

export default Sunset
