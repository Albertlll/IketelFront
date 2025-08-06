import { worldDataRequest } from "@/entities/world";
import { saveWorld } from "@/entities/world/api/world-api";
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
	editorType: "read" | "create" | "edit";
	setEditorType: (editorType: "read" | "create" | "edit") => void;
	worldTitle: string;
	worldImage: string;
	setWorldTitle: (worldTitle: string) => void;
	setWorldImage: (worldImage: string) => void;
	worldId: number;
	setWorldId: (worldId: number) => void;

	sendWorldData: () => void;
	setIsPublic : (isPublic : boolean) => void;
	isOwner: boolean;
	isPublic : boolean;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
	words: [],
	sentences: [],
	editorType: "create",
	worldTitle: "",
	worldImage: "",
	worldId: 0,
	isOwner: false,
	isPublic: true,

	setIsPublic : (isPublic : boolean) => set({isPublic}),

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
	clearAll: () =>
		set({
			words: [],
			sentences: [],
			worldTitle: "",
			worldImage: "",
			isOwner: false,
		}),

	loadWorldData: (worldId: number) => {
		worldDataRequest(worldId).then((data) => {
			console.log(data);
			set({
				worldId: data.id,
				words: data.words || [],
				worldTitle: data.title,
				sentences: data.sentences,
				isOwner: data.is_owner,
				isPublic : data.is_public


			});

			if (data.is_owner) {
				set({ editorType: "edit" });
			}
		});
	},

	sendWorldData: () => {
		// Берём всё нужное ДО асинхронной операции
		const { worldTitle, worldImage, words, sentences, isOwner } =
			useEditorStore.getState();

		console.log(worldImage);

		saveWorld(
			{
				title: worldTitle,
				description: "",
				is_public: true,
				words: words.map(({ word, translation }) => ({ word, translation })),
				sentences: sentences.map(({ sentence }) => ({ sentence })),
				image: worldImage,
			},
			isOwner,
			get().worldId,
		)
			.then((data) => console.log("Отправлено:", data))
			.catch((err) => console.error("Ошибка:", err));
	},
}));
