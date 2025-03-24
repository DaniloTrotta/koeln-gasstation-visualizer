import { db } from "@/server/db/drizzle";
import { type GasStationInsert, gasStations } from "@/server/db/schema";
import { toTsQuery } from "@/utils/to-ts-query";
import { transformGasStationData } from "@/utils/transform-gas-stations";
import {
	type GasStationResponse,
	GasStationResponseSchema,
} from "@/utils/types";
import { asc, desc, eq } from "drizzle-orm";

const getById = async (id: number) => {
	return await db.query.gasStations.findFirst({
		where: eq(gasStations.objectid, id),
	});
};

const getAll = async () => {
	return await db.query.gasStations.findMany();
};

const create = async (gasStation: GasStationInsert) => {
	return await db.insert(gasStations).values(gasStation);
};

const update = async (id: number, gasStation: GasStationInsert) => {
	return await db
		.update(gasStations)
		.set(gasStation)
		.where(eq(gasStations.objectid, id));
};

const remove = async (id: number) => {
	return await db.delete(gasStations).where(eq(gasStations.objectid, id));
};

const getAllFilteredAndSorted = async ({
	searchTerm,
	sort,
}: {
	searchTerm?: string;
	sort?: { id: string; desc: boolean };
}) => {
	return await db.query.gasStations.findMany({
		where: searchTerm
			? toTsQuery({ searchTerm, column: gasStations.textSearch })
			: undefined,
		orderBy:
			sort?.desc === true
				? desc(gasStations.adresse)
				: asc(gasStations.adresse),
	});
};

const upsert = async (gasStation: GasStationInsert) => {
	return await db.insert(gasStations).values(gasStation).onConflictDoUpdate({
		target: gasStations.objectid,
		set: gasStation,
	});
};

const importGasStations = async () => {
	if (!process.env.GAS_STATION_URL) {
		throw new Error("GAS_STATIONS_URL is not set");
	}
	const res = await fetch(process.env.GAS_STATION_URL);
	if (!res.ok) {
		throw new Error("Failed to fetch gas stations");
	}
	const rawData = await res.json();
	const validationResult = GasStationResponseSchema.safeParse(rawData);

	if (!validationResult.success) {
		throw new Error(
			`Data validation failed: ${validationResult.error.message}`,
		);
	}

	const data: GasStationResponse = validationResult.data;

	const gasStations = data.features.map(transformGasStationData);

	await Promise.all(gasStations.map(upsert));
};

export const gasStationRepository = {
	getById,
	getAll,
	create,
	update,
	remove,
	getAllFilteredAndSorted,
	importGasStations,
	upsert,
};
