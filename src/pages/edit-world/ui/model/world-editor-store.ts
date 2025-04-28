import type { WordType } from "@/entities/world/types/types";
import { create } from "zustand";

interface EditorStore {
	words: WordType[];
	addWord: () => void;
	removeWord: (id: string) => void;
	updateWord: (id: string, data: Partial<WordType>) => void;
	clearWords: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
	words: [],

	addWord: () =>
		set((state) => ({
			words: [
				...state.words,
				{
					id: Date.now().toString(),
					word: "Кояш",
					translation: "Солнце",
					world_id: 1,
				},
			],
		})),

	removeWord: (id) =>
		set((state) => ({
			words: state.words.filter((word) => word.id !== id),
		})),

	updateWord: (id, data) =>
		set((state) => ({
			words: state.words.map((word) =>
				word.id === id ? { ...word, ...data } : word,
			),
		})),

	clearWords: () => set({ words: [] }),
}));
