"use client";

import type { GasStationSelect } from "@/server/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { MapPin } from "lucide-react";

import { DeleteGasStationButton } from "./delete-gast-station-button";

export const columns: ColumnDef<GasStationSelect>[] = [
	// REMARK: We dont need this column, information is not relevant for the user
	// {
	// 	accessorKey: "id",
	// 	header: "ID",
	// 	cell: ({ row }) => <div>{row.original.objectid}</div>,
	// },
	{
		accessorKey: "adresse",
		header: "Adresse",
		cell: ({ row }) => <div>{row.original.adresse}</div>,
	},
	{
		accessorKey: "coordinates",
		header: "Koordinaten",
		cell: ({ row }) => {
			return (
				<div className="flex items-center">
					<MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
					<span className="text-xs text-muted-foreground flex gap-2">
						<span>{row.original?.latitude || "N/A"},</span>
						<span>{row.original?.longitude || "N/A"} </span>
					</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => (
			<DeleteGasStationButton objectid={row.original.objectid} />
		),
	},
];
