import type { WorldType } from "@/entities/world/types/types";
import httpClient from "@/httpClient";

export const worldDataRequest = async (worldId: number): Promise<WorldType> => {
	const response = await httpClient.get<WorldType>(`/worlds/${worldId}`);
	return response.data;
};
