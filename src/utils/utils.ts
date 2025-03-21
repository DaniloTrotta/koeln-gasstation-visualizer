import type { GasStationFeature } from "./types";

export function filterGasStationsByAddress(
	gasStations: GasStationFeature[],
	searchTerm: string,
): GasStationFeature[] {
	console.log("filterGasStationsByAddress", searchTerm);
	if (!searchTerm.trim()) {
		return gasStations; // Return all stations if no search term
	}

	const normalizedSearchTerm = searchTerm.toLowerCase().trim();

	return gasStations.filter((station) =>
		station.attributes.adresse.toLowerCase().includes(normalizedSearchTerm),
	);
}
