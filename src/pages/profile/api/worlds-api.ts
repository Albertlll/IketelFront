import type { WorldPreviewType } from "@/entities/world/types/types";
import httpClient from "@/httpClient";

export const userWordsListRequest = async (): Promise<WorldPreviewType[]> => {
	const response =
		await httpClient.get<WorldPreviewType[]>("/worlds/userWorlds");
	return response.data;
};
