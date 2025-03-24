"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";
import { gasStationRepository } from "../db/repository/gas-station-repository";

export const addGasStationAction = createServerAction()
	.input(
		z.object({
			adresse: z.string().min(1, "Adresse ist erforderlich"),
			latitude: z.coerce.string(),
			longitude: z.coerce.string(),
		}),
	)
	.handler(async ({ input }) => {
		const objectid = Math.floor(Math.random() * 1000000);
		await gasStationRepository.upsert({
			...input,
			objectid,
		});

		revalidatePath("/");
	});

export const deleteGasStationAction = createServerAction()
	.input(z.number())
	.handler(async ({ input }) => {
		await gasStationRepository.remove(input);
		revalidatePath("/");
	});
