import type { GasStationFeature } from "@/utils/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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

export const extractDistrict = (address: string) => {
	if (!address) return "";
	const match = address.match(/\(([^)]+)\)/);
	return match ? match[1] : "";
};
