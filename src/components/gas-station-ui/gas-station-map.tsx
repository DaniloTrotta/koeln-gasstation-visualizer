"use client";
import type { GasStationFeature } from "@/utils/types";
import { useMemo } from "react";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export const GasStationMap = ({
	gasStations,
}: {
	gasStations: GasStationFeature[];
}) => {
	const initialViewState = gasStations.at(0)?.geometry;

	const markers = useMemo(
		() =>
			gasStations.map((gasStation) => (
				<Marker
					key={gasStation.attributes.objectid}
					longitude={gasStation.geometry.x}
					latitude={gasStation.geometry.y}
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
