"use client";
import { useMemo, useState } from "react";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { GasStationSelect } from "@/server/db/schema";
import { useTheme } from "next-themes";
export const GasStationMap = ({
	gasStations,
}: {
	gasStations: GasStationSelect[];
}) => {
	const { theme } = useTheme();
	const initialViewState = {
		x: gasStations.at(0)?.longitude,
		y: gasStations.at(0)?.latitude,
	};
	const [popupInfo, setPopupInfo] = useState<GasStationSelect | null>(null);

	const markers = useMemo(
		() =>
			gasStations.map((gasStation) => (
				<Marker
					key={gasStation.adresse}
					longitude={Number(gasStation.longitude)}
					latitude={Number(gasStation.latitude)}
					anchor="bottom"
					onClick={(e) => {
						// If we let the click event propagates to the map, it will immediately close the popup
						// with `closeOnClick: true`
						e.originalEvent.stopPropagation();
						setPopupInfo(gasStation);
					}}
				/>
			)),
		[gasStations],
	);
	return (
		<div className="relative h-full w-full">
			<Map
				initialViewState={{
					longitude: Number(initialViewState?.x),
					latitude: Number(initialViewState?.y),
					zoom: 12,
					bearing: 0,
					pitch: 0,
				}}
				style={{ width: "100%", height: "100%" }}
				mapStyle={
					theme === "dark"
						? "mapbox://styles/mapbox/dark-v10"
						: "mapbox://styles/mapbox/streets-v11"
				}
			>
				{markers}
				{popupInfo && (
					<Popup
						anchor="top"
						longitude={Number(popupInfo.longitude)}
						latitude={Number(popupInfo.latitude)}
						onClose={() => setPopupInfo(null)}
					>
						<div>{popupInfo.adresse}</div>
					</Popup>
				)}
			</Map>
		</div>
	);
};
