import { SearchBar } from "@/components/searchbar";
import { SortingDropdown } from "@/components/sorting-dropdown";
import { Card, CardContent } from "@/components/ui/card";

import { gasStationRepository } from "@/server/db/repository/gas-station-repository";
import type { GasStationSelect } from "@/server/db/schema";
import type { routes } from "@/utils/routes";
import React, { use } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { CreateGasStationModal } from "./create-gas-station-modal";

async function getGasStations({
	searchTerm,
	sorting,
}: {
	searchTerm: string | undefined;
	sorting: "asc" | "desc";
}) {
	const gasStations = await gasStationRepository.getAllFilteredAndSorted({
		searchTerm,
		sort: {
			id: sorting,
			desc: sorting === "desc",
		},
	});
	return gasStations;
}

export const GasStationView = ({
	searchParams,
}: { searchParams: ReturnType<typeof routes.index.$parseSearchParams> }) => {
	const { searchTerm, sorting = "asc" } = searchParams;

	let gasStations: GasStationSelect[] = [];

	gasStations = use(getGasStations({ searchTerm, sorting }));

	if (gasStations.length === 0) {
		return (
			<Card>
				<CardContent>
					<div className="search-form">
						<SearchBar />
					</div>
					<p className="mt-4">Keine Tankstellen gefunden.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div>
			<div>
				{/* Search and sort controls */}
				<div className="flex flex-col gap-0 w-full mb-4">
					<div className="mb-4 flex gap-4 items-center">
						<div className="flex-1">
							<SearchBar />
						</div>
						<SortingDropdown />
					</div>

					<CreateGasStationModal />
				</div>

				{/* Results count */}
				<div>
					<DataTable
						columns={columns}
						data={gasStations}
						originalDataCount={gasStations.length}
					/>
				</div>
			</div>
		</div>
	);
};
