"use client";
import { useMemo } from "react";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { GasStationFeatureForTable } from "./columns";

export const GasStationMap = ({
	gasStations,
}: {
	gasStations: GasStationFeatureForTable[];
}) => {
	const initialViewState = gasStations.at(0)?.coordinates;

	const markers = useMemo(
		() =>
			gasStations.map((gasStation) => (
				<Marker
					key={gasStation.adresse}
					longitude={gasStation.coordinates.x}
					latitude={gasStation.coordinates.y}
					pitchAlignment="map"
				/>
			)),
		[gasStations],
	);
	return (
		<div className="relative h-full w-full">
			<Map
				initialViewState={{
					longitude: initialViewState?.x,
					latitude: initialViewState?.y,
					zoom: 12,
					bearing: 0,
					pitch: 0,
				}}
				style={{ width: "100%", height: "100%" }}
				mapStyle="mapbox://styles/mapbox/streets-v9"
			>
				{markers}
			</Map>
		</div>
	);
};
