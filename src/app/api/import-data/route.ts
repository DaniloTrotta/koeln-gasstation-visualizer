import { gasStationRepository } from "@/server/db/repository/gas-station-repository";

export async function GET() {
	try {
		await gasStationRepository.importGasStations();
		return new Response("Gas stations imported", { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Failed to import gas stations", { status: 500 });
	}
}
