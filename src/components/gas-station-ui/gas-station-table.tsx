import { SearchBar } from "@/components/searchbar";
import { Card, CardContent } from "@/components/ui/card";

import type { routes } from "@/utils/routes";
import {
	type GasStationFeature,
	type GasStationResponse,
	GasStationResponseSchema,
} from "@/utils/types";
import { filterGasStationsByAddress } from "@/utils/utils";
import React, { use } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";

async function getGasStations() {
	const GAS_STATION_URL = process.env.GAS_STATION_URL;
	if (!GAS_STATION_URL) {
		throw new Error("GAS_STATION_URL is not defined, check your .env file");
	}
	const response = await fetch(GAS_STATION_URL);
	const rawData = await response.json();

	// Validate the data with Zod
	const validationResult = GasStationResponseSchema.safeParse(rawData);

	if (!validationResult.success) {
		throw new Error(
			`Data validation failed: ${validationResult.error.message}`,
		);
	}

	const data: GasStationResponse = validationResult.data;
	return data.features;
}

export const GasStationTableServer = ({
	searchParams,
}: { searchParams: ReturnType<typeof routes.index.$parseSearchParams> }) => {
	const { searchTerm } = searchParams;

	let gasStations: GasStationFeature[] = [];

	gasStations = use(getGasStations());

	const filteredGasStations = filterGasStationsByAddress(
		gasStations,
		searchTerm,
	);

	const transformedGasStationsForTable = filteredGasStations.map(
		(gasStation) => ({
			id: gasStation.attributes.objectid,
			adresse: gasStation.attributes.adresse,
			coordinates: {
				x: gasStation.geometry.x,
				y: gasStation.geometry.y,
			},
		}),
	);

	if (transformedGasStationsForTable.length === 0) {
		return (
			<Card>
				<CardContent>
					<div className="search-form">
						<SearchBar />
					</div>
					<p className="mt-4">No gas stations found matching your search.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardContent>
				<div>
					{/* Search form */}
					<div className="search-form mb-4">
						<SearchBar />
					</div>

					{/* Results count */}

					<div className="rounded-md border">
						<DataTable
							columns={columns}
							data={transformedGasStationsForTable}
							originalDataCount={gasStations.length}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
