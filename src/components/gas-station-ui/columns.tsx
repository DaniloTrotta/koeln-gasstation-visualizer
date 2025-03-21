"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../ui/data-table-column-header";

export type GasStationFeatureForTable = {
	adresse: string;
	coordinates: { x: number; y: number };
	id: number;
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
	{
		accessorKey: "coordinates",
		header: "Koordinaten",
		cell: ({ row }) => (
			<div>
				{row.original.coordinates.x}, {row.original.coordinates.y}
			</div>
		),
	},
];
