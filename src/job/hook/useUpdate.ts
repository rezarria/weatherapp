import { useEffect } from 'react'
import useForecastStore from '../../zustand/store'
import { useQuery, useRealm } from '../../data/realm'
import { City, Forecast } from '../../data/model'
import { fetchForecastIfNeed } from './useFirstUpdate'

const useUpdate = () => {
	const forecastQuery = useQuery(Forecast)
	const cityQuery = useQuery(City)
	const realm = useRealm()
	const city = useForecastStore(e => e.city)
	useEffect(() => {
		fetchForecastIfNeed(realm, forecastQuery, cityQuery)
	}, [city?._id, cityQuery, forecastQuery, realm])
}

export default useUpdate
