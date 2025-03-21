import GasStationTableServer from "@/components/gas-station-table";

export type GasStationTableProps = {
	searchParams?: Promise<{ search?: string }>;
};

export default async function Home({ searchParams }: GasStationTableProps) {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1>Köln Tankstellen</h1>
				<GasStationTableServer searchParams={searchParams} />
			</main>
		</div>
	);
}
