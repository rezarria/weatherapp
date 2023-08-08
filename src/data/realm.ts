import { CityModel, CoordRealm } from '../model/city'
import {
	CloundsModel,
	ForecastModel,
	MainModel,
	RainModel,
	SnowModel,
	SysModel,
	WeatherModel,
	WindModel,
} from '../model/forecast'
import { createRealmContext } from '@realm/react'

export const { RealmProvider, useObject, useQuery, useRealm } =
	createRealmContext({
		schema: [
			CityModel,
			ForecastModel,
			CoordRealm,
			SysModel,
			WindModel,
			WeatherModel,
			CloundsModel,
			RainModel,
			SnowModel,
			MainModel,
		],
		schemaVersion: 20,
		deleteRealmIfMigrationNeeded: true,
	})
