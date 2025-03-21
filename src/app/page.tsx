import { GasStationTableServer } from "@/components/gas-station-table";
import type { PageParams } from "@/lib/page-params";
import { routes } from "@/utils/routes";
import { Suspense } from "react";

export default async function Home(props: PageParams) {
	const searchParams = await props.searchParams;

	const parsedSearchParams = routes.index.$parseSearchParams(searchParams);

	return (
		<main className="container mx-auto py-10 px-4">
			<h1 className="text-3xl font-bold mb-6">Tankstellen in Köln</h1>
			<p className="text-muted-foreground mb-6">
				Eine Übersicht aller Tankstellen in Köln mit Filtermöglichkeiten nach
				Straßennamen und Sortierung.
			</p>
			<Suspense fallback={<div>Lade...</div>}>
				<GasStationTableServer searchParams={parsedSearchParams} />
			</Suspense>
		</main>
	);
}
