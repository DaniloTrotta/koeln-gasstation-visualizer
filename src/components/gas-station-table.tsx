import type { routes } from "@/utils/routes";
import {
	type GasStationFeature,
	type GasStationResponse,
	GasStationResponseSchema,
} from "@/utils/types";
import { filterGasStationsByAddress } from "@/utils/utils";
import { MapPin } from "lucide-react";
import React, { use } from "react";
import { SearchBar } from "./searchbar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

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
					<p className="mb-2">
						Showing {filteredGasStations.length} of {gasStations.length} gas
						stations
					</p>

					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[80px]">ID</TableHead>
									<TableHead>Adresse</TableHead>
									<TableHead className="hidden md:table-cell">
										Stadtteil
									</TableHead>
									<TableHead className="hidden md:table-cell">
										Koordinaten
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredGasStations && filteredGasStations.length > 0 ? (
									filteredGasStations.map((station) => (
										<TableRow
											key={station?.attributes?.objectid || Math.random()}
										>
											<TableCell>
												{station?.attributes?.objectid || "N/A"}
											</TableCell>
											<TableCell>
												{station?.attributes?.adresse || "N/A"}
											</TableCell>
											<TableCell className="hidden md:table-cell">
												<Badge variant="outline">
													{station?.attributes?.adresse || ""}
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												<div className="flex items-center">
													<MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
													<span className="text-xs text-muted-foreground">
														{station?.geometry?.y?.toFixed(6) || "N/A"},{" "}
														{station?.geometry?.x?.toFixed(6) || "N/A"}
													</span>
												</div>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={4} className="text-center py-6">
											{"Keine Tankstellen gefunden"}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
