"use client";

import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";

export const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useQueryState("searchTerm", {
		defaultValue: "",
	});

	return (
		<div className="w-full">
			<Input
				type="search"
				placeholder="Adresse suchen..."
				value={searchTerm ?? undefined}
				onChange={(e) => setSearchTerm(e.target.value, { shallow: false })}
				className="w-full"
			/>
		</div>
	);
};
