import { z } from "zod";

// Define the Zod schema for the API response
const GasStationGeometrySchema = z.object({
	x: z.number(),
	y: z.number(),
});

const GasStationAttributesSchema = z.object({
	objectid: z.number(),
	adresse: z.string(),
});

const GasStationFeatureSchema = z.object({
	attributes: GasStationAttributesSchema,
	geometry: GasStationGeometrySchema,
});

export const GasStationResponseSchema = z.object({
	displayFieldName: z.string(),
	fieldAliases: z.object({
		objectid: z.string(),
		adresse: z.string(),
	}),
	geometryType: z.string(),
	spatialReference: z.object({
		wkid: z.number(),
		latestWkid: z.number(),
	}),
	fields: z.array(
		z.object({
			name: z.string(),
			type: z.string(),
			alias: z.string(),
			length: z.number().optional(),
		}),
	),
	features: z.array(GasStationFeatureSchema),
});

// Create TypeScript types from the Zod schema
export type GasStationResponse = z.infer<typeof GasStationResponseSchema>;
export type GasStationFeature = z.infer<typeof GasStationFeatureSchema>;
