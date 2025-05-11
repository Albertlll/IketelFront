import socket, { connectSocket } from "@/sockets";
import { create } from "zustand";
import type { Adventure } from "../types/adventureTypes";

type AdventureState = {
	joinCode: string;
	stepsCount: number;
	isLoading: boolean;
	error: string | null;
	loadAdventure: (worldId: number) => Promise<void>;
} & Adventure;

const useAdventureStore = create<AdventureState>((set) => ({
	joinCode: "",
	stepsCount: 0,
	isLoading: false,
	error: null,

	loadAdventure: async (worldId) => {
		try {
			set({ isLoading: true, error: null });

			connectSocket();

			socket.emit("host_join", {
				world_id: worldId,
			});

			socket.on("host_ready", (response) => {
				console.log(response);
				if ("error" in response) {
					set({ error: response.error, isLoading: false });
					return;
				}

				set({
					joinCode: response.join_code,
					stepsCount: response.steps_count,
					isLoading: false,
				});
			});
		} catch (err) {
			set({
				error: err instanceof Error ? err.message : "Unknown error",
				isLoading: false,
			});
			throw err;
		}
	},
}));

export default useAdventureStore;
