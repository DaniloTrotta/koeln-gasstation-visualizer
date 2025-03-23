"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryState } from "nuqs";

export const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useQueryState("searchTerm", {
		defaultValue: "",
	});

	return (
		<div className="w-full flex flex-col">
			<Label className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
				Adresse suchen
			</Label>
			<Input
				type="search"
				placeholder="Suchen..."
				value={searchTerm ?? undefined}
				onChange={(e) => setSearchTerm(e.target.value, { shallow: false })}
				className="w-full"
			/>
		</div>
	);
};
