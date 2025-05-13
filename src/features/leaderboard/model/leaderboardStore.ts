import { create } from "zustand";

export interface LeaderboardParticipant {
	sid: string;
	username: string;
	score: number;
}

interface ParticipantsState {
	participants: LeaderboardParticipant[];
	setLeaderboard: (leaderboard: LeaderboardParticipant[]) => void;
}

const useParticipantsStore = create<ParticipantsState>((set) => ({
	participants: [],
	setLeaderboard: (leaderboard) => set({ participants: leaderboard }),
}));

export default useParticipantsStore;
