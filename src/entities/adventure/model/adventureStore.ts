import type { LeaderboardParticipant } from "@/features/leaderboard/model/leaderboardStore";
import socket, { connectSocket } from "@/shared/api/sockets";
import { create } from "zustand";
import type { Adventure } from "../types/adventureTypes";

type AdventureState = {
	joinCode: string;
	stepsCount: number;
	isLoading: boolean;
	error: string | null;
	isStarted: boolean;
	startGame: () => void;
	loadAdventure: (worldId: number) => Promise<void>;
	leaderboardData: LeaderboardParticipant[];
} & Adventure;

const useAdventureStore = create<AdventureState>((set) => ({
	isStarted: false,
	joinCode: "",
	stepsCount: 0,
	isLoading: false,
	error: null,
	leaderboardData: [],

	startGame: () => {
		set({ isLoading: true });

		socket.emit("game_start", {});

		socket.on("leaderboard", (data: LeaderboardParticipant[]) => {
			console.log(data);
			set({ leaderboardData: data, isLoading: false, isStarted: true });
		});

		console.log("игра типа началась");
	},

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
