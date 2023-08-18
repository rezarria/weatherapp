import { useEffect, useRef } from 'react'
import useForecastStore from '../../zustand/store'
import { useQuery, useRealm } from '../../data/realm'
import { City, Forecast } from '../../data/model'
import { fetchForecastIfNeed } from './useFirstUpdate'

const useUpdate = () => {
	const forecastQuery = useQuery(Forecast)
	const cityQuery = useQuery(City)
	const realm = useRealm()
	const [city, stage, setStage] = useForecastStore(e => [
		e.city,
		e.stage,
		e.setStage,
	])
	const task = useRef<Promise<any>>()
	useEffect(() => {
		if (
			stage === 'need-update-forecast' &&
			task.current == null &&
			city != null
		) {
			console.debug('có sự thay đổi về địa điểm!')
			task.current = fetchForecastIfNeed(realm, forecastQuery, cityQuery)(
				city.coord.lat,
				city.coord.lon,
				city._id
			).finally(() => {
				console.debug('cập nhật xong forecast cho địa điểm hiện')
				task.current = undefined
				setStage('do-nothing')
			})
		}
	}, [city, cityQuery, forecastQuery, realm, setStage, stage])
}

export default useUpdate
