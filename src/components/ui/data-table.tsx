"use client";

import {
	type ColumnDef,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import type { GasStationFeatureForTable } from "../gas-station-ui/columns";
import { GasStationMap } from "../gas-station-ui/gas-station-map";
import { Card, CardContent, CardFooter } from "./card";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	originalDataCount: number;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	originalDataCount,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	const gasStations = table.getRowModel().rows.map((row) => row.original);

	return (
		<Card className="grid grid-cols-3 gap-2 rounded-md border min-h-[550px]">
			<CardContent className="col-span-2 flex flex-col justify-between">
				<Table className="">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<div className="flex items-baseline py-4 px-2 w-full mt-auto">
					{data.length !== originalDataCount && (
						<p className="mb-2 text-xs text-muted-foreground ">
							Showing {data.length} of {originalDataCount} gas stations
						</p>
					)}
					<div className="ml-auto">
						<DataTablePagination table={table} />
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<div className=" h-full w-full rounded-3xl border-2 border-foreground/10 overflow-hidden">
					<GasStationMap
						gasStations={gasStations as GasStationFeatureForTable[]}
					/>
				</div>
			</CardFooter>
		</Card>
	);
}
