import type { LeaderboardParticipant } from "@/features/leaderboard/model/leaderboardStore";
import SocketService from "@/shared/api/sockets";
import { create } from "zustand";
import type { Adventure } from "../types/adventureTypes";

const socket = SocketService.getInstance();

type AdventureState = {
	joinCode: string;
	stepsCount: number;
	isLoading: boolean;
	error: string | null;
	isStarted: boolean;
	isFinished: boolean;
	finishResults: {
		top3: { place: number; username: string; score: number }[];
		total_players: number;
	} | null;
	startGame: () => void;
	loadAdventure: (worldId: number) => Promise<void>;
	leaderboardData: LeaderboardParticipant[];
} & Adventure;

const useAdventureStore = create<AdventureState>((set) => ({
	isStarted: false,
	isFinished: false,
	joinCode: "",
	stepsCount: 0,
	isLoading: false,
	error: null,
	leaderboardData: [],
	finishResults: null,

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
			set({ isLoading: true, error: null, isFinished: false, finishResults: null });

			socket.connect();

			socket.emit("host_join", {
				world_id: worldId,
			});

			socket.on("game_finished", (data: { top3: { place: number; username: string; score: number }[]; total_players: number }) => {
				set({ isFinished: true, finishResults: data });
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
