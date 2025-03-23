import type { GasStationSelect } from "@/server/db/schema";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function filterGasStationsByAddress(
	gasStations: GasStationSelect[],
	searchTerm: string | undefined,
): GasStationSelect[] {
	if (!searchTerm || !searchTerm.trim()) {
		return gasStations; // Return all stations if no search term
	}

	const normalizedSearchTerm = searchTerm.toLowerCase().trim();

	return gasStations.filter((station) =>
		station.adresse.toLowerCase().includes(normalizedSearchTerm),
	);
}

export const extractDistrict = (address: string) => {
	if (!address) return "";
	const match = address.match(/\(([^)]+)\)/);
	return match ? match[1] : "";
};
