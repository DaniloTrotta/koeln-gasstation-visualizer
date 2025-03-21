"use client";

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
			<div className="relative flex-grow ">
				<input
					type="search"
					placeholder="Search by address"
					value={searchTerm ?? undefined}
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
				/>
				<button
					type="submit"
					className="h-full rounded-l-none bg-blue-500 text-white w-48"
				>
					<span>Search</span>
				</button>
			</div>
		</form>
	);
};
