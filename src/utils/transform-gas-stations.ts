import type { GasStationInsert } from "@/server/db/schema";
import type { GasStationResponse } from "./types";

export const transformGasStationData = (
	feature: GasStationResponse["features"][0],
): GasStationInsert => {
	return {
		objectid: feature.attributes.objectid,
		adresse: feature.attributes.adresse,
		longitude: feature.geometry.x.toString(),
		latitude: feature.geometry.y.toString(),
	};
};
