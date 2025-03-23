import { Pool } from "@neondatabase/serverless";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import { type NeonQueryResultHKT, drizzle } from "drizzle-orm/neon-serverless";
import type { PgTransaction } from "drizzle-orm/pg-core";
import * as schema from "./schema";

/**
 * Type of the drizzle/postgre-js transaction.
 *
 * Type of context provided to the repository operation when the operation needs to be performed as a transaction.
 */
export type DrizzleTransactionScope = PgTransaction<
	NeonQueryResultHKT,
	typeof schema,
	ExtractTablesWithRelations<typeof schema>
>;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
