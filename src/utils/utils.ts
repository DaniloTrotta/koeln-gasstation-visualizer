import type { GasStationFeature } from "./types";

export function filterGasStationsByAddress(
	gasStations: GasStationFeature[],
	searchTerm: string | undefined,
): GasStationFeature[] {
	if (!searchTerm || !searchTerm.trim()) {
		return gasStations; // Return all stations if no search term
	}

	const normalizedSearchTerm = searchTerm.toLowerCase().trim();

	return gasStations.filter((station) =>
		station.attributes.adresse.toLowerCase().includes(normalizedSearchTerm),
	);
}
