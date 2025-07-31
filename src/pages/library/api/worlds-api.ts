import type { WorldPreviewType } from "@/entities/world/types/types";
import httpClient from "@/shared/api/httpClient";

export const wordsListRequest = async (): Promise<WorldPreviewType[]> => {
	const response = await httpClient.get<WorldPreviewType[]>("/worlds/");
	return response.data;
};
