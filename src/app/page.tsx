import { GasStationTableServer } from "@/components/gas-station-table";
import type { PageParams } from "@/lib/page-params";
import { routes } from "@/utils/routes";
import { Suspense } from "react";

export default async function Home(props: PageParams) {
	const searchParams = await props.searchParams;

	const parsedSearchParams = routes.index.$parseSearchParams(searchParams);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1>Köln Tankstellen</h1>
				<Suspense fallback={<div>Lade...</div>}>
					<GasStationTableServer searchParams={parsedSearchParams} />
				</Suspense>
			</main>
		</div>
	);
}
