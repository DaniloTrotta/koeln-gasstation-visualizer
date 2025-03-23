import { deleteGasStationAction } from "@/server/action/gas-station.actions";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { Button } from "../ui/button";

export const DeleteGasStationButton = ({ objectid }: { objectid: number }) => {
	const { execute, isPending } = useServerAction(deleteGasStationAction, {
		onSuccess: () => {
			toast.success("Tankstelle erfolgreich gelöscht");
		},
		onError: (error) => {
			console.error(error);
			toast.error("Fehler beim Löschen der Tankstelle");
		},
	});
	return (
		<Button
			variant="destructive"
			onClick={() => {
				execute(objectid);
			}}
		>
			{isPending ? (
				<Loader2 className="size-4 animate-spin" />
			) : (
				<Trash className="size-4" />
			)}
		</Button>
	);
};
