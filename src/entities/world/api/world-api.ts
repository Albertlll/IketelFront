import type { WorldType } from "@/entities/world/types/types";
import httpClient from "@/shared/api/httpClient";

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

export const putWorldDataRequest = async (
	worldId: number,
	worldData: worldPostData,
): Promise<string> => {
	const response = await httpClient.put<string>(
		`/worlds/${worldId}`,
		worldData,
	);
	return response.data;
};


export const saveWorld = async (
	worldData: worldPostData,
	isOwner: boolean,
	worldId?: number,
): Promise<WorldType> => {
	if (isOwner) {
		if (!worldId) throw new Error("Для обновления мира требуется worldId");
		const response = await httpClient.put<WorldType>(
			`/worlds/${worldId}`,
			worldData,
		);
		return response.data;
	}
	const response = await httpClient.post<WorldType>("/worlds/", worldData);
	return response.data;
};


export const deleteWorldRequest = async (worldId: number): Promise<void> => {
	await httpClient.delete(`/worlds/${worldId}`);
};
