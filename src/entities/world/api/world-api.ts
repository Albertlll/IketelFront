import type { WorldType } from "@/entities/world/types/types";
import httpClient from "@/httpClient";

export const worldDataRequest = async (worldId: number): Promise<WorldType> => {
	const response = await httpClient.get<WorldType>(`/worlds/${worldId}`);
	console.log(response.data);
	return response.data;
};

interface worldPostData {
	title: string;
	description: string;
	is_public: boolean;
	words: { word: string; translation: string }[];
	sentences: { sentence: string }[];
	image: string;
}

export const postWorldDataRequest = async (
	world: worldPostData,
): Promise<WorldType> => {
	const response = await httpClient.post("/worlds/", world);
	return response.data;
};

/**
 * Удаляет мир по его ID
 * @param worldId ID мира для удаления
 * @returns Promise с результатом операции
 */
export const deleteWorldRequest = async (worldId: number): Promise<void> => {
	await httpClient.delete(`/worlds/${worldId}`);
};

/**
 * Изменяет статус публичности мира
 * @param worldId ID мира для изменения
 * @param isPublic Новый статус публичности (true/false)
 * @returns Promise с результатом операции
 */
export const updateWorldVisibilityRequest = async (
	worldId: number,
	isPublic: boolean,
): Promise<void> => {
	await httpClient.patch(`/worlds/${worldId}/visibility`, { is_public: isPublic });
};
