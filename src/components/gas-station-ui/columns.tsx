"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MapPin } from "lucide-react";
import { DataTableColumnHeader } from "../ui/data-table-column-header";

export type GasStationFeatureForTable = {
	adresse: string;
	coordinates: { x: number; y: number };
	id: number;
	stadtteil: string;
};

export const columns: ColumnDef<GasStationFeatureForTable>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="ID" />
		),
		cell: ({ row }) => <div>{row.original.id}</div>,
	},
	{
		accessorKey: "adresse",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Adresse" />
		),
		cell: ({ row }) => <div>{row.original.adresse}</div>,
	},
	// {
	// 	accessorKey: "stadtteil",
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="Stadtteil" />
	// 	),
	// 	cell: ({ row }) => (
	// 		<Badge variant="outline">{row.original.stadtteil || ""}</Badge>
	// 	),
	// },
	{
		accessorKey: "coordinates",
		header: "Koordinaten",
		cell: ({ row }) => (
			<div className="flex items-center">
				<MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
				<span className="text-xs text-muted-foreground flex gap-2">
					<span>{row.original?.coordinates?.y?.toFixed(6) || "N/A"},</span>
					<span>{row.original?.coordinates?.x?.toFixed(6) || "N/A"}</span>
				</span>
			</div>
		),
	},
];
