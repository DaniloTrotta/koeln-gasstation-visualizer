import type { GasStationTableProps } from "@/app/page";
import {
	type GasStationFeature,
	type GasStationResponse,
	GasStationResponseSchema,
} from "@/utils/types";
import { filterGasStationsByAddress } from "@/utils/utils";
import React from "react";

const GasStationTableServer = async ({
	searchParams,
}: GasStationTableProps) => {
	// No longer need to await searchParams
	const searchTerm = searchParams?.search || "";

	let gasStations: GasStationFeature[] = [];
	let fetchError: Error | null = null;

	try {
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
		gasStations = data.features;
	} catch (error) {
		console.error("Error fetching gas stations:", error);
		fetchError = error instanceof Error ? error : new Error(String(error));
	}

	if (fetchError) {
		return <div>Error loading gas station data: {fetchError.message}</div>;
	}

	const filteredGasStations = filterGasStationsByAddress(
		gasStations,
		searchTerm,
	);

	if (filteredGasStations.length === 0) {
		return (
			<div>
				<h2>Gas Stations in Köln</h2>
				<div className="search-form">
					<form>
						<input
							type="text"
							name="search"
							placeholder="Search by address"
							defaultValue={searchTerm}
							className="p-2 border rounded mr-2"
						/>
						<button
							type="submit"
							className="p-2 bg-blue-500 text-white rounded"
						>
							Search
						</button>
					</form>
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
				<form>
					<input
						type="text"
						name="search"
						placeholder="Search by address"
						defaultValue={searchTerm}
						className="p-2 border rounded mr-2"
					/>
					<button type="submit" className="p-2 bg-blue-500 text-white rounded">
						Search
					</button>
				</form>
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

export default GasStationTableServer;
