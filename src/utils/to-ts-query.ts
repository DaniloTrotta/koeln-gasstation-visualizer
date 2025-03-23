import { sql } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";

export const toTsQuery = ({
	searchTerm,
	column,
}: { searchTerm: string; column: PgColumn }) => {
	return sql`(
		${column} @@ (
				SELECT to_tsquery(
						string_agg(lexeme || ':*', ' & ' ORDER BY positions)
				)
				FROM unnest(to_tsvector(${searchTerm})) AS lexeme
		)
	)`;
};
