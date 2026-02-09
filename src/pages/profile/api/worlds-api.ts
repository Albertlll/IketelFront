import type { WorldPreviewType } from "@/entities/world/types/types";
import httpClient from "@/shared/api/httpClient";

export const userWordsListRequest = async (): Promise<WorldPreviewType[]> => {
	const response = await httpClient.get<WorldPreviewType[] | Record<string, unknown>>(
		"/worlds/userWorlds",
	);
	return normalizeWorldsResponse(response.data);
};

const normalizeWorldsResponse = (data: unknown): WorldPreviewType[] => {
	if (Array.isArray(data)) return data;

	if (data && typeof data === "object") {
		const payload = data as {
			worlds?: WorldPreviewType[];
			results?: WorldPreviewType[];
			data?: WorldPreviewType[];
		};

		if (Array.isArray(payload.worlds)) return payload.worlds;
		if (Array.isArray(payload.results)) return payload.results;
		if (Array.isArray(payload.data)) return payload.data;
	}

	console.warn("Unexpected user worlds response shape:", data);
	return [];
};
