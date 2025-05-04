import { create } from "zustand";

interface Participant {
	id: string;
	name: string;
}

interface ParticipantsState {
	participants: Participant[];
	addParticipant: (participant: Participant) => void;
	removeParticipant: (id: string) => void;
}

const useParticipantsStore = create<ParticipantsState>((set) => ({
	participants: [],
	addParticipant: (participant) =>
		set((state) => ({
			participants: [...state.participants, participant],
		})),
	removeParticipant: (id) =>
		set((state) => ({
			participants: state.participants.filter((p) => p.id !== id),
		})),
}));

export default useParticipantsStore;
