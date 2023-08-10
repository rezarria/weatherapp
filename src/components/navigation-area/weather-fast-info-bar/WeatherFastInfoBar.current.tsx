import { useQuery } from '@realm/react'
import { ForecastModel } from '../../../model/forecast'

const WeatherFastInfoBar = () => {
	const query = useQuery(ForecastModel)
	const nowTimestamp = Date.now() / 1000

	return <WeatherFastInfoBar />
}
