import { GasStationView } from "@/components/gas-station-ui/gas-station-view";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { PageParams } from "@/lib/page-params";
import { routes } from "@/utils/routes";
import { Suspense } from "react";

export default async function Home(props: PageParams) {
	const searchParams = await props.searchParams;

	const parsedSearchParams = routes.index.$parseSearchParams(searchParams);

	return (
		<main className="container mx-auto py-10 px-4">
			{/* TODO: Move this to a header component , add maybe logo */}
			<div className="w-full flex justify-between items-start">
				<h1 className="text-3xl font-bold mb-6">Tankstellen in Köln</h1>
				<ThemeToggle isRoundedFull />
			</div>
			<p className="text-muted-foreground mb-6">
				Eine Übersicht aller Tankstellen in Köln mit Filtermöglichkeiten nach
				Straßennamen und Sortierung.
			</p>
			<p className="text-muted-foreground mb-6">
				Daten werden in eine PostgreSQL Datenbank (NeonDB) importiert bei aufruf
				der <code className="bg-muted px-1 rounded-md">api/import-data</code>{" "}
				route.
				<br />
				Die Daten werden dann von der Datenbank abgerufen und angezeigt.
				<br />
				Es können neue Tankstellen hinzugefügt oder gelöscht werden.
			</p>
			<p className="text-muted-foreground mb-6">
				<span className="font-bold text-primary">Tech-Stack:</span> Next.js,
				Shadcn, NeonDB, Drizzle, Zod, Nuqs, ZSA
			</p>
			<Suspense fallback={<div>Lade...</div>}>
				<GasStationView searchParams={parsedSearchParams} />
			</Suspense>
		</main>
	);
}
