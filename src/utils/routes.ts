import { createNavigationConfig } from "next-safe-navigation";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const baseSearchParamsSchema = {
	searchTerm: z.string().optional(),
	sorting: z.enum(["asc", "desc"]).optional(),
};

export type BaseSortSearchParams = {
	sorting: z.infer<(typeof baseSearchParamsSchema)["sorting"]>;
};

export const { routes, useSafeParams, useSafeSearchParams } =
	createNavigationConfig((defineRoute) => ({
		index: defineRoute("/", {
			search: z
				.object({
					searchTerm: z.string().optional(),
					sorting: z.enum(["asc", "desc"]).optional(),
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
