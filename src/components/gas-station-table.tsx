import {
	type GasStationFeature,
	type GasStationResponse,
	GasStationResponseSchema,
} from "@/utils/types";
import React from "react";

const GasStationTableServer = async () => {
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
			console.error("Data validation failed:", validationResult.error);
			return <div>Error: Invalid data format from API</div>;
		}

		const data: GasStationResponse = validationResult.data;
		const gasStations: GasStationFeature[] = data.features;

		return (
			<div>
				<h2>Gas Stations in Köln</h2>
				<table className="w-full border-collapse">
					<thead>
						<tr>
							<th className="border p-2">ID</th>
							<th className="border p-2">Address</th>
							<th className="border p-2">Coordinates</th>
						</tr>
					</thead>
					<tbody>
						{gasStations.map((station) => (
							<tr key={station.attributes.objectid}>
								<td className="border p-2">{station.attributes.objectid}</td>
								<td className="border p-2">{station.attributes.adresse}</td>
								<td className="border p-2">
									{station.geometry.x.toFixed(6)},{" "}
									{station.geometry.y.toFixed(6)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	} catch (error) {
		console.error("Error fetching gas stations:", error);
		return <div>Error loading gas station data</div>;
	}
};

export default GasStationTableServer;
