import { createRealmContext } from '@realm/react'
import {
	Forecast,
	City,
	Clounds,
	Main,
	Rain,
	Snow,
	Sys,
	Weather,
	Wind,
	Coord,
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
