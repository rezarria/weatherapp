import { useQuery } from '@realm/react'
import { Forecast } from '../../../data/model'

const WeatherFastInfoBar = () => {
	const query = useQuery(Forecast)
	const nowTimestamp = Date.now() / 1000

	return <WeatherFastInfoBar />
}
