import { worldDataRequest } from "@/entities/world";
import { postWorldDataRequest } from "@/entities/world/api/world-api";
import type { SentenceType, WordType } from "@/entities/world/types/types";
import { create } from "zustand";

interface EditorStore {
	words: WordType[];
	sentences: SentenceType[];
	addWord: () => void;
	removeWord: (id: string) => void;
	updateWord: (id: string, data: Partial<WordType>) => void;
	addSentence: () => void;
	removeSentence: (id: string) => void;
	updateSentence: (id: string, data: Partial<SentenceType>) => void;
	clearAll: () => void;
	loadWorldData: (worldId: number) => void;
	editorType: "read" | "create";
	setEditorType: (editorType: "read" | "create") => void;
	worldTitle: string;
	worldImage: string;
	setWorldTitle: (worldTitle: string) => void;
	setWorldImage: (worldImage: string) => void;
	worldId: number;
	setWorldId: (worldId: number) => void;

	sendWorldData: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
	words: [],
	sentences: [],
	editorType: "create",
	worldTitle: "",
	worldImage: "",
	worldId: 0,

	setWorldTitle: (worldTitle) => set({ worldTitle }),
	setWorldImage: (worldImage) => set({ worldImage }),
	setWorldId: (worldId) => set({ worldId }),

	// setWorldTitle: (title: string) => set({ worldTitle: title }),

	setEditorType: (editorType) => set({ editorType }),

	// Методы для слов
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

	// Методы для предложений
	addSentence: () =>
		set((state) => ({
			sentences: [
				...state.sentences,
				{
					id: Date.now().toString(),
					sentence: "Ярату",
					translation: "Любовь",
					world_id: 1,
				},
			],
		})),

	removeSentence: (id) =>
		set((state) => ({
			sentences: state.sentences.filter((sentence) => sentence.id !== id),
		})),

	updateSentence: (id, data) =>
		set((state) => ({
			sentences: state.sentences.map((sentence) =>
				sentence.id === id ? { ...sentence, ...data } : sentence,
			),
		})),

	// Общие методы
	clearAll: () => set({ words: [], sentences: [], worldTitle: "" }),

	loadWorldData: (worldId: number) => {
		worldDataRequest(worldId).then((data) => {
			set({
				words: data.words || [],
				worldTitle: data.title,
				sentences: data.sentences,
			});
		});
	},

	sendWorldData: () => {
		// Берём всё нужное ДО асинхронной операции
		const { worldTitle, worldImage, words, sentences } =
			useEditorStore.getState();

		console.log(worldImage);

		postWorldDataRequest({
			title: worldTitle,
			description: "",
			is_public: true,
			words: words.map(({ word, translation }) => ({ word, translation })),
			sentences: sentences.map(({ sentence }) => ({ sentence })),
			image: "",
		})
			.then((data) => console.log("Отправлено:", data))
			.catch((err) => console.error("Ошибка:", err));
	},
}));
