import { create } from "zustand";

interface MessageStore {
	message: { text: string | null; type: "success" | "error" | null };
	addMessage: (message: string, type: "success" | "error") => void;
	clearMessage: () => void;
}

const useMessageStore = create<MessageStore>((set) => ({
	message: { text: null, type: null },
	addMessage: (message, type) => set({ message: { text: message, type } }),
	clearMessage: () => set({ message: { text: null, type: null } }),
}));

export default useMessageStore;
