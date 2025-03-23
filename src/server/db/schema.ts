import { tsVector } from "@/utils/ts-vector";
import { type SQL, sql } from "drizzle-orm";
import { integer, numeric, pgTable, text } from "drizzle-orm/pg-core";

export const gasStations = pgTable("gas_stations", {
	objectid: integer("objectid").primaryKey(),
	adresse: text("adresse").notNull(),
	longitude: numeric("longitude").notNull(),
	latitude: numeric("latitude").notNull(),
	textSearch: tsVector("text_search").generatedAlwaysAs(
		(): SQL => sql`(
		to_tsvector('simple', coalesce(${gasStations.adresse}, ''))
		)`,
	),
});

// Types for gas stations
export type GasStationSelect = typeof gasStations.$inferSelect;
export type GasStationInsert = typeof gasStations.$inferInsert;
