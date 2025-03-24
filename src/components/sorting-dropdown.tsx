"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

export const SortingDropdown = () => {
	const [sorting, setSorting] = useQueryState("sorting", {
		defaultValue: "asc",
	});

	return (
		<>
			<Select
				value={sorting}
				onValueChange={(value) =>
					setSorting(value as "asc" | "desc", { shallow: false })
				}
			>
				<SelectGroup>
					<SelectLabel>Adresse sortieren nach</SelectLabel>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="asc">Aufsteigend</SelectItem>
						<SelectItem value="desc">Absteigend</SelectItem>
					</SelectContent>
				</SelectGroup>
			</Select>
		</>
	);
};
