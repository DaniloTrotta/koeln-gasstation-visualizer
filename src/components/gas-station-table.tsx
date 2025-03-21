import type { routes } from "@/utils/routes";
import {
	type GasStationFeature,
	type GasStationResponse,
	GasStationResponseSchema,
} from "@/utils/types";
import { filterGasStationsByAddress } from "@/utils/utils";
import React, { use } from "react";
import { SearchBar } from "./searchbar";

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

	if (filteredGasStations.length === 0) {
		return (
			<div>
				<h2>Gas Stations in Köln</h2>
				<div className="search-form">
					<SearchBar />
				</div>
				<p className="mt-4">No gas stations found matching your search.</p>
			</div>
		);
	}

	return (
		<div>
			<h2>Gas Stations in Köln</h2>

			{/* Search form */}
			<div className="search-form mb-4">
				<SearchBar />
			</div>

			{/* Results count */}
			<p className="mb-2">
				Showing {filteredGasStations.length} of {gasStations.length} gas
				stations
			</p>

			<table className="w-full border-collapse">
				<thead>
					<tr>
						<th className="border p-2">ID</th>
						<th className="border p-2">Address</th>
						<th className="border p-2">Coordinates</th>
					</tr>
				</thead>
				<tbody>
					{filteredGasStations.map((station) => (
						<tr key={station.attributes.objectid}>
							<td className="border p-2">{station.attributes.objectid}</td>
							<td className="border p-2">{station.attributes.adresse}</td>
							<td className="border p-2">
								{station.geometry.x.toFixed(6)}, {station.geometry.y.toFixed(6)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
