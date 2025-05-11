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
