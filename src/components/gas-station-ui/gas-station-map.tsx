"use client";
import { useMemo, useState } from "react";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import type { GasStationFeatureForTable } from "./columns";

export const GasStationMap = ({
	gasStations,
}: {
	gasStations: GasStationFeatureForTable[];
}) => {
	const { theme } = useTheme();
	const initialViewState = gasStations.at(0)?.coordinates;
	const [popupInfo, setPopupInfo] = useState<GasStationFeatureForTable | null>(
		null,
	);

	const markers = useMemo(
		() =>
			gasStations.map((gasStation) => (
				<Marker
					key={gasStation.adresse}
					longitude={gasStation.coordinates.x}
					latitude={gasStation.coordinates.y}
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
					longitude: initialViewState?.x,
					latitude: initialViewState?.y,
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
						longitude={Number(popupInfo.coordinates.x)}
						latitude={Number(popupInfo.coordinates.y)}
						onClose={() => setPopupInfo(null)}
					>
						<div>{popupInfo.adresse}</div>
					</Popup>
				)}
			</Map>
		</div>
	);
};
