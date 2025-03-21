"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback } from "react";

export const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useQueryState("searchTerm", {
		defaultValue: "",
	});

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.stopPropagation();
			e.preventDefault();
			setSearchTerm(searchTerm, { shallow: false });
		},
		[searchTerm, setSearchTerm],
	);

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full items-center space-x-0 "
		>
			<div className="relative flex-grow flex items-center gap-2">
				<Input
					type="search"
					placeholder="Search by address"
					value={searchTerm ?? undefined}
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
				/>
				<Button type="submit" variant="outline">
					<Search className="size-4" />
					<span>Search</span>
				</Button>
			</div>
		</form>
	);
};
