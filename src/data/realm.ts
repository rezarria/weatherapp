import { createRealmContext } from '@realm/react'
import {
	City,
	Clounds,
	Coord,
	Forecast,
	Main,
	Rain,
	Snow,
	Sys,
	Weather,
	Wind,
} from './model'

export const { RealmProvider, useObject, useQuery, useRealm } =
	createRealmContext({
		schema: [
			Forecast,
			City,
			Coord,
			Clounds,
			Main,
			Rain,
			Snow,
			Sys,
			Weather,
			Wind,
		],
		schemaVersion: 24,
		deleteRealmIfMigrationNeeded: true,
	})
