import { createNavigationConfig } from "next-safe-navigation";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const baseSearchParamsSchema = {
	desc: z
		.string()
		.transform((value) => value === "true")
		.optional(),
	column: z.string().optional(),
	page: z.coerce.number().optional(),
	limit: z.coerce.number().optional(),
	searchTerm: z.string().optional(),
};

export type BaseSortSearchParams = {
	column: z.infer<(typeof baseSearchParamsSchema)["column"]>;
	desc: z.infer<(typeof baseSearchParamsSchema)["desc"]>;
};

export const { routes, useSafeParams, useSafeSearchParams } =
	createNavigationConfig((defineRoute) => ({
		index: defineRoute("/", {
			search: z
				.object({
					searchTerm: z.string().optional(),
				})
				.default({}),
		}),
	}));

type ExtractSearchParams<T> = T extends {
	$parseSearchParams: (params: Record<string, string | string[]>) => unknown;
}
	? ReturnType<T["$parseSearchParams"]>
	: never;

type AllSearchParams = {
	[K in keyof typeof routes]: ExtractSearchParams<(typeof routes)[K]>;
}[keyof typeof routes];

type UnionKeys<T> = T extends unknown ? keyof T : never;

export type SearchParamKey = UnionKeys<AllSearchParams>;
