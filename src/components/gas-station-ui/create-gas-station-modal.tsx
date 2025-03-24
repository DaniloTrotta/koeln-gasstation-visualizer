"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addGasStationAction } from "@/server/action/gas-station.actions";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

export function CreateGasStationModal() {
	const [open, setOpen] = useState(false);

	const { execute, isPending } = useServerAction(addGasStationAction, {
		onSuccess: () => {
			setOpen(false);
			toast.success("Tankstelle erfolgreich hinzugefügt");
		},
		onError: (error) => {
			console.error(error);
			toast.error("Fehler beim Hinzufügen der Tankstelle");
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className="mr-2 h-4 w-4" />
					Tankstelle hinzufügen
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tankstelle hinzufügen</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const form = e.currentTarget;

						const formData = new FormData(form);
						console.log(formData);

						const createData = {
							adresse: formData.get("adresse") as string,
							latitude: formData.get("latitude") as string,
							longitude: formData.get("longitude") as string,
						};

						const [data, err] = await execute(createData);

						if (err) {
							console.error(err);
							return;
						}

						console.log(data);

						form.reset();
					}}
					className="space-y-4"
				>
					<div>
						<Label htmlFor="adresse">Adresse</Label>
						<Input id="adresse" name="adresse" required className="mt-1" />
						{/* {state?.fieldErrors?.adresse && (
							<p className="text-sm text-red-500">
								{state.fieldErrors.adresse[0]}
							</p>
						)} */}
					</div>
					<div>
						<Label htmlFor="latitude">Breitengrad</Label>
						<Input
							id="latitude"
							name="latitude"
							type="number"
							step="any"
							required
							className="mt-1"
						/>
						{/* {state?.fieldErrors?.latitude && (
							<p className="text-sm text-red-500">
								{state.fieldErrors.latitude[0]}
							</p>
						)} */}
					</div>
					<div>
						<Label htmlFor="longitude">Längengrad</Label>
						<Input
							id="longitude"
							name="longitude"
							type="number"
							step="any"
							required
							className="mt-1"
						/>
						{/* {state?.fieldErrors?.longitude && (
							<p className="text-sm text-red-500">
								{state.fieldErrors.longitude[0]}
							</p>
						)} */}
					</div>
					{/* {state?.error && (
						<p className="text-sm text-red-500">{state.error}</p>
					)} */}
					<Button type="submit" disabled={isPending}>
						{isPending ? "Tankstelle hinzufügen..." : "Tankstelle hinzufügen"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
